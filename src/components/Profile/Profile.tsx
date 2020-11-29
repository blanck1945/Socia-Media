//MUI imports
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import PhotoIcon from "@material-ui/icons/Photo";
import EditIcon from "@material-ui/icons/Edit";
import EditDetails from "../EditDetails/EditDetails";

import LinkComp from "../LinkComp/LinkComp";
import React, { useState } from "react";
import FriendListDialog from "./FriendListDialog/FriendListDialog";
import { useSelector, useDispatch } from "react-redux";
import { AxiosUploadImg } from "../../redux/actions/userActions/userAxios";
import dayjs from "dayjs";
import { UiInitialState } from "../../redux/reducers/uiReducers";
import { GlobalState } from "../../redux/store";
import { UserInitialState } from "../../redux/reducers/userReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const UiState: UiInitialState = useSelector((state: GlobalState) => state.ui);

  //state Variables

  const [openFriendList, setOpenFriendList] = useState<boolean>(false);
  const [line, setLine] = useState<boolean>(false);

  //Close FriendList

  const toogleList = () => {
    setOpenFriendList(!openFriendList);
  };

  const UserState: UserInitialState = useSelector(
    (state: GlobalState) => state.user
  );
  console.log(UserState.credentials);
  const {
    name,
    createdAt,
    defaultImg,
    bio,
    website,
    location,
    mongoImgString,
  } = UserState.credentials;

  const { authenticateUser } = useSelector((state) => state.user);

  const selectAndUploadImage = async (e: any) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    dispatch(AxiosUploadImg(formData));
  };

  const clickBtn = () => {
    const fileInput = document.getElementById("image");
    fileInput.click();
  };

  const joinDay = dayjs(createdAt).format("MMM YYYY");

  let profileMark = !UiState.globalLoading ? (
    authenticateUser ? (
      <Paper className="mx-4">
        <Grid className="has-back-blue is-flex -is-align-center is-justify-between px-2">
          <p
            onClick={() => setLine(!line)}
            className="has-back-blue has-text-white text-center f-size-1-2 is-bold py-1"
          >
            @{name}
          </p>
          <PhotoIcon
            className="has-text-white is-click mt-1"
            onClick={() => clickBtn()}
          />
          <input
            type="file"
            hidden
            id="image"
            onChange={selectAndUploadImage}
          />
        </Grid>
        <div className="is-flex is-align-center  is-dis-col">
          <div className="is-flex is-align-center ">
            <img
              src={defaultImg === "none" ? mongoImgString : defaultImg}
              alt="userImage"
              className="mb-2 is-w-full "
            />
          </div>

          {bio && (
            <Grid sm={12} className="mb-2 is-w-80 text-center">
              {bio}
            </Grid>
          )}
          <Grid className="is-flex is-w-50 is-dis-col is-align-start  my-2">
            {location && (
              <Grid sm={12} className="my-4 is-flex is-align-center">
                <LocationOn color="primary" className="ml-4" />
                <span className="ml-4 ">{location}</span>
              </Grid>
            )}
            {website && (
              <Grid sm={12} style={{ overflow: "hidden" }} className=" my-2 ">
                <LinkIcon color="primary" className="ml-4 mt-0-5" />
                <a className="ml-4" href={website} target="_blank">
                  {website}
                </a>
              </Grid>
            )}
            <Grid sm={12} xs={12} className="is-flex is-align-center">
              <CalendarToday color="primary" className="ml-4" />
              <span className="ml-4">Joined {joinDay}</span>
            </Grid>
          </Grid>
          <Grid sm={12} className="is-flex is-align-center is-justify-evenly">
            <EditDetails />
            <input
              hidden={true}
              type="file"
              id="image"
              onChange={(e) => selectAndUploadImage(e)}
            />
            <Tooltip title="Edit profile picture" placement="top">
              <IconButton onClick={clickBtn} className="fix-btn is-abs z-5">
                <PhotoIcon className="has-text-blue" />
              </IconButton>
            </Tooltip>
          </Grid>
        </div>
        <Grid
          onClick={() => toogleList()}
          className="is-w-full is-h-35 is-flex is-click is-align-center is-justify-center has-back-blue"
        >
          <p className="has-text-white f-size-1-1 ">FriendList</p>
        </Grid>
        <FriendListDialog
          openFriendList={openFriendList}
          closeFriendList={toogleList}
        />
      </Paper>
    ) : (
      <Paper className="mr-2">
        <Typography variant="body2" align="center" className="pt-2 ">
          ¿No Profile? - Dont stay outside from the wave
        </Typography>
        <div className="is-flex is-align-center is-justify-evenly py-4">
          <LinkComp
            url="/signIn"
            linkClass="btn has-background-primary b-none px-4 py-2 has-text-white f-size-1-2"
          >
            Login
          </LinkComp>
          <LinkComp
            url="signUp"
            linkClass="btn has-background-link px-4 py-2 has-text-white f-size-1-2"
          >
            Register
          </LinkComp>
        </div>
      </Paper>
    )
  ) : (
    <Paper className="is-w-full is-h-300 is-flex is-align-center is-justify-center">
      <CircularProgress size={50} />
    </Paper>
  );

  return profileMark;
};

export default Profile;
