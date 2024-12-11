'use client'

import { useState } from 'react';
import Papa from 'papaparse';
import { analytics, EventCategory, EventName } from '@/lib/utils/analytics';

interface CSVUploadProps {
  onAddressesLoaded: (addresses: string[]) => void;
  onError: (error: string) => void;
}

export const CSVUpload = ({ onAddressesLoaded, onError }: CSVUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    // Track CSV upload attempt
    analytics.trackEvent(EventCategory.LOOKUP, EventName.BULK_LOOKUP, {
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
          analytics.trackEvent(EventCategory.ERROR, EventName.CSV_ERROR, {
            error,
            fileName: file.name,
            status: 'error'
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
        analytics.trackEvent(EventCategory.ERROR, EventName.CSV_ERROR, {
          error: errorMessage,
          fileName: file.name,
          status: 'error'
        });
        onError(errorMessage);
      },
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      handleFile(file);
    } else {
      const error = 'Please upload a CSV file';
      analytics.trackEvent(EventCategory.ERROR, EventName.CSV_ERROR, {
        error,
        fileName: file?.name,
        status: 'error'
      });
      onError(error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? 'border-primary bg-primary/5' : 'border-muted'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept=".csv"
        onChange={handleFileInput}
        className="hidden"
        id="csv-upload"
      />
      <label
        htmlFor="csv-upload"
        className="block cursor-pointer space-y-2"
      >
        <p className="text-sm">
          Drop your CSV file here or <span className="text-primary">browse</span>
        </p>
        <p className="text-xs text-muted-foreground">
          File should contain one address per row
        </p>
      </label>
    </div>
  );
}; 