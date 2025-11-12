"use client";
import { useEffect, useRef } from "react";

export default function SnowMinimal() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPEED_Y = 0.3;
    const DRIFT_X = 0.25;
    const fancyRatio = 0.16;
    const dotSize = 1.8;
    const flakeSpriteSize = 20;

    function randomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    let w = 0,
      h = 0,
      DPR = 1;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      DPR = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const dotSprite = makeDotSprite(dotSize * 2);
    const flakeSprite = makeSnowflakeSprite(flakeSpriteSize);

    type Kind = "dot" | "flake";
    type Flake = { x: number; y: number; kind: Kind; rot: number; vr: number };

    const flakes: Flake[] = [];
    const numOfFlakes = randomInt(300, 600);
    for (let i = 0; i < numOfFlakes; i += 1) {
      flakes.push({
        x: randomInt(0, w),
        y: randomInt(0, h),
        kind: Math.random() < fancyRatio ? "flake" : "dot",
        rot: Math.random() * Math.PI * 2,
        vr: rand(-0.02, 0.02)
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < flakes.length; i += 1) {
        const f = flakes[i];

        ctx.save();
        ctx.translate(f.x, f.y);
        if (f.kind === "flake") {
          f.rot += f.vr;
          ctx.rotate(f.rot);
          const s = 12;
          ctx.drawImage(flakeSprite, -s / 2, -s / 2, s, s);
        } else {
          const s = dotSize * 2;
          ctx.drawImage(dotSprite, -s / 2, -s / 2, s, s);
        }
        ctx.restore();

        f.y += SPEED_Y;
        f.x += DRIFT_X;

        f.x += Math.sin((f.y + i) * 0.02) * 0.1;

        if (f.x > w) f.x = 0;
        else if (f.x < 0) f.x = w;
        else if (f.y > h) {
          f.x = randomInt(0, w);
          f.y = -2;
          f.kind = Math.random() < fancyRatio ? "flake" : "dot";
          f.vr = rand(-0.02, 0.2);
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999
      }}
    />
  );
}

function makeDotSprite(size: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const r = size / 2;
  g.fillStyle = "#fff";
  g.beginPath();
  g.arc(r, r, r, 0, Math.PI * 2);
  g.fill();
  return c;
}

function makeSnowflakeSprite(size: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = size * 2;
  const g = c.getContext("2d")!;
  g.translate(size, size);
  g.strokeStyle = "#fff";
  g.lineWidth = Math.max(1, Math.floor(size * 0.14));
  g.lineCap = "round";

  const armLen = size * 0.85;
  for (let a = 0; a < 6; a++) {
    g.save();
    g.rotate((a * Math.PI) / 3);

    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(0, -armLen);
    g.stroke();

    const twigStart = -armLen * 0.55;
    const twigGap = armLen * 0.22;
    const twigLen = armLen * 0.28;

    for (let t = 0; t < 2; t++) {
      const y = twigStart - t * twigGap;

      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(twigLen * 0.7, y - twigLen);
      g.stroke();

      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(-twigLen * 0.7, y - twigLen);
      g.stroke();
    }
    g.restore();
  }
  return c;
}
