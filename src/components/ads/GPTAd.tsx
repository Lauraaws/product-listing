import React from 'react';
import { Bling as GPT, AdSlot } from 'react-gpt';

// Initialize GPT once at the application level
GPT.enableSingleRequest();
GPT.enableLazyLoad();

interface GPTAdProps {
  adUnitPath: string; // Ad unit path (required)
  slotSize: [number, number] | [number, number][] | 'fluid'; // Size of the ad slot
  targeting?: Record<string, string | string[]>; // Key-value targeting (optional)
  sizeMapping?: Array<{
    viewport: [number, number];
    slot: [number, number][] | [];
  }>; // Responsive size mapping (optional)
  style?: React.CSSProperties; // Inline styles (optional)
  className?: string; // CSS class (optional)
  id?: string; // ID for the ad slot (optional)
  collapseEmptyDiv?: boolean | [boolean, boolean]; // Collapse empty div (optional)
}

const GPTAd: React.FC<GPTAdProps> = ({
  adUnitPath,
  slotSize,
  targeting = {},
  sizeMapping = [],
  style = {},
  className = '',
  id = `gpt-ad-${Math.random().toString(36).substring(2, 15)}`,
  collapseEmptyDiv = true,
}) => {
  return (
    <div style={style} className={className}>
      <GPT>
        <AdSlot
          adUnitPath={adUnitPath}
          slotSize={slotSize}
          targeting={targeting}
          sizeMapping={sizeMapping.length > 0 ? sizeMapping : undefined}
          id={id}
          collapseEmptyDiv={collapseEmptyDiv}
        />
      </GPT>
    </div>
  );
};

export default GPTAd;
