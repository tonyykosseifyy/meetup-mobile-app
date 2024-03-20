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

export { formatDate, calculateAge };
