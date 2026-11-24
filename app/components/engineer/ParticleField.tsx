"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; z: number; hue: number };
type Packet = { a: number; b: number; t: number; speed: number };
type Ping = { x: number; y: number; r: number; life: number };

const LINK_DISTANCE = 130;
const CURSOR_RADIUS = 170;
const MAX_PACKETS = 14;

export default function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let pings: Ping[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let tick = 0;
    const mouse = { x: -9999, y: -9999, px: 0, py: 0, active: false };

    const seed = () => {
      const count = Math.min(140, Math.floor((width * height) / 7000));
      nodes = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (0.15 + z * 0.4),
          vy: (Math.random() - 0.5) * (0.15 + z * 0.4),
          z,
          hue: 195 + Math.random() * 15,
        };
      });
      packets = [];
      pings = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    const screen = (n: Node) => {
      const depth = 6 + n.z * 26;
      return { x: n.x - mouse.px * depth, y: n.y - mouse.py * depth };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const pts = nodes.map(screen);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const pa = pts[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (Math.abs(a.z - b.z) > 0.45) continue;
          const pb = pts[j];
          const d = Math.hypot(pa.x - pb.x, pa.y - pb.y);
          if (d < LINK_DISTANCE) {
            const depth = (a.z + b.z) / 2;
            ctx.strokeStyle = `hsla(${a.hue}, 60%, 60%, ${(1 - d / LINK_DISTANCE) * (0.12 + depth * 0.35)})`;
            ctx.lineWidth = 0.6 + depth * 0.6;
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.stroke();
          }
        }
      }

      if (mouse.active) {
        for (let i = 0; i < nodes.length; i++) {
          const p = pts[i];
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < CURSOR_RADIUS) {
            ctx.strokeStyle = `rgba(124, 196, 228, ${(1 - d / CURSOR_RADIUS) * 0.55})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        glow.addColorStop(0, "rgba(74, 148, 186, 0.18)");
        glow.addColorStop(1, "rgba(74, 148, 186, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(mouse.x - 120, mouse.y - 120, 240, 240);
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const p = pts[i];
        const r = 0.8 + n.z * 2;
        ctx.fillStyle = `hsla(${n.hue}, 70%, ${55 + n.z * 25}%, ${0.35 + n.z * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const k of packets) {
        const pa = pts[k.a];
        const pb = pts[k.b];
        if (!pa || !pb) continue;
        const x = pa.x + (pb.x - pa.x) * k.t;
        const y = pa.y + (pb.y - pa.y) * k.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 8);
        g.addColorStop(0, "rgba(200, 236, 255, 0.95)");
        g.addColorStop(1, "rgba(124, 196, 228, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of pings) {
        ctx.strokeStyle = `rgba(124, 196, 228, ${p.life * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const spawnPacket = () => {
      const pts = nodes.map(screen);
      for (let tries = 0; tries < 20; tries++) {
        const a = Math.floor(Math.random() * nodes.length);
        const b = Math.floor(Math.random() * nodes.length);
        if (a === b || Math.abs(nodes[a].z - nodes[b].z) > 0.45) continue;
        if (Math.hypot(pts[a].x - pts[b].x, pts[a].y - pts[b].y) < LINK_DISTANCE) {
          packets.push({ a, b, t: 0, speed: 0.008 + Math.random() * 0.012 });
          return;
        }
      }
    };

    const step = () => {
      tick++;
      mouse.px += ((mouse.active ? mouse.x / width - 0.5 : 0) - mouse.px) * 0.05;
      mouse.py += ((mouse.active ? mouse.y / height - 0.5 : 0) - mouse.py) * 0.05;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 90 && d > 0.1) {
            const f = ((90 - d) / 90) * 0.6;
            n.x += (dx / d) * f;
            n.y += (dy / d) * f;
          }
        }
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      if (packets.length < MAX_PACKETS && tick % 12 === 0) spawnPacket();
      packets = packets.filter((k) => (k.t += k.speed) < 1);

      if (tick % 70 === 0 && nodes.length) {
        const n = nodes[Math.floor(Math.random() * nodes.length)];
        const p = screen(n);
        pings.push({ x: p.x, y: p.y, r: 2, life: 1 });
      }
      pings = pings.filter((p) => {
        p.r += 0.9;
        p.life -= 0.012;
        return p.life > 0;
      });

      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (!reduceMotion && visible && !frame) frame = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      mouse.x = x;
      mouse.y = y;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    visibilityObserver.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none h-full w-full ${className}`} />;
}
