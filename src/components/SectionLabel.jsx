import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function useCountUp(target, start) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame;
    let startTime;
    const duration = 700;

    const tick = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start]);

  return value;
}

export default function SectionLabel({ text, number, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(number ?? 0, isInView && number !== undefined);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex items-center gap-3 ${className}`}
    >
      <motion.span
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: { scaleX: 1, opacity: 1 },
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="block h-px w-8 origin-left bg-accent"
      />

      {number !== undefined && (
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 6 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-base font-light leading-none text-accent/60"
        >
          {String(count).padStart(2, "0")}
        </motion.span>
      )}

      <motion.span
        variants={{
          hidden: { opacity: 0, x: -6 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-[13px] uppercase tracking-[0.22em] text-accent"
      >
        {text}
      </motion.span>
    </motion.div>
  );
}