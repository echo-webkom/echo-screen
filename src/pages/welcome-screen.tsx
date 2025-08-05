import vervqr from "../assets/vervqr.png";
import echoqr from "../assets/echoqr.png";

export default function WelcomeScreen() {
  return (
    <>
      <h1 className="flex text-8xl font-semibold text-center flex-col pt-20">
        Velkommen til lesesalen nye echo-ere!
      </h1>
      <div className="text-4xl text-center pt-4 text-gray-600">
        Lesesalen er åpen hver dag for alle studenter som er medlem i echo. På lesesalen finner du
        gratis kaffe, programmerbar (åpen hver fredag) og alle dine medstudenter!
      </div>
      <div className="flex justify-center gap-48 text-6xl font-semibold pt-16 ">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="pb-2">Husk å søke verv!</h1>
          <img width={580} src={vervqr} className="bg-white/50 border-2 rounded-lg shadow-lg" />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <h1 className="pb-2">Sjekk ut echo.uib.no!</h1>
          <img width={580} className="bg-white/50 border-2 rounded-lg shadow-lg" src={echoqr} />
        </div>
      </div>
    </>
  );
}
