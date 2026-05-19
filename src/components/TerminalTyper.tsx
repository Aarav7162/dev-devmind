import { useEffect, useRef, useState } from "react";

interface Props {
  frames: string[];
  className?: string;
  charDelay?: number;
  framePause?: number;
  onTick?: () => void;
}

export function TerminalTyper({ frames, className = "", charDelay = 14, framePause = 1800, onTick }: Props) {
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(true);
  const caretRef = useRef<HTMLSpanElement | null>(null);
  const idx = useRef(0);
  const pos = useRef(0);
  const decay = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bumpCaret = () => {
    const el = caretRef.current;
    if (!el) return;
    el.style.setProperty("--caret-i", "1");
    if (decay.current) clearTimeout(decay.current);
    decay.current = setTimeout(() => {
      caretRef.current?.style.setProperty("--caret-i", "0");
    }, 110);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = frames[idx.current];
      if (pos.current < current.length) {
        pos.current += 1;
        setText(current.slice(0, pos.current));
        setTyping(true);
        bumpCaret();
        onTick?.();
        timer = setTimeout(tick, current[pos.current - 1] === "\n" ? charDelay * 2 : charDelay);
      } else {
        setTyping(false);
        timer = setTimeout(() => {
          idx.current = (idx.current + 1) % frames.length;
          pos.current = 0;
          setText("");
          tick();
        }, framePause);
      }
    };
    tick();
    return () => {
      clearTimeout(timer);
      if (decay.current) clearTimeout(decay.current);
    };
  }, [frames, charDelay, framePause, onTick]);

  return (
    <pre className={`font-mono whitespace-pre-wrap text-[13px] leading-relaxed ${className}`}>
      {text}
      <span ref={caretRef} className={`caret${typing ? "" : " idle"}`} aria-hidden>
        ▍
      </span>
    </pre>
  );
}
