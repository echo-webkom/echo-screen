import { useEffect } from "react";
import { useMessage } from "../hooks/use-message";

export const MessageScreen = () => {
  const { data: message } = useMessage();

  useEffect(() => {
    const createdAtMs = new Date(message?.createdAt).getTime();
    const weekMs = 7 * 24 * 60 * 60 * 1000;

    if (new Date().getTime() < createdAtMs + weekMs) {
      return undefined;
    }
  }, [message]);

  return (
    <div className="flex flex-col items-center justify-center w-full py-20 px-8">
      <div className="bg-background/80 border border-gray-300 shadow-lg rounded-2xl p-12 max-w-5xl w-full text-center max-h-[600px] overflow-hidden">
        <h1 className="text-3xl font-semibold text-gray-700 mb-8">Hovedstyret taler!</h1>

        {message?.title && (
          <h2 className="text-5xl font-bold text-gray-900 mb-8">{message.title}</h2>
        )}

        <p className="text-2xl leading-relaxed text-gray-800 whitespace-pre-line">
          {message?.body}
        </p>
      </div>
    </div>
  );
};
