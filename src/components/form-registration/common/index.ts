export const calcPersonAge = (birthDate: string) => {
  const birthDateAsDate = new Date(birthDate);
  const currentData = new Date();

  const personAgeInMilliseconds = currentData.getTime() - birthDateAsDate.getTime();
  const personAgeInYears = Math.floor(personAgeInMilliseconds / (1000 * 60 * 60 * 24 * 365));

  return personAgeInYears;
};