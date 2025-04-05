import React from 'react';

// Removed IMAGE_BASE_PATH as we are using placeholders

function FlowerDisplay({ flowerInfo, signType }) {
  // Now only check for flower name, as image is not used
  if (!flowerInfo || !flowerInfo.flower) {
    return null; // Don't render if flower info is missing
  }

  // Placeholder instead of image
  const placeholderText = `[Image Placeholder for ${flowerInfo.flower}]`;

  return (
    <div className="flower-display">
      <h3>Associated Flower ({signType})</h3>
      <p>{flowerInfo.flower}</p>
      {/* Replace img tag with a placeholder */}
      <div className="flower-image-placeholder" aria-label={placeholderText}>
        {placeholderText}
      </div>
    </div>
  );
}

export default FlowerDisplay;
