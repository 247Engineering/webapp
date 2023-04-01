export const productImageReducer = (
  state: string[],
  action: { type: "add" | "delete" | "replace"; payload: string | string[] }
) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload as string];
    case "delete":
      return state.filter((image) => action.payload !== image);
    case "replace":
      return action.payload as string[];
  }
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export const getETA = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const earthRadius = 6371; // Earth's radius in kilometers
  const avgSpeedLimit = 80; // Assumed average speed limit in Nigeria in km/h
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c; // Distance in km
  const timeInHours = distance / avgSpeedLimit; // Time in hours
  const timeInMinutes = timeInHours * 60; // Time in minutes
  return timeInMinutes;
};
