//Mui Imports
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { DataInitialState } from "../redux/reducers/dataReducers";
import { GlobalState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setNavUser } from "../redux/actions/navigationAactions/navigationActions";
import { AxiosGetNavSays } from "../redux/actions/navigationAactions/navAxios";
import { useRouter } from "next/router";
import { setGlobalLoadingOn } from "../redux/actions/uiActions/uiActions";
import { UiInitialState } from "../redux/reducers/uiReducers";
import PageLoader from "../components/Loader/Loader";

const SearchResults = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const UiState: UiInitialState = useSelector((state: GlobalState) => state.ui);
  const DataState: DataInitialState = useSelector(
    (state: GlobalState) => state.data
  );

  const getUser = (user) => {
    dispatch(setGlobalLoadingOn());
    const username = user.name;

    const filterUser = DataState.searchResult.filter(
      (result) => result.name === username
    );

    dispatch(setNavUser(filterUser[0]));
    dispatch(AxiosGetNavSays(username, router));
  };

  return (
    <>
      {UiState.globalLoading ? (
        <PageLoader />
      ) : (
        <Grid className="has-background-light is-w-80 m-auto  grid-2 ">
          {DataState?.searchResult?.length !== 0 ? (
            DataState?.searchResult?.map((result, index: number) => (
              <Paper
                key={index}
                className="is-flex  is-h-175 is-w-90 m-auto my-2 "
              >
                <img
                  src={
                    result.mongoImgString
                      ? result.mongoImgString
                      : "./images/no-user-photo.png"
                  }
                  alt="user-photo"
                  className="is-w-45 is-h-175"
                />
                <div className="is-w-full is-flex is-dis-col is-justify-between">
                  <div
                    onClick={() => getUser(result)}
                    className="has-text-white is-bold is-click f-size-1-1 is-w-full text-center has-back-blue"
                  >
                    @{result.name}
                  </div>
                  <div>
                    <h4 className="has-text-blue text-center ">{result.bio}</h4>
                    <h4 className="has-text-blue text-center">
                      {result.location}
                    </h4>
                  </div>
                  <div className="is-w-full my-2 is-flex is-align-center is-justify-center">
                    <button className="mx-2 btn has-back-blue has-text-white px-4 py-2">
                      Add to Friends
                    </button>
                  </div>
                </div>
              </Paper>
            ))
          ) : (
            <p>No Results</p>
          )}
        </Grid>
      )}
    </>
  );
};

export default SearchResults;
