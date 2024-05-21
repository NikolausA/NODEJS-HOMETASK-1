export const getCurrentDate = () => {
  const dateTimestamp = new Date();
  const day = dateTimestamp.getDate();
  const month = dateTimestamp.getMonth();
  const year = dateTimestamp.getFullYear();

  return `${day}-${month}-${year}`;
};
