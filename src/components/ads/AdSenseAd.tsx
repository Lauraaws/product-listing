import React, { useEffect, useRef } from 'react';

interface AdSenseAdProps {
  client?: string; // AdSense client ID (optional, defaults to the one in index.html)
  slot: string; // AdSense ad unit ID (required)
  format?: string; // Ad format (optional)
  style?: React.CSSProperties; // Inline styles (optional)
  className?: string; // CSS class (optional)
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  client = 'ca-pub-8010515337565913', // Default to the client ID in index.html
  slot,
  format = 'auto',
  style = { display: 'block' },
  className = '',
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if running on server or if the element doesn't exist
    if (typeof window === 'undefined' || !adRef.current) {
      return;
    }

    try {
      // Clean up any existing ad
      if (adRef.current.firstChild) {
        adRef.current.innerHTML = '';
      }

      // Create a new ins element for the ad
      const adElement = document.createElement('ins');
      adElement.className = 'adsbygoogle';
      adElement.style.display = 'block';
      adElement.setAttribute('data-ad-client', client);
      adElement.setAttribute('data-ad-slot', slot);
      adElement.setAttribute('data-ad-format', format);
      adRef.current.appendChild(adElement);

      // Initialize the ad
      // Cast window to any to access the adsbygoogle property
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
    } catch (error) {
      console.error('Error initializing AdSense ad:', error);
    }

    // Cleanup function
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [client, slot, format]); // Re-initialize if these props change

  return (
    <div ref={adRef} style={style} className={className}>
      {/* AdSense ad will be inserted here */}
    </div>
  );
};

export default AdSenseAd;
