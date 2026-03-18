import { useEffect, useRef, useState } from "react";
import { useMessage } from "../hooks/use-message";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import HeartsMinimal from "../components/valentines";

export const MessageScreen = () => {
  const { data: message } = useMessage();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [message?.body, message?.title]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        ref={cardRef}
        className="bg-background/80 border-2 shadow-lg rounded-2xl p-8 max-w-5xl w-full text-center max-h-[600px] overflow-hidden"
      >
        <h1 className="text-3xl font-semibold text-gray-700 mb-6">Hovedstyret taler!</h1>

        {message?.title && (
          <h2 className="text-5xl font-bold text-gray-900 mb-6">{message.title}</h2>
        )}

        <div className="text-2xl leading-relaxed text-gray-800 whitespace-pre-line">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message?.body}</ReactMarkdown>
        </div>
        {isOverflowing && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl">...</div>
        )}
      </div>
    </div>
  );
};
