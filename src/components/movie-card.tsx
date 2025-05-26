import { useNextMovie } from "../hooks/use-happenings";
import { dateAndTime } from "../utils/date";

export function MovieCard() {
  const { nextMovie } = useNextMovie();

  return (
    <>
      {nextMovie && (
        <div className="h-full rounded-lg bg-background/70 border-2 shadow-lg flex-auto">
          {nextMovie && (
            <div className="flex h-full">
              <div className="overflow-hidden h-full">
                <img
                  src={nextMovie.image}
                  alt={nextMovie.title}
                  className="h-full w-full object-cover p-3 rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-between space-y-2 h-full p-3 rounded-lg">
                <div>
                  <h1 className="text-muted-foreground text-sm">Neste filmvisning: </h1>
                  <h1 className="font-semibold text-3xl my-2 line-clamp-1">{nextMovie.title} </h1>
                </div>
                <div className="h-auto flex items-center justify-center">
                  <div className="w-full text-left space-y-3">
                    <p>
                      <span className="font-semibold">Dato:</span> {dateAndTime(nextMovie.date)}
                    </p>
                    <p>
                      <span className="font-semibold">Sted:</span> store aud
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Ingen påmelding og gratis snacks</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
