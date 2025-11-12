import { useMessage } from "../hooks/use-message";

export const MessageScreen = () => {
  const { data: message } = useMessage();

  return (
    <div className="flex flex-col items-center w-full justify-center bg-background/70 border-2 shadow-lg rounded-lg p-6">
      <h1 className="text-5xl font-bold drop-shadow-lg">Hovedstyret taler!</h1>
      <h2 className="text-4xl mt-7">{message?.title}</h2>
      <p className="text-2xl text-center max-w-4xl mx-auto text-balance pt-8 text-gray-800 whitespace-pre-line">
        {message?.body}
      </p>
    </div>
  );
};
