export const ValgScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="bg-background/80 border-2 shadow-lg rounded-2xl p-10 max-w-6xl w-full text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Still selv */}
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-semibold text-gray-700 mb-4">Still til HS 26/27</h1>

            <p className="text-gray-600 mb-6">Vil du bidra i echo i 2026/2027?</p>

            <img
              src="/still-til-valg-qrcode.png"
              alt="Still til styret"
              className="max-h-[380px] object-contain"
            />
          </div>

          {/* Nominer */}
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-semibold text-gray-700 mb-4">Nominer noen til HS 26/27</h1>

            <p className="text-gray-600 mb-6">Kjenner du noen som passer i styret?</p>

            <img
              src="/nominer.png"
              alt="Nominer noen til styret"
              className="max-h-[380px] object-contain"
            />
          </div>
        </div>
        <p className="text-5xl font-bold my-6">Husk valg 16-18.mars!</p>
      </div>
    </div>
  );
};
