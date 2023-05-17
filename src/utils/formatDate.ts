export const getTodayDate = () => {
  // get the current date and time
  const currentDate = new Date();

  // format the date in the desired format
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate; // outputs something like "2023-05-10"
};

export const formatDate = (string: string) => {
  const date = new Date(string);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
