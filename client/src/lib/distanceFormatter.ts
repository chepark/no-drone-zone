/**
 * Defines the fixed points.
 * ex) 85.61368680070498 -> 85.61
 *
 * @param distance
 * @returns
 */
export const distanceFormatter = (distance: number) => {
  const fixedPointDistance = Number(distance).toFixed(2);
  return fixedPointDistance;
};
