/**
 * Format the Date ISO format(ISO 8601)
 * to the Datetime data type in MySQL.
 *
 * @param dateString - The snapshotTimestamp data fetched from Reaktor drones api. Ex) "2023-01-06T10:16:09.584Z"
 * @returns - Date in string from of "YYYY-MM-DD HH:MM:SS". Ex) 2023-01-06 08:18:49
 */

export const dateIsoStringToMySqlDateTime = (dateString: string): string => {
  const mySqlDateTime = dateString.slice(0, 19).replace("T", " ");
  return mySqlDateTime;
};
