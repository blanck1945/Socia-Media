//Mui Imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Cancel from "@material-ui/icons/Cancel";
import SendIcon from "@material-ui/icons/Send";

import LinkComp from "../LinkComp/LinkComp";
import day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CustomBtn from "../myBtn/CustomBtn";
import DeleteSay from "../DeleteSay/DeleteSay";
import {
  clearComments,
  SayInterface,
} from "../../redux/actions/dataActions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import {
  axiosGetComments,
  axiosLikeSay,
  axiosUnLikeSay,
} from "../../redux/actions/dataActions/dataAxios";
import { GlobalState } from "../../redux/store";
import { UserInitialState } from "../../redux/reducers/userReducer";
import { useState } from "react";
import { DataInitialState } from "../../redux/reducers/dataReducers";
import SayDialog from "../SayDialog/SayDialog";

interface SayProps {
  say: SayInterface;
}

const Say = ({ say }: SayProps) => {
  day.extend(relativeTime);
  const dispatch = useDispatch();
  const UserState: UserInitialState = useSelector(
    (state: GlobalState) => state.user
  );
  const DataState: DataInitialState = useSelector(
    (state: GlobalState) => state.data
  );

  const [openModal, setOpenModal] = useState<boolean>(false);

  const userLikeSayings = () => {
    if (
      UserState.likes &&
      UserState.likes.find((like) => like.sayId === say._id)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const likeSay = () => {
    dispatch(axiosLikeSay(say._id));
    userLikeSayings();
  };

  const unlikeSay = () => {
    dispatch(axiosUnLikeSay(say._id));
    userLikeSayings();
  };

  const likeBtn = !UserState.authenticateUser ? (
    <CustomBtn tip="Like">
      <LinkComp url="/signIn">
        <FavoriteBorder color="primary" />
      </LinkComp>
    </CustomBtn>
  ) : userLikeSayings() ? (
    <CustomBtn tip="Undo Like" func={() => unlikeSay()}>
      <FavoriteIcon color="primary" />
    </CustomBtn>
  ) : (
    <CustomBtn tip="Like" func={() => likeSay()}>
      <FavoriteBorder color="primary" />
    </CustomBtn>
  );

  const deleteBtn =
    UserState.authenticateUser && UserState.credentials.name === say.name ? (
      <DeleteSay sayId={say._id} />
    ) : null;

  const handleOpenAndRequest = () => {
    dispatch(axiosGetComments(say.sayingId));
    setOpenModal(!openModal);
  };

  const handleClose = () => {
    dispatch(clearComments());
    setOpenModal(!openModal);
  };

  return (
    <>
      <SayDialog
        handleClose={handleClose}
        likeBtn={likeBtn}
        openModal={openModal}
        say={say}
      />
      <Card className="mb-4 is-flex is-h-175 is-click">
        <CardMedia
          image={
            say.mongoImgString !== "No user in Mongo DB"
              ? say.mongoImgString
              : say.userImage
          }
          title="profileImg"
          className="image is-h-200 is-w-30"
        />
        <Grid className="is-w-80 is-flex is-dis-col">
          <Grid className="is-w-full has-back-blue is-h-35 has-background-white is-flex is-align-center pt-1">
            <h3 className="has-text-blue f-size-1-1 pl-2 has-text-black is-bold">
              By {say.name}
            </h3>
            <Typography
              variant="body2"
              color="textSecondary"
              className="mr-4  is-bold has-text-blue pl-2 has-bor-1 has-background-white"
            >
              Publish {day(say.createdAt).fromNow()}
            </Typography>
          </Grid>
          <Grid className=" is-flex has-back-white mt-1 is-h-75">
            <h3 className="pl-2 has-text-blue f-size-1-2 is-bold">
              {say.body}
            </h3>
          </Grid>
          <Grid className="pl-2  is-w-full is-h-50 is-flex is-align-center is-justify-between ">
            <Grid className=" is-flex is-align-center pl-2">
              {likeBtn}
              <span className="ml-2 mr-4 has-text-blue">
                {say.likeCount} likes
              </span>
              <CustomBtn tip="Add a comment">
                <ChatIcon
                  color="primary"
                  onClick={() => handleOpenAndRequest()}
                />
              </CustomBtn>
              <span className="ml-2 mr-4 has-text-blue">
                {say.commentCount} comments
              </span>
            </Grid>
            {deleteBtn}
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Say;
