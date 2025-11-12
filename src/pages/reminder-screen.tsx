export const ReminderScreen = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full pt-12">
        <div className="bg-background/70 overflow-hidden rounded-4xl w-9/10 min-h-full border-2 !border-[#d0a4a4] flex flex-col">
          <div className="bg-red-700 text-background pb-5 pt-2 !border-b-[#d0a4a4] border-b-2">
            <h1 className="flex text-6xl p-3 font-semibold text-center flex-col">
              Hold det ryddig!
            </h1>
          </div>
          <div className="flex flex-col pt-5">
            <p className="text-3xl p-3 text-center">
              Det har vært mye rot på lesesalene dette semesteret, spesielt kjøkkenet til beta.
            </p>
            <div className="mt-5">
              <p className="text-4xl text-center pt-5">Hvis dette ikke blir bedre</p>
              <div className="flex flex-row justify-center">
                <p className="text-6xl font-semibold text-center pt-5">⚠️FORSVINNER KAFFEN⚠️</p>
              </div>
            </div>
            <div>
              <p className="text-3xl text-center p-15">
                Rydd etter deg selv - så slipper andre å gjøre det
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
