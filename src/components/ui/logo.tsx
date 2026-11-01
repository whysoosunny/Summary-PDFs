import type { ComponentProps } from "react";

export default function Logo(props: ComponentProps<"svg">) {
  return (
    <svg width={210} height={34} viewBox="0 0 210 34" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Summary PDF" {...props}>
      <rect x={1} y={2} width={26} height={30} rx={6} fill="#3F3C3C" />
      <path d="M8 11h12M8 17h12M8 23h7" stroke="white" strokeWidth={2} strokeLinecap="round" />
      <text x={36} y={25} fill="#3F3C3C" fontSize={23} fontWeight={600} fontFamily="Arial, sans-serif">Summary PDF</text>
    </svg>
  );
}
