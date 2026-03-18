import { useMessage } from "../hooks/use-message";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import HeartsMinimal from "../components/valentines";

export const MessageScreen = () => {
  const { data: message } = useMessage();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="bg-background/80 border-2 shadow-lg rounded-2xl p-8 max-w-5xl w-full text-center max-h-[600px] overflow-hidden">
        <h1 className="text-3xl font-semibold mb-6">Hovedstyret taler!</h1>

        {message?.title && <h2 className="text-5xl font-bold mb-6">{message.title}</h2>}

        <p className="text-2xl leading-relaxed text-muted-foreground whitespace-pre-line">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message?.body}</ReactMarkdown>
        </p>
      </div>
    </div>
  );
};
