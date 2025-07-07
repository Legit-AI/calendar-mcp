export const CalendarMCPLogo = (props: {
  size?: string;
  className?: string;
}) => {
  return (
    <svg
      className={props.className}
      width={15}
      height={15}
      viewBox={`0 0 15 15`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="stripes"
          width="2"
          height={15}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(90)"
        >
          <rect width="6.25" height={15} fill="black" />
          <rect x="1" width="6.25" height={15} fill="white" />
        </pattern>

        <mask id="circle-mask">
          <rect width="15" height="15" fill="black" />
          <circle cx="7.5" cy="7.5" r="7.5" fill="white" />
          <circle cx="7.5" cy="7.5" r="4" fill="black" />
          <rect x="7.5" y="6" width="7.5" height="3" fill="black" />
        </mask>
      </defs>
      <rect
        width={15}
        height={15}
        fill="url(#stripes)"
        mask="url(#circle-mask)"
      />
    </svg>
  );
};
