export function Arrow({ onClick = () => {}, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      onClick={onClick}
      className={className}
    >
      <g clip-path="url(#clip0_5776_15686)">
        <path
          d="M10.7804 15.5557L19.6805 6.65543C19.8865 6.44957 20 6.17478 20 5.88177C20 5.58877 19.8865 5.31397 19.6805 5.10812L19.0252 4.45268C18.5982 4.02618 17.9042 4.02618 17.4779 4.45268L10.0041 11.9264L2.52209 4.44439C2.31608 4.23853 2.04145 4.12488 1.7486 4.12488C1.45544 4.12488 1.1808 4.23853 0.974627 4.44439L0.319509 5.09983C0.113495 5.30584 1.84372e-06 5.58048 1.83091e-06 5.87348C1.81811e-06 6.16649 0.113495 6.44128 0.319509 6.64713L9.22773 15.5557C9.4344 15.762 9.71033 15.8754 10.0037 15.8747C10.2981 15.8754 10.5739 15.762 10.7804 15.5557Z"
          fill="#4B5563"
        />
      </g>
      <defs>
        <clipPath id="clip0_5776_15686">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(20) rotate(90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
