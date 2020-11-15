import LinkComp from "../LinkComp/LinkComp";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "../../redux/actions/userActions/userAxios";
import dayjs from "dayjs";

//MUI imports
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import EditDetails from "../EditDetails/EditDetails";

const Profile = () => {
  const dispatch = useDispatch();

  const {
    loading,
    authenticateUser,
    credentials: { user, createdAt, imageUrl, bio, website, location },
  } = useSelector((state) => state.user);

  const selectAndUploadImage = async (e: any) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  };

  const clickBtn = () => {
    const fileInput = document.getElementById("image");
    fileInput.click();
  };

  const mark = `@${user}`;
  const joinDay = dayjs(createdAt).format("MMM YYYY");

  let profileMark = !loading ? (
    authenticateUser ? (
      <Paper className="">
        <div className="is-flex is-align-center  is-dis-col">
          <div className="is-flex is-align-center ">
            <img src={imageUrl} alt="userImage" className="mb-2 is-w-full " />
            <input
              hidden={true}
              type="file"
              id="image"
              onChange={(e) => selectAndUploadImage(e)}
            />
            <Tooltip title="Edit profile picture" placement="top">
              <IconButton onClick={clickBtn} className="fix-btn is-abs z-5">
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <MuiLink
              component={LinkComp}
              color="primary"
              variant="h5"
              linkClass="f-size-1-2"
              url={`/users/${user}`}
            >
              {mark}
            </MuiLink>
          </div>
          {bio && <span className="mb-2 is-w-80 text-center">{bio}</span>}
          {location && (
            <div className="is-flex  is-w-50 my-2">
              <LocationOn color="primary" className="ml-4" />
              <span className="ml-4 mt-1">{location}</span>
            </div>
          )}
          {website && (
            <div className="is-flex  is-w-50 my-2">
              <LinkIcon color="primary" className="ml-4 mt-0-5" />
              <a className="ml-4" href={website} target="_blank">
                {website}
              </a>
            </div>
          )}
          <div className="is-flex  is-w-50 my-2">
            <CalendarToday color="primary" className="ml-4 mt-0-5" />
            <a />
            <span className="ml-4">Joined {joinDay}</span>
          </div>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper>
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
