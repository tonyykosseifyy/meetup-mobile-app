const formatDate = (date: Date): string => {
  let day: string = date.getDate().toString().padStart(2, "0");
  let month: string = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero based
  let year: string = date.getFullYear().toString();

  return `${month}/${day}/${year}`;
};

export { formatDate };