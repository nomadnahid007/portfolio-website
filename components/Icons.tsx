import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function baseProps(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props
  };
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.75v2.1" />
      <path d="M12 19.15v2.1" />
      <path d="m4.93 4.93 1.49 1.49" />
      <path d="m17.58 17.58 1.49 1.49" />
      <path d="M2.75 12h2.1" />
      <path d="M19.15 12h2.1" />
      <path d="m4.93 19.07 1.49-1.49" />
      <path d="m17.58 6.42 1.49-1.49" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a7 7 0 1 0 10.7 10.7Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4.5 7.5 7.5 6 7.5-6" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M8 10.2v5.8" />
      <path d="M8 8.2h.01" />
      <path d="M11.9 16v-3.2c0-1.25.76-2.2 1.95-2.2 1.1 0 1.65.74 1.65 1.96V16" />
      <path d="M11.9 12.1v-1.9" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M13.2 20v-6.15h2.2l.4-2.7h-2.6V9.4c0-.8.4-1.6 1.7-1.6H16V5.5c-.2-.03-.9-.1-1.8-.1-1.9 0-3.2 1.14-3.2 3.3v2.45H8.8v2.7H11V20" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M9 18.4c-3.5 1.1-3.5-1.5-4.9-1.8" />
      <path d="M15 21v-2.85a2.45 2.45 0 0 0-.7-1.9c2.95-.33 6.05-1.45 6.05-6.55A5.1 5.1 0 0 0 19 6.15a4.74 4.74 0 0 0-.08-3.55S17.8 2.25 15 4.2a11.4 11.4 0 0 0-6 0C6.2 2.25 5.08 2.6 5.08 2.6A4.74 4.74 0 0 0 5 6.15a5.1 5.1 0 0 0-1.35 3.55c0 5.06 3.08 6.22 6.03 6.55a2.18 2.18 0 0 0-.68 1.72V21" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 12h17" />
      <path d="M12 3a14.4 14.4 0 0 1 0 18" />
      <path d="M12 3a14.4 14.4 0 0 0 0 18" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4V8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
