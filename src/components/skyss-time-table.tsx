export default function SkyssTimeTable() {
    return (
        <div className="relative h-96">
            <h1 className="absolute inset-x-0 text-center pt-2 z-30 text-2xl font-semibold bg-white">Bybane avganger</h1>
            <embed
                src="https://avgangsvisning.skyss.no/view/#/?stops=NSR:StopPlace:58544%7CNSR:Quay:53150,NSR:StopPlace:58544%7CNSR:Quay:53151&viewFreq=10000&type=TERMINAL&colors=light"
                className="w-full h-96 pt-2 transform -translate-y-8"
            />
        </div>
    );
}
