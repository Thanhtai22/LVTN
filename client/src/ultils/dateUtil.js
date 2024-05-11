import moment from "moment";
export const getDateOnVN = (date) => {
  // Create a new Date object from the input string
  const originalDate = new Date(date);
  const formattedDate1 = moment(originalDate).format("YYYY-MM-DD HH:mm:ss");
  // Format the resulting date as a string (in UTC format like the original)
  return formattedDate1;
};
