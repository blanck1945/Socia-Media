//Mui imports
import Grid from "@material-ui/core/Grid";

import { useEffect } from "react";
import { GlobalState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { DataInitialState } from "../redux/reducers/dataReducers";

const home = () => {
  const dispatch = useDispatch();

  const DataState: DataInitialState = useSelector(
    (state: GlobalState) => state.data
  );

  useEffect(() => {
    if (DataState.sayings === undefined) {
    }
  });

  return (
    <Grid container>
      <Grid xl={12}>
        <p>Friends say are here</p>
      </Grid>
    </Grid>
  );
};

export default home;
