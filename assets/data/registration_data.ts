const registrationDataMyself = {
  title: "Start your Story",
  subtitle: "Join Le2ine, find friends, and share laughs",
  name: "Your Name",
  occupation: "Your Occupation",
  email: "Your Email",
  password: "Your Password",
  dateOfBirth: "Date of Birth",
  bio: "Your Bio",
};

const registrationDataMothers = {
  title: "Connect Mom",
  subtitle: "Help her meet friends on Le2ine",
  name: "Her Name",
  occupation: "Her Occupation",
  email: "Email",
  password: "Password",
  dateOfBirth: "Her Date of birth",
  bio: "Her Bio",
};

const registrationDataEdit = {
  title: "Account Details",
  subtitle: "All your information can be edited here.",
  name: "Your Name",
  occupation: "Your Occupation",
  email: "Your Email",
  password: "Your Password",
  dateOfBirth: "Date of Birth",
  bio: "Your Bio",
};

interface IRegistrationData {
  title: string;
  subtitle: string;
  name: string;
  occupation: string;
  email: string;
  password: string;
  dateOfBirth: string;
  bio: string;
}

const registrationData = {
  myself: registrationDataMyself,
  mothers: registrationDataMothers,
  edit: registrationDataEdit,
};

export { IRegistrationData };

export default registrationData;
