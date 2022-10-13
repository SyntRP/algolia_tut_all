import { useState } from "react";

export const SyntHit = ({ hit }) => {
  const frontImage = hit?.image_urls[0];
  const backImage = hit?.image_urls[1] || hit?.image_urls[0];
  const startIndexofColor = hit?.color?.filter_group?.indexOf("#");
  const filteredColor = hit?.color?.filter_group?.slice(startIndexofColor);
  return (
    <>
      <div className="flip-card" tabIndex="0">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={frontImage} className="hit_image" alt={hit?.name} />
          </div>
          <div className="flip-card-back">
            <img src={backImage} className="hit_image" alt={hit?.name} />
          </div>
        </div>
      </div>

      <p className="hits_name">{hit?.name}</p>
      <p className="hits_price">
        {hit?.price?.currency + " " + hit?.price?.value.toFixed(2)}
      </p>
      {filteredColor && (
        <div className="hit_color" style={{ backgroundColor: filteredColor }} />
      )}
    </>
  );
};
