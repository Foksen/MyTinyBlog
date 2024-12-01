export function IconEdit({ className, strokeWidth }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M34 6C34.5253 5.47471 35.1489 5.05803 35.8352 4.77375C36.5215 4.48947 37.2571 4.34315 38 4.34315C38.7429 4.34315 39.4785 4.48947 40.1648 4.77375C40.8511 5.05803 41.4747 5.47471 42 6C42.5253 6.52529 42.942 7.1489 43.2263 7.83522C43.5105 8.52154 43.6569 9.25713 43.6569 10C43.6569 10.7429 43.5105 11.4785 43.2263 12.1648C42.942 12.8511 42.5253 13.4747 42 14L15 41L4 44L7 33L34 6Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
