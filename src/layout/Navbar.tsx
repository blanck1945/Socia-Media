import React, { useContext } from "react";
import LinkComp from "../components/LinkComp/LinkComp";
import CustomBtn from "../components/myBtn/CustomBtn";
import PostSay from "../components/PostSay/PostSay";
import { useDispatch, useSelector } from "react-redux";
import { axiosLogOut } from "../redux/actions/userActions/userAxios";
import { useRouter } from "next/router";

//MUI imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

//icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";
import { toogleModal } from "../redux/actions/uiActions/uiActions";
import { UiInitialState } from "../redux/reducers/uiReducers";
import { GlobalState } from "../redux/store";

const Navbar = () => {
  const UserState = useSelector((state) => state.user);
  const UiState: UiInitialState = useSelector((state: GlobalState) => state.ui);
  const dispatch = useDispatch();
  const router = useRouter();

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
              <div className="is-flex">
                <CustomBtn tip="Add a Say!!" func={handlerOpen}>
                  <AddIcon className="has-text-white" />
                </CustomBtn>
                <CustomBtn tip="Home">
                  <HomeIcon className="has-text-white" />
                </CustomBtn>
                <CustomBtn tip="Notifications">
                  <Notifications className="has-text-white" />
                </CustomBtn>
              </div>
              <button
                className="b-none is-click has-background-info px-4 pt-2 pb-2 has-text white mx-4 has-text-white has-rad-4 is-click-4 f-size-1-3"
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
