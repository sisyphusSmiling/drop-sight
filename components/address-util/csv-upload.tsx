'use client'

import { useState } from 'react';
import Papa from 'papaparse';
import { analytics } from '@/lib/utils/analytics';

interface CSVUploadProps {
  onAddressesLoaded: (addresses: string[]) => void;
  onError: (error: string) => void;
}

export const CSVUpload = ({ onAddressesLoaded, onError }: CSVUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    analytics.trackInteraction('csv_upload', {
      fileName: file.name,
      fileSize: file.size
    });

    Papa.parse(file, {
      complete: (results) => {
        const addresses = results.data
          .flat()
          .filter(Boolean)
          .map((addr): string => String(addr).trim())
          .map(addr => addr.startsWith('0x') ? addr : `0x${addr}`);

        if (addresses.length === 0) {
          const error = 'No valid addresses found in CSV';
          analytics.trackEvent('error', 'csv_error', {
            error,
            fileName: file.name
          });
          onError(error);
          return;
        }

        analytics.trackLookupSuccess('bulk', {
          addressCount: addresses.length,
          fileName: file.name
        });
        onAddressesLoaded(addresses);
      },
      error: (error) => {
        const errorMessage = `Error parsing CSV: ${error.message}`;
        analytics.trackEvent('error', 'csv_error', {
          error: errorMessage,
          fileName: file.name
        });
        onError(errorMessage);
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
        <div className="flex flex-col items-center justify-center gap-2">
          <label htmlFor="csv-upload" className="text-sm link-hover cursor-pointer">
            Click to upload or drag and drop your CSV file here
          </label>
        </div>
        <p className="text-sm text-muted-foreground">
          CSV should contain Flow-native (Cadence) addresses separated by commas
        </p>
      </div>
    </div>
  );
}; 