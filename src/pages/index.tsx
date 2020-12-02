//Mui imports
import Grid from "@material-ui/core/Grid";
import { GlobalState } from "../redux/store";
import { UserInitialState } from "../redux/reducers/userReducer";
import { DataInitialState } from "../redux/reducers/dataReducers";
import { AxiosCheckCredentials } from "../redux/actions/userActions/userAxios";
import { UiInitialState } from "../redux/reducers/uiReducers";

import Say from "../components/Say/Say";
import Profile from "../components/Profile/Profile";
import RegisterMsg from "../components/RegisterMsg/RegisterMsg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AxiosGetOwnSayings } from "../redux/actions/dataActions/dataAxios";
import { SayInterface } from "../redux/actions/dataActions/dataActions";
import PageLoader from "../components/Loader/Loader";
import { setGlobalLoadingOff } from "../redux/actions/uiActions/uiActions";

export default function Home() {
  const dispatch = useDispatch();
  const DataState: DataInitialState = useSelector(
    (state: GlobalState) => state.data
  );
  const UserState: UserInitialState = useSelector(
    (state: GlobalState) => state.user
  );
  const UiState: UiInitialState = useSelector((state: GlobalState) => state.ui);

  useEffect(() => {
    if (!UserState.authenticateUser) {
      dispatch(AxiosCheckCredentials());
    }
  }, []);

  useEffect(() => {
    if (DataState.OwnSayings === undefined) {
      dispatch(AxiosGetOwnSayings());
    }
  }, []);

  useEffect(() => {
    if (
      UserState.credentials !== undefined &&
      DataState.OwnSayings !== undefined
    ) {
      dispatch(setGlobalLoadingOff());
    }
  }, [UserState.credentials]);

  /* DataState?.OwnSayings === undefined ? (
      <div className="is-flex  is-align-center is-justify-center is-w-full is-hv-90">
        <img src={selectPic()} alt="loading-image" />
      </div>
    ) : 
    
    : UiState.globalLoading ? (
    <div className="is-flex  is-align-center is-justify-center is-w-full is-hv-90">
      <img src={selectPic()} alt="loading-image" />
    </div>
  )*/

  const sayDis = UserState.authenticateUser ? (
    DataState?.OwnSayings?.length === 0 ? (
      <Grid className="has-background-white ml-4 is-h-50 has-rad-4 has-sha-m">
        <p className="f-size-1-2 text-center has-text-blue is-bold">
          Say to the world what you want
        </p>
      </Grid>
    ) : (
      <>
        <Grid sm={8} xs={12}>
          {DataState?.OwnSayings?.map((say: SayInterface, index: number) => (
            <Say key={index} say={say} />
          ))}
        </Grid>
      </>
    )
  ) : (
    <RegisterMsg />
  );

  return (
    <>
      <Grid container spacing={10} className="mt-4">
        {UiState.globalLoading ? (
          <PageLoader />
        ) : (
          <>
            <Grid sm={4} xs={12}>
              <Profile />
            </Grid>
            <Grid sm={8} xs={12}>
              {sayDis}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

//<Auth />
