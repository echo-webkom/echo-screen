"use client";
import { useEffect, useRef } from "react";

// hearts animation on echo screen

export default function HeartsMinimal() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- Juster her ---
    const SPEED_Y = 0.35; // fall-hastighet
    const DRIFT_X = 0.2; // drift mot høyre
    const heartSpriteSize = 27; // base sprite størrelse
    const heartColor = "#FF1493"; // hjertefarge

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

    const heartSprite = makeHeartSprite(heartSpriteSize, heartColor);

    type Heart = {
      x: number;
      y: number;
      rot: number;
      vr: number;
      s: number;
      vy: number;
      vx: number;
      alpha: number;
    };

    const hearts: Heart[] = [];
    const numHearts = randomInt(150, 200);

    for (let i = 0; i < numHearts; i += 1) {
      hearts.push({
        x: randomInt(0, w),
        y: randomInt(0, h),
        rot: Math.random() * Math.PI * 2,
        vr: rand(-0.01, 0.01),
        s: rand(12, 22),
        vy: rand(0.6, 1.2),
        vx: rand(0.6, 1.15),
        alpha: rand(0.45, 0.8)
      });
    }

    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < hearts.length; i += 1) {
        const ht = hearts[i];

        ctx.save();
        ctx.translate(ht.x, ht.y);
        ht.rot += ht.vr;
        ctx.rotate(ht.rot);
        ctx.globalAlpha = ht.alpha;

        ctx.drawImage(heartSprite, -ht.s / 2, -ht.s / 2, ht.s, ht.s);

        ctx.restore();
        ctx.globalAlpha = 1;

        ht.y += SPEED_Y * ht.vy;
        ht.x += DRIFT_X * ht.vx;

        // litt “svev”
        ht.x += Math.sin((ht.y + i) * 0.02) * 0.15;

        // wrap sidene
        if (ht.x > w) ht.x = 0;
        else if (ht.x < 0) ht.x = w;

        // respawn på toppen
        if (ht.y > h) {
          ht.x = randomInt(0, w);
          ht.y = -20;
          ht.rot = Math.random() * Math.PI * 2;
          ht.vr = rand(-0.01, 0.01);
          ht.s = rand(12, 22);
          ht.vy = rand(0.6, 1.2);
          ht.vx = rand(0.6, 1.15);
          ht.alpha = rand(0.45, 0.8);
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

function makeHeartSprite(size: number, color: string): HTMLCanvasElement {
  const pad = Math.ceil(size * 0.6);
  const c = document.createElement("canvas");
  c.width = c.height = size + pad * 2;

  const g = c.getContext("2d")!;
  const cx = c.width / 2;
  const cy = c.height / 2;

  g.translate(cx, cy);

  // skaler hjertet
  const s = size / 30;
  g.scale(s, s);

  // main heart
  g.globalAlpha = 0.45; // gjennomsiktighet
  g.fillStyle = color;
  drawHeartPath(g);
  g.fill();
  g.globalAlpha = 1;

  return c;
}

function drawHeartPath(g: CanvasRenderingContext2D) {
  g.beginPath();
  g.moveTo(0, 10);

  g.bezierCurveTo(18, -6, 22, -22, 8, -24);
  g.bezierCurveTo(2, -24, 0, -18, 0, -14);
  g.bezierCurveTo(0, -18, -2, -24, -8, -24);
  g.bezierCurveTo(-22, -22, -18, -6, 0, 10);

  g.closePath();
}
