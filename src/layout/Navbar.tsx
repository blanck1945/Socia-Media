import React, { useContext, useState } from "react";
import LinkComp from "../components/LinkComp/LinkComp";
import CustomBtn from "../components/myBtn/CustomBtn";
import PostSay from "../components/PostSay/PostSay";
import { useDispatch, useSelector } from "react-redux";
import { axiosLogOut } from "../redux/actions/userActions/userAxios";
import { useRouter } from "next/router";
import { toogleModal } from "../redux/actions/uiActions/uiActions";
import { UiInitialState } from "../redux/reducers/uiReducers";
import { GlobalState } from "../redux/store";

//MUI imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

//icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import Notifications from "@material-ui/icons/Notifications";
import { AxiosFindUser } from "../redux/actions/dataActions/dataAxios";

const Navbar = () => {
  const UserState = useSelector((state) => state.user);
  const UiState: UiInitialState = useSelector((state: GlobalState) => state.ui);
  const dispatch = useDispatch();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");

  const searchInDb = () => {
    dispatch(AxiosFindUser(searchValue, router));
    setSearchValue("");
  };

  const handlerOpen = () => {
    dispatch(toogleModal());
    {
      UiState.openModal ? <PostSay /> : null;
    }
  };

  return (
    <AppBar>
      <Toolbar className="is-flex is-justify-between">
        {UiState.openModal ? <PostSay /> : null}
        <LinkComp url="/" linkClass="is-click has-text-white f-size-1-5">
          Anime-Social-Web
        </LinkComp>
        <div className="is-w-55  is-flex is-align-center is-justify-between">
          {UserState.authenticateUser ? (
            <>
              <Grid className="is-flex  is-w-55 ">
                <CustomBtn tip="Add a Say!!" func={handlerOpen}>
                  <AddIcon className="has-text-white mx-1" />
                </CustomBtn>
                <CustomBtn tip="Home">
                  <LinkComp
                    url="/home"
                    linkClass="is-click has-text-white f-size-1-5 mx-1"
                  >
                    <HomeIcon className="has-text-white" />
                  </LinkComp>
                </CustomBtn>
                <CustomBtn tip="Notifications">
                  <Notifications className="has-text-white mx-1" />
                </CustomBtn>
                <Grid className="is-flex is-align-center is-w-full has-back-blue is-h-35 m-auto ml-1">
                  <input
                    placeholder="Find Interesting Peoples...."
                    className="is-w-full is-h-35"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <SearchIcon
                    className="has-back-blue mx-1 is-click"
                    onClick={() => searchInDb()}
                  />
                </Grid>
              </Grid>
              <button
                className="b-none is-click has-back-blue px-4 pt-2 pb-2 has-text white mx-4 has-text-white has-rad-4 is-click-4 f-size-1-3"
                onClick={() => dispatch(axiosLogOut(router))}
              >
                SignOut
              </button>
            </>
          ) : (
            <div className="is-w-full is-flex is-align-center is-justify-end">
              <LinkComp
                url="/signIn"
                linkClass="is-click has-text-white f-size-1-5"
              >
                SignIn
              </LinkComp>
              <LinkComp
                url="signUp"
                linkClass="has-background-info px-4 py-1 has-text white mx-4 has-text-white has-rad-4 is-click-4 f-size-1-3"
              >
                SignUp
              </LinkComp>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
