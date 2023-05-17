export const CardStyle = (isToday: boolean): Record<string, unknown> => {
  return {
    minWidth: "100%",
    textAlign: "left",
    backgroundColor: isToday ? "#d0e8ff" : "#ffffff",
  };
};

export const CardSubheader = (date: string): string => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
