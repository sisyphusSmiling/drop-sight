'use client';

import { useEffect, useRef } from 'react';

export default function IconPage() {
  const canvasRef32 = useRef<HTMLCanvasElement>(null);
  const canvas180 = useRef<HTMLCanvasElement>(null);
  const canvas192 = useRef<HTMLCanvasElement>(null);
  const canvas512 = useRef<HTMLCanvasElement>(null);

  const downloadIcon = (canvas: HTMLCanvasElement | null, filename: string) => {
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  useEffect(() => {
    // Special handling for favicon - just emoji on transparent background
    const renderFavicon = (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = 32;
      canvas.height = 32;

      // Draw emoji
      ctx.font = '28px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🎯', 16, 16);
    };

    // Render other icons with background and text
    const renderIcon = (
      canvas: HTMLCanvasElement | null,
      size: number,
      emojiSize: number,
      textSize: number,
      textMargin: number
    ) => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = size;
      canvas.height = size;

      // Draw background
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, size, size);

      // Draw emoji
      ctx.font = `${emojiSize}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🎯', size / 2, (size - textSize) / 2);

      // Draw text
      ctx.font = `bold ${textSize}px "JetBrains Mono"`;
      ctx.fillStyle = 'white';
      ctx.fillText('DropSight', size / 2, (size + textSize) / 2 + textMargin);
    };

    // Render each icon
    renderFavicon(canvasRef32.current);
    renderIcon(canvas180.current, 180, 80, 24, 20);
    renderIcon(canvas192.current, 192, 80, 24, 20);
    renderIcon(canvas512.current, 512, 200, 64, 60);
  }, []);

  return (
    <div className="min-h-screen bg-white p-8 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Favicon Preview */}
        <div className="space-y-2">
          <div className="relative">
            <canvas
              ref={canvasRef32}
              style={{ width: '32px', height: '32px' }}
            />
            <div className="absolute -inset-2 border-2 border-dashed border-blue-500 pointer-events-none" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-black text-sm">favicon.png (32x32)</p>
            <button
              onClick={() => downloadIcon(canvasRef32.current, 'favicon.png')}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Download
            </button>
          </div>
        </div>

        {/* Apple Touch Icon */}
        <div className="space-y-2">
          <div className="relative">
            <canvas
              ref={canvas180}
              className="bg-[#09090B]"
              style={{ width: '180px', height: '180px' }}
            />
            <div className="absolute -inset-2 border-2 border-dashed border-blue-500 pointer-events-none" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-black text-sm">apple-touch-icon.png (180x180)</p>
            <button
              onClick={() => downloadIcon(canvas180.current, 'apple-touch-icon.png')}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Download
            </button>
          </div>
        </div>

        {/* Android Icon */}
        <div className="space-y-2">
          <div className="relative">
            <canvas
              ref={canvas192}
              className="bg-[#09090B]"
              style={{ width: '192px', height: '192px' }}
            />
            <div className="absolute -inset-2 border-2 border-dashed border-blue-500 pointer-events-none" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-black text-sm">icon-192.png (192x192)</p>
            <button
              onClick={() => downloadIcon(canvas192.current, 'icon-192.png')}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Download
            </button>
          </div>
        </div>

        {/* PWA Icon */}
        <div className="space-y-2">
          <div className="relative">
            <canvas
              ref={canvas512}
              className="bg-[#09090B]"
              style={{ width: '512px', height: '512px' }}
            />
            <div className="absolute -inset-2 border-2 border-dashed border-blue-500 pointer-events-none" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-black text-sm">icon-512.png (512x512)</p>
            <button
              onClick={() => downloadIcon(canvas512.current, 'icon-512.png')}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Download
            </button>
          </div>
        </div>
      </div>

      <div className="text-black space-y-4">
        <h2 className="text-lg font-bold">Instructions:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click the "Download" button next to each icon to save it</li>
          <li>Convert favicon.png to .ico format using a tool like favicon.io</li>
          <li>Place all icons in the public directory</li>
          <li>Verify icons in the site manifest and metadata</li>
        </ol>
      </div>
    </div>
  );
} 