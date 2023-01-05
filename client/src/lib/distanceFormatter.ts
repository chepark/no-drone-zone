export const distanceFormatter = (distance: number) => {
  const fixedPointDistance = Number(distance).toFixed(2);
  return fixedPointDistance;
};
