//Mui imports
import Grid from "@material-ui/core/Grid";

//Imports
import PageLoader from "../../components/Loader/Loader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GlobalState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { NavInitialState } from "../../redux/reducers/navReducer";
import Say from "../../components/Say/Say";
import Side from "./Side";
import { AxiosGetNavUser } from "../../redux/actions/navigationAactions/navAxios";
import { DataInitialState } from "../../redux/reducers/dataReducers";
import { AxiosCheckCredentials } from "../../redux/actions/userActions/userAxios";

const UserPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<string>(".");
  const DataState: DataInitialState = useSelector(
    (state: GlobalState) => state.data
  );
  const NavState: NavInitialState = useSelector(
    (state: GlobalState) => state.nav
  );

  useEffect(() => {
    dispatch(AxiosCheckCredentials());
  }, []);

  useEffect(() => {
    if (NavState.navUser === undefined && router.query.user !== undefined) {
      dispatch(AxiosGetNavUser(router.query.user));
    }
  }, [router.query.user]);

  return (
    <>
      {NavState.navUser === undefined ? (
        <PageLoader />
      ) : (
        <Grid className="is-w-75 m-auto">
          <Grid className="is-w-full has-background-white mb-2 has-rad-4 has-sha-m is-h-300 pb-2">
            <div className="container-div">
              <img
                src="/images/no-back-img.png"
                alt="back-img"
                className="is-w-full is-h-300 has-rad-4 is-rel"
              />
              <div className="logo">
                <img
                  src={
                    NavState.navUser !== undefined
                      ? NavState.navUser.mongoImgString
                      : null
                  }
                  alt="user-img"
                  className="round-img"
                />
              </div>
            </div>
          </Grid>
          <Grid className="is-flex">
            <Grid className="is-w-75 mr-2">
              {NavState?.navSay ? (
                NavState.navSay.map((say) => <Say key={say._id} say={say} />)
              ) : (
                <p>Loading..</p>
              )}
            </Grid>
            <Side
              bio={NavState.navUser !== undefined ? NavState.navUser.bio : null}
              location={
                NavState.navUser !== undefined
                  ? NavState.navUser.location
                  : null
              }
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserPage;
