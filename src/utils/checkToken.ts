import jwtDecode from "jwt-decode";

export const verifyTokenAge = (token: string) => {
  const decodedToken: any = jwtDecode(token);
  const result = decodedToken.exp * 1000 < Date.now();
  if (result) {
    return false;
  } else {
    return true;
  }
};

export const checkToken = (token, router) => {
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const tokenAge = decodedToken.exp;
    const now = Date.now();
    const result = tokenAge < now ? true : false;
    if (!result) {
      return router.push("/signIn");
    }
  } else {
    console.log("No token");
    return router.push("/signIn");
  }
};
