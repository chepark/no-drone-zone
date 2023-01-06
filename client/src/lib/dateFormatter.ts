/**
 *
 * @param dateString - Format example: "2023-01-06T10:16:09.584Z"
 * @returns - Date in string from of "YYYY-MM-DD HH:MM:SS". Ex) 2023-01-06 08:18:49
 */

export const formatDate = (dateString: string) => {
  const mySqlDateTime = dateString.slice(0, 19).replace("T", " ");
  return mySqlDateTime;
};
