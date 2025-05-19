import React from "react";

export default function Character() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="120"
      viewBox="0 0 100 120"
    >
      <g stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <circle cx="50" cy="30" r="20" fill="#FFD19C" stroke="#333" />

        {/* Eyes */}
        <circle cx="43" cy="28" r="2" fill="#333" />
        <circle cx="57" cy="28" r="2" fill="#333" />

        {/* Smile */}
        <path d="M42 35 Q50 40 58 35" stroke="#333" />

        {/* Body */}
        <path d="M40 50 Q50 60 60 50 L60 90 Q50 100 40 90 Z" fill="#4682B4" stroke="#333" />

        {/* Arms */}
        <path d="M40 55 L25 70" />
        <path d="M60 55 L75 70" />

        {/* Legs */}
        <path d="M45 90 L45 110" />
        <path d="M55 90 L55 110" />
      </g>
    </svg>
  );
}
