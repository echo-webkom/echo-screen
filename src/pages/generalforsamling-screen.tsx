export const GeneralforsamlingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center bg-background/80 border-2 shadow-lg rounded-2xl h-150 p-8 max-w-5xl w-full text-center max-h-150 overflow-hidden">
        <h1 className="text-7xl font-semibold text-gray-700 mb-6">Generalforsamling idag!</h1>
        <p className="text-lg text-gray-600 mb-4 italic">Meld deg på her</p>
        <img
          src="/generalforsamling.png"
          alt="Generalforsamling"
          className="mx-auto mb-6 w-48 h-48 object-contain"
        />
        <p className="text-2xl text-gray-600 mb-4">Det blir mat, premier og demokrati! 😎</p>
        <p className="text-2xl text-gray-600 mb-4">Så håper å se deg der 🫵</p>
      </div>
    </div>
  );
};
