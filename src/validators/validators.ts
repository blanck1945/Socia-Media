export const isEmpty = (value: string) => {
  if (value.trim() === "") {
    return `esta vacio`;
  }
  return undefined;
};

export const isEmail = (email: string) => {
  const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (email.match(regEx)) return true;
  else return false;
};
