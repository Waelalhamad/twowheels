/**
 * SVG recreation of the Two Wheels wordmark:
 * - "TWO" italic bold, smaller, top-right aligned
 * - "WHEELS" italic bold, large, below — the two "E"s replaced by teal wheel circles
 *   with chevron/arrow tread pattern inside
 */
export function Logo({ height = 40 }: { height?: number }) {
  // Viewbox sized to the wordmark proportions
  return (
    <svg
      viewBox="0 0 340 82"
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Two Wheels"
      style={{ display: "block" }}
    >
      <defs>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@1,900&display=swap');
          .logo-word {
            font-family: 'Arial Black', 'Helvetica Neue', Arial, sans-serif;
            font-weight: 900;
            font-style: italic;
            fill: #ffffff;
          }
        `}</style>

        {/* Clip circle for tread pattern inside each wheel */}
        <clipPath id="wheel1clip">
          <circle cx="0" cy="0" r="15" />
        </clipPath>
        <clipPath id="wheel2clip">
          <circle cx="0" cy="0" r="15" />
        </clipPath>
      </defs>

      {/* ── "TWO" top-right ── */}
      <text
        x="338"
        y="26"
        textAnchor="end"
        fontSize="26"
        letterSpacing="0.5"
        className="logo-word"
      >
        TWO
      </text>

      {/* ── "WH" ── rendered left portion of WHEELS */}
      <text
        x="0"
        y="76"
        textAnchor="start"
        fontSize="56"
        letterSpacing="-1"
        className="logo-word"
      >
        WH
      </text>

      {/* ── WHEEL 1 (first E, ~x=118) ── */}
      <g transform="translate(121,50)">
        {/* Outer ring */}
        <circle cx="0" cy="0" r="19" fill="none" stroke="#5DB1A1" strokeWidth="3.5" />
        {/* Tread chevrons clipped to circle interior */}
        <g clipPath="url(#wheel1clip)">
          {/* 5 chevron arrows pointing right, evenly spaced */}
          {[-12, -6, 0, 6, 12].map((x, i) => (
            <g key={i} transform={`translate(${x}, 0)`} fill="#5DB1A1">
              <polygon points="0,-5 5,0 0,5 -2,0" />
            </g>
          ))}
        </g>
        {/* Hub dot */}
        <circle cx="0" cy="0" r="3.5" fill="#5DB1A1" />
        {/* 4 spokes */}
        <line x1="0" y1="-15" x2="0" y2="15" stroke="#5DB1A1" strokeWidth="1.2" opacity="0.5" />
        <line x1="-15" y1="0" x2="15" y2="0" stroke="#5DB1A1" strokeWidth="1.2" opacity="0.5" />
      </g>

      {/* ── WHEEL 2 (second E, ~x=158) ── */}
      <g transform="translate(160,50)">
        <circle cx="0" cy="0" r="19" fill="none" stroke="#5DB1A1" strokeWidth="3.5" />
        <g clipPath="url(#wheel2clip)">
          {[-12, -6, 0, 6, 12].map((x, i) => (
            <g key={i} transform={`translate(${x}, 0)`} fill="#5DB1A1">
              <polygon points="0,-5 5,0 0,5 -2,0" />
            </g>
          ))}
        </g>
        <circle cx="0" cy="0" r="3.5" fill="#5DB1A1" />
        <line x1="0" y1="-15" x2="0" y2="15" stroke="#5DB1A1" strokeWidth="1.2" opacity="0.5" />
        <line x1="-15" y1="0" x2="15" y2="0" stroke="#5DB1A1" strokeWidth="1.2" opacity="0.5" />
      </g>

      {/* ── "LS" right portion of WHEELS ── */}
      <text
        x="183"
        y="76"
        textAnchor="start"
        fontSize="56"
        letterSpacing="-1"
        className="logo-word"
      >
        LS
      </text>
    </svg>
  );
}
