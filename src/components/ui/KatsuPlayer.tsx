"use client";
import React, { useState, useRef, useEffect } from "react";

interface KatsuPlayerProps {
  src: string;
  poster?: string;
}

export function KatsuPlayer({ src, poster }: KatsuPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
  }, [src]);

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className="katsu-player-container">
      {isLoading && (
        <div className="player-loading-overlay">
          <div className="katsu-spinner"></div>
          <p>Bölüm Hazırlanıyor...</p>
        </div>
      )}

      {error && (
        <div className="player-error-overlay">
          <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>Video yüklenirken bir hata oluştu.</p>
        </div>
      )}

      <video
        ref={videoRef}
        key={src}
        className="katsu-video-element"
        poster={poster}
        onCanPlay={handleCanPlay}
        onError={handleError}
        controls
        autoPlay
        playsInline
        crossOrigin="anonymous"
      >
        <source src={src} type="video/mp4" />
        Tarayıcınız video oynatmayı desteklemiyor.
      </video>
    </div>
  );
}
