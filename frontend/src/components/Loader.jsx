import React from 'react';

export default function Loader({ fullScreen = false, message = 'Loading...' }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white">
        <div className="w-14 h-14 border-4 border-gold/30 border-t-gold rounded-full animate-spin mb-4"></div>
        <p className="text-gold font-medium tracking-wide text-lg">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-10 h-10 border-3 border-emerald-800/20 border-t-emerald-800 rounded-full animate-spin mb-3"></div>
      <p className="text-emerald-800/80 text-sm font-medium">{message}</p>
    </div>
  );
}
