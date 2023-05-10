
export const getTodayDate = () => {
  // get the current date and time
  const currentDate = new Date();

  // format the date in the desired format
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
    console.log("Fetch today date: ",formattedDate)
  return formattedDate; // outputs something like "2023-05-10"
}