

export default function BentoScreen() {
    return (
        <div className="grid grid-cols-10 grid-rows-8 h-[calc(100vh-12rem)] w-[100%] gap-6">
          
          <div className="border-2 border-black rounded-md col-span-10 row-span-3">
            hello
          </div>
          <div className="border-2 border-black rounded-md col-span-3 row-span-4">
            Dagens bursdag
          </div>
          <div className="border-2 border-black rounded-md col-span-4 row-span-4">
            Dagens bursdag
          </div>
        </div>
    )
}