const formatDate = (date: Date): string => {
  let day: string = date.getDate().toString().padStart(2, "0");
  let month: string = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero based
  let year: string = date.getFullYear().toString();

  return `${month}/${day}/${year}`;
};

const calculateAge = (birthDate: string | Date | number): number => {
  const birthday = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }

  return age;
};

const formatTime = (date: Date): string => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Formatting is applied during the return statement, not by altering the type of `minutes`
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  return `${hours}:${formattedMinutes} ${ampm}`;
};

function formatTimeTo12Hour(datetimeStr: string): string {
  const date = new Date(datetimeStr);

  // Extract hours and minutes
  let hours = date.getUTCHours(); // Use getUTCHours() to get the time in UTC
  const minutes = date.getUTCMinutes(); // Use getUTCMinutes() for minutes in UTC

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Format minutes to be always two digits
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Construct formatted time string
  const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;

  return formattedTime;
}
export { formatDate, calculateAge, formatTime, formatTimeTo12Hour };
