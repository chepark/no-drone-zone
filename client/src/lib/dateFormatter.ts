export const formatDate = (dateString: string) => {
  const mySqlDateTime = dateString.slice(0, 19).replace("T", " ");
  return mySqlDateTime;
};
