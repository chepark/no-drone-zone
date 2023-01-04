export const dateIsoStringToMySqlDateTime = (dateString) => {
    const mySqlDateTime = dateString.slice(0, 19).replace("T", " ");
    return mySqlDateTime;
};
//# sourceMappingURL=dateFormatter.js.map