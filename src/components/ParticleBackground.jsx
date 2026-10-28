import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const count = Math.min(55, Math.floor((width * height) / 28000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      radius: Math.random() * 1.4 + 0.6,
      alpha: Math.random() * 0.45 + 0.15,
    }));

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!shouldReduceMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`;
        ctx.fill();

        // Subtle synaptic links between nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 135) {
            const lineAlpha = (1 - dist / 135) * 0.11;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(45, 212, 191, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      if (!shouldReduceMotion) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-75"
    />
  );
}

