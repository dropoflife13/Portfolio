import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Infinite, seamless marquee (Magic UI style).
 * - Pauses on hover/focus (pauseOnHover)
 * - Respects prefers-reduced-motion (animation is disabled in index.css)
 * - Edge fade via mask so items dissolve instead of clipping
 */
function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  repeat = 4,
  children,
  ...props
}) {
  return (
    <div
      {...props}
      className={cn(
        "group marquee-mask flex overflow-hidden [--gap:1rem] [gap:var(--gap)] p-1",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 items-center justify-around [gap:var(--gap)] animate-marquee",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export { Marquee };

