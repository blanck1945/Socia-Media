import Axios from "axios";

export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/"
    : "vercelURL";

export const axiosSender = async (reqData: any, url?: string) => {
  const { data } = await Axios({
    method: "POST",
    url: baseURL + url,
    data: reqData,
  });

  return data;
};

export const axiosFetcher = async (url: string) => {
  try {
    const { data } = await Axios.get(baseURL + url);
    return data;
  } catch (err) {
    console.log(err.response.data);
  }
};
