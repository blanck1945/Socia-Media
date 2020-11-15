import Say from "../components/Say/Say";
import Profile from "../components/Profile/Profile";
import Auth from "./Auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosGetSayings } from "../redux/actions/dataActions/dataAxios";
import { SayInterface } from "../redux/actions/dataActions/dataActions";

//Mui imports
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Home() {
  const dispatch = useDispatch();
  const DataState = useSelector((state) => state.data);

  useEffect(() => {
    if (DataState.sayings === undefined) {
      dispatch(axiosGetSayings());
    } else {
      return;
    }
  }, []);

  return (
    <>
      <Auth />
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {DataState?.loading ? (
            <div className="is-flex is-align-center is-justify-center is-w-full is-h-full">
              <CircularProgress />
            </div>
          ) : (
            DataState?.sayings &&
            DataState.sayings.map((say: SayInterface, index: number) => (
              <Say key={index} say={say} />
            ))
          )}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    </>
  );
}
