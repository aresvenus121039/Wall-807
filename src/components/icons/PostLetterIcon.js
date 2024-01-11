import React from 'react';

const PostLetterIcon = () => {
  return (
    <svg
      width="auto"
      height="auto"
      viewBox="0 0 86 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle
        cx="42.7791"
        cy="43.3745"
        r="37.9623"
        transform="rotate(-7.45381 42.7791 43.3745)"
        fill="white"
        fill-opacity="0.1"
      />
      <path
        d="M24.0766 67.3769L67.0275 61.7576L61.4081 18.8066L18.4572 24.426L24.0766 67.3769Z"
        fill="url(#pattern_letter)"
      />
      <defs>
        <pattern
          id="pattern_letter"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image_letter" transform="scale(0.015625)" />
        </pattern>
        <image
          id="image_letter"
          width="64"
          height="64"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default PostLetterIcon;