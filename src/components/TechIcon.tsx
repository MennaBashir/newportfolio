import type { ReactNode } from "react";

interface TechIconProps {
  name: string;
  color: string;
}

export default function TechIcon({ name, color }: TechIconProps) {
  const size = "w-9 h-9 md:w-11 md:h-11";

  const icons: Record<string, ReactNode> = {
    React: (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <circle cx="12" cy="12" r="2.5" fill={color} />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke={color}
          strokeWidth="1"
          fill="none"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke={color}
          strokeWidth="1"
          fill="none"
          transform="rotate(120 12 12)"
        />
      </svg>
    ),
    "Next.js": (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <circle
          cx="12"
          cy="12"
          r="10"
          fill={color}
          fillOpacity="0.1"
          stroke={color}
          strokeWidth="1"
        />
        <path
          d="M8 8v8m0-8l8 8m0-8v3"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    TypeScript: (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="3"
          fill={color}
          fillOpacity="0.15"
          stroke={color}
          strokeWidth="1"
        />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fill={color}
          fontSize="10"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          TS
        </text>
      </svg>
    ),
    JavaScript: (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="3"
          fill={color}
          fillOpacity="0.15"
          stroke={color}
          strokeWidth="1"
        />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fill={color}
          fontSize="10"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          JS
        </text>
      </svg>
    ),
    Expo: (
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>file_type_light_expo</title>
        <path
          d="M3.979,20.059,11.252,6.2l7.155-3.835,2.128,1.074L13.423,7.457l7.348,22.088L18.407,28.17l-5.5-12.677-7.22,5.479Z"
          fill="#ffffff"
        />
        <ellipse cx="25.24" cy="13.967" rx="2.686" ry="2.503" fill="#ffffff" />
        <path d="M27.2,12.85a2.432,2.432,0,0,0-4.157.3,2.188,2.188,0,0,0,.419,2.449A3.544,3.544,0,0,0,27.2,12.85ZM19.976,3.4l-1.547-.849L11.693,6.3l.537.29,1.021.537L15.1,6.1l4.877-2.718Zm.623-.258a.24.24,0,0,1,.172.161L23.027,9.96a.223.223,0,0,1-.107.29,4.362,4.362,0,0,0-2.106,4.985,4.608,4.608,0,0,0,4.92,3.244.285.285,0,0,1,.28.172l2.331,6.833a.277.277,0,0,1-.108.3l-7.165,4.189a.268.268,0,0,1-.108.022.286.286,0,0,1-.193-.032l-2.514-1.58a.251.251,0,0,1-.107-.107L13.24,16.986,5.763,21.24a.345.345,0,0,1-.29.011l-1.7-.967a.247.247,0,0,1-.107-.322L10.93,6.178a.26.26,0,0,1,.118-.107l7.241-4.039a.274.274,0,0,1,.258,0ZM11.618,6.844l-.355-.182-7,13.332,1.278.72,6.038-7.9a.294.294,0,0,1,.247-.108.3.3,0,0,1,.215.161l6.575,15.148L20.373,29.1,13.315,8.467l-.3-.86-1.407-.773Zm10.829,7.95a2.727,2.727,0,0,1,1.343-3.115,2.965,2.965,0,0,1,3.481.43,2.719,2.719,0,0,1,.078,3.843l-.078.078a2.932,2.932,0,0,1-4.824-1.236Z" />
      </svg>
    ),
    "Tailwind CSS": (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <path
          d="M6.5 9C7.5 5 10 4 12 4c3 0 4 2 5.5 3 1 .67 2.5 1 3.5 0-1 4-3.5 5-5.5 5-3 0-4-2-5.5-3-1-.67-2.5-1-3.5 0z"
          fill={color}
          fillOpacity="0.2"
          stroke={color}
          strokeWidth="1"
        />
        <path
          d="M3 15c1-4 3.5-5 5.5-5 3 0 4 2 5.5 3 1 .67 2.5 1 3.5 0-1 4-3.5 5-5.5 5-3 0-4-2-5.5-3-1-.67-2.5-1-3.5 0z"
          fill={color}
          fillOpacity="0.2"
          stroke={color}
          strokeWidth="1"
        />
      </svg>
    ),
    "Framer Motion": (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <path d="M5 4h14v5.33H12L5 4z" fill={color} fillOpacity="0.3" />
        <path d="M5 9.33h7l7 5.34H12l-7-5.34z" fill={color} fillOpacity="0.5" />
        <path d="M5 14.67L12 20v-5.33H5z" fill={color} fillOpacity="0.8" />
        <path
          d="M5 4h14v5.33H12L5 4zM5 9.33h7l7 5.34H12l-7-5.34zM5 14.67L12 20v-5.33H5z"
          stroke={color}
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    ),
    Docker: (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <rect
          x="2"
          y="10"
          width="20"
          height="9"
          rx="2"
          fill={color}
          fillOpacity="0.12"
          stroke={color}
          strokeWidth="1"
        />
        <rect
          x="5"
          y="6"
          width="3"
          height="4"
          rx="0.5"
          fill={color}
          fillOpacity="0.3"
          stroke={color}
          strokeWidth="0.5"
        />
        <rect
          x="9"
          y="6"
          width="3"
          height="4"
          rx="0.5"
          fill={color}
          fillOpacity="0.3"
          stroke={color}
          strokeWidth="0.5"
        />
        <rect
          x="13"
          y="6"
          width="3"
          height="4"
          rx="0.5"
          fill={color}
          fillOpacity="0.3"
          stroke={color}
          strokeWidth="0.5"
        />
        <rect
          x="9"
          y="2"
          width="3"
          height="4"
          rx="0.5"
          fill={color}
          fillOpacity="0.3"
          stroke={color}
          strokeWidth="0.5"
        />
      </svg>
    ),
    Git: (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <path
          d="M21.6 11.2L12.8 2.4a1.4 1.4 0 00-2 0L8.7 4.5l2.5 2.5a1.7 1.7 0 012.1 2.1l2.4 2.4a1.7 1.7 0 11-1 1l-2.2-2.2v5.8a1.7 1.7 0 11-1.4-.1V10a1.7 1.7 0 01-.9-2.2L7.7 5.3l-5.3 5.3a1.4 1.4 0 000 2l8.8 8.8a1.4 1.4 0 002 0l8.4-8.4a1.4 1.4 0 000-1.8z"
          fill={color}
          fillOpacity="0.2"
          stroke={color}
          strokeWidth="0.7"
        />
      </svg>
    ),
    "C++": (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="3"
          fill={color}
          fillOpacity="0.15"
          stroke={color}
          strokeWidth="1"
        />
        <text
          x="6"
          y="16"
          fill={color}
          fontSize="9"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          C
        </text>
        <text
          x="13"
          y="14"
          fill={color}
          fontSize="7"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          +
        </text>
        <text
          x="17"
          y="14"
          fill={color}
          fontSize="7"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          +
        </text>
      </svg>
    ),
    "Shadcn/UI": (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="3"
          fill={color}
          fillOpacity="0.1"
          stroke={color}
          strokeWidth="1"
        />
        <path
          d="M7 17L17 7"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 17L17 12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    "Redux Toolkit": (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <circle
          cx="12"
          cy="12"
          r="10"
          fill={color}
          fillOpacity="0.1"
          stroke={color}
          strokeWidth="1"
        />
        <path
          d="M15 8.5c0-2-1.5-3.5-3.5-3.5S8 6.5 8 8.5c0 1.5 1 2.8 2.3 3.2"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M9 15.5c0 2 1.5 3.5 3.5 3.5s3.5-1.5 3.5-3.5c0-1.5-1-2.8-2.3-3.2"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M14.5 10c1.7 1 2.5 2.7 2 4.5-.4 1.4-1.6 2.3-3 2.5"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M9.5 14c-1.7-1-2.5-2.7-2-4.5.4-1.4 1.6-2.3 3-2.5"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    Zustand: (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <circle
          cx="12"
          cy="13"
          r="8"
          fill={color}
          fillOpacity="0.1"
          stroke={color}
          strokeWidth="1"
        />
        <circle cx="9" cy="11" r="1.2" fill={color} />
        <circle cx="15" cy="11" r="1.2" fill={color} />
        <path
          d="M9 15c1 1.5 5 1.5 6 0"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M8 6c1-2 3-3 4-3s3 1 4 3"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
    Recoil: (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="3"
          fill={color}
          fillOpacity="0.1"
          stroke={color}
          strokeWidth="1"
        />
        <path
          d="M9 6v3c0 1.5 1 2.5 2.5 2.5h1c1.5 0 2.5 1 2.5 2.5v3"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="9" cy="6" r="1.5" fill={color} />
        <circle cx="15" cy="17" r="1.5" fill={color} />
      </svg>
    ),
    "Material UI": (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <path
          d="M3 6l9 5.25V17l-9-5.25V6z"
          fill={color}
          fillOpacity="0.2"
          stroke={color}
          strokeWidth="0.8"
        />
        <path
          d="M12 6l9 5.25V17l-9-5.25V6z"
          fill={color}
          fillOpacity="0.35"
          stroke={color}
          strokeWidth="0.8"
        />
        <path
          d="M12 11.25l9 5.25v-5.75L12 5.5v5.75z"
          fill={color}
          fillOpacity="0.15"
          stroke={color}
          strokeWidth="0.5"
        />
      </svg>
    ),
    Bootstrap: (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="4"
          fill={color}
          fillOpacity="0.15"
          stroke={color}
          strokeWidth="1"
        />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fill={color}
          fontSize="11"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          B
        </text>
      </svg>
    ),
    HTML5: (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <path
          d="M4 2l1.5 18L12 22l6.5-2L20 2H4z"
          fill={color}
          fillOpacity="0.12"
          stroke={color}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <text
          x="12"
          y="15"
          textAnchor="middle"
          fill={color}
          fontSize="7"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          5
        </text>
      </svg>
    ),
    CSS3: (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <path
          d="M4 2l1.5 18L12 22l6.5-2L20 2H4z"
          fill={color}
          fillOpacity="0.12"
          stroke={color}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <text
          x="12"
          y="15"
          textAnchor="middle"
          fill={color}
          fontSize="7"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          3
        </text>
      </svg>
    ),
    GitHub: (
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 2C6.475 2 2 6.475 2 12C2 16.425 4.8625 20.1625 8.8375 21.4875C9.3375 21.575 9.525 21.275 9.525 21.0125C9.525 20.775 9.5125 19.9875 9.5125 19.15C7 19.6125 6.35 18.5375 6.15 17.975C6.0375 17.6875 5.55 16.8 5.125 16.5625C4.775 16.375 4.275 15.9125 5.1125 15.9C5.9 15.8875 6.4625 16.625 6.65 16.925C7.55 18.4375 8.9875 18.0125 9.5625 17.75C9.65 17.1 9.9125 16.6625 10.2 16.4125C7.975 16.1625 5.65 15.3 5.65 11.475C5.65 10.3875 6.0375 9.4875 6.675 8.7875C6.575 8.5375 6.225 7.5125 6.775 6.1375C6.775 6.1375 7.6125 5.875 9.525 7.1625C10.325 6.9375 11.175 6.825 12.025 6.825C12.875 6.825 13.725 6.9375 14.525 7.1625C16.4375 5.8625 17.275 6.1375 17.275 6.1375C17.825 7.5125 17.475 8.5375 17.375 8.7875C18.0125 9.4875 18.4 10.375 18.4 11.475C18.4 15.3125 16.0625 16.1625 13.8375 16.4125C14.2 16.725 14.5125 17.325 14.5125 18.2625C14.5125 19.6 14.5 20.675 14.5 21.0125C14.5 21.275 14.6875 21.5875 15.1875 21.4875C17.1727 20.8173 18.8977 19.5415 20.1198 17.8395C21.3419 16.1376 21.9995 14.0953 22 12C22 6.475 17.525 2 12 2Z"
          stroke="#ffffff"
          stroke-linejoin="round"
        />
      </svg>
    ),
    GitLab: (
      <svg viewBox="0 0 24 24" fill="none" className={size}>
        <polygon
          points="12,2 2,9 5,22 12,18 19,22 22,9"
          fill={color}
          fillOpacity="0.1"
          stroke={color}
          strokeWidth="1"
        />
        <polygon
          points="12,4 4,10 6,20 12,17 18,20 20,10"
          fill={color}
          fillOpacity="0.3"
          stroke={color}
          strokeWidth="0.8"
        />
      </svg>
    ),
  };

  return (
    icons[name] || (
      <div
        className="w-9 h-9 md:w-11 md:h-11 rounded-lg flex items-center justify-center text-lg font-bold"
        style={{ color }}
      >
        {name.slice(0, 2)}
      </div>
    )
  );
}
