export function IconRefresh({ className, strokeWidth }) {
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
        d="M2 8V20M2 20H14M2 20L11.28 11.28C13.4295 9.12943 16.0887 7.55841 19.0096 6.71355C21.9305 5.86868 25.0178 5.7775 27.9834 6.44852C30.9491 7.11953 33.6964 8.53087 35.9691 10.5508C38.2417 12.5708 39.9657 15.1336 40.98 18M46 40V28M46 28H34M46 28L36.72 36.72C34.5705 38.8706 31.9113 40.4416 28.9904 41.2865C26.0695 42.1313 22.9822 42.2225 20.0166 41.5515C17.0509 40.8805 14.3036 39.4691 12.0309 37.4492C9.75827 35.4292 8.03434 32.8664 7.02 30"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}