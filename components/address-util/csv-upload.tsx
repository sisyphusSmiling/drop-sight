'use client'

import { useState } from 'react';
import Papa from 'papaparse';

interface CSVUploadProps {
  onAddressesLoaded: (addresses: string[]) => void;
  onError: (error: string) => void;
}

export const CSVUpload = ({ onAddressesLoaded, onError }: CSVUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    Papa.parse(file, {
      complete: (results) => {
        const addresses = results.data
          .flat()
          .filter(Boolean)
          .map((addr): string => String(addr).trim())
          .map(addr => addr.startsWith('0x') ? addr : `0x${addr}`);

        if (addresses.length === 0) {
          onError('No valid addresses found in CSV');
          return;
        }

        onAddressesLoaded(addresses);
      },
      error: (error) => {
        onError(`Error parsing CSV: ${error.message}`);
      },
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ? 'border-primary bg-primary/5' : 'border-muted'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        id="csv-upload"
      />
      <div className="space-y-2">
        <label
          htmlFor="csv-upload"
          className="cursor-pointer text-primary hover:text-primary/80"
        >
          Click to upload or drag and drop your CSV file here
        </label>
        <p className="text-sm text-muted-foreground">
          CSV should contain Flow-native (Cadence) addresses separated by commas
        </p>
      </div>
    </div>
  );
}; 