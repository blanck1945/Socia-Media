export const validateField = (value: string, length: number) => {
  if (value === "") {
    return {
      validation: false,
      msg: "Say cant be empty",
    };
  }

  if (length < 0) {
    return {
      validation: false,
      msg: "Say pass the maximum caracters",
    };
  }

  return {
    validation: true,
    msg: "validation Pass",
  };
};
