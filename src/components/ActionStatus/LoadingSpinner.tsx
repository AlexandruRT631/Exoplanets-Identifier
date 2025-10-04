const LoadingSpinner = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    style={{ marginLeft: "20px " }}
    aria-label="Loading"
    role="status"
  >
    <g transform="translate(12,12)">
      <circle
        r="10"
        fill="none"
        stroke="#afafaf"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M10 0 A10 10 0 0 1 0 10"
        fill="none"
        stroke="#afafaf"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </g>
  </svg>
);

export default LoadingSpinner;