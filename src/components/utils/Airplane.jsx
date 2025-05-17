import React from "react";

export default function Airplane() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="130"
      height="80"
      viewBox="0 0 130 80"
    >
      <g stroke="#1E1E1E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Body */}
        <path d="M10 40 L110 40 Q115 35 120 40 Q115 45 110 40 Z" fill="#B0C4DE" stroke="#333" />

        {/* Tail */}
        <path d="M10 40 L5 30 L10 30 Z" fill="#333" stroke="#333" />

        {/* Wings */}
        <path d="M50 40 L30 60 L50 55 L70 60 Z" fill="#87CEFA" stroke="#333" />

        {/* Windows */}
        <circle cx="30" cy="38" r="2" fill="#FFF" />
        <circle cx="40" cy="38" r="2" fill="#FFF" />
        <circle cx="50" cy="38" r="2" fill="#FFF" />
        <circle cx="60" cy="38" r="2" fill="#FFF" />
        <circle cx="70" cy="38" r="2" fill="#FFF" />
      </g>
    </svg>
  );
}
