export const getTimeDifferenceInMinutes = (time: string): number => {
  const arrivalTime = new Date(time).getTime();
  const currentTime = new Date().getTime();
  return Math.floor((arrivalTime - currentTime) / (1000 * 60));
};

export const formatTime = (time: string): string => {
  const date = new Date(time);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const extractRouteNumber = (routeID: string): string => {
  const match = routeID.match(/SKY:Line:(\d+)/);
  return match ? match[1] : "";
};
