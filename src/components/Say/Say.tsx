//Mui Imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
import { UiInitialState } from "../../redux/reducers/uiReducers";
import { useState } from "react";
import { DataInitialState } from "../../redux/reducers/dataReducers";

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
      UserState.likes.find((like) => like.sayId === say.sayingId)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const likeSay = () => {
    dispatch(axiosLikeSay(say.sayingId));
    userLikeSayings();
  };

  const unlikeSay = () => {
    dispatch(axiosUnLikeSay(say.sayingId));
    userLikeSayings();
  };

  console.log(DataState.comments);

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
    UserState.authenticateUser && UserState.credentials.user === say.user ? (
      <DeleteSay sayId={say.sayingId} />
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
      <div className={openModal ? "is-active modal" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-content is-w-45 has-background-white px-2 py-2 has-rad-4">
          <Cancel
            className="has-text-metal has-background-white is-click"
            onClick={() => handleClose()}
          />
          <div className="is-flex is-justify-between">
            <CardMedia
              image={
                say.mongoImgString !== "No user in Mongo DB"
                  ? say.mongoImgString
                  : say.userImage
              }
              title="profileImg"
              className="is-w-60 is-h-450 "
            />
            <div className="is-flex is-align-center is-dis-col px-4 is-w-40">
              <Typography
                variant="h5"
                component={LinkComp}
                url={`/users/${say.user}`}
                linkClass="has-text-info f-size-1-3 mb-1"
              >
                {say.user}
              </Typography>
              <Typography
                variant="body1"
                className="text-center has-background-light has-rad-4 px-2 py-2"
              >
                {say.body}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className="mt-1"
              >
                {day(say.createdAt).fromNow()}
              </Typography>
              <div className="my-2">
                {likeBtn}
                <span className="ml-2 mr-4">{say.likeCount} likes</span>
              </div>
              <div className="has-background-light is-w-full">
                <p className="has-background-link has-text-white  text-center has-rad-4">
                  Comments
                </p>
                {DataState.comments !== undefined ? (
                  DataState.comments.map((el, index) => (
                    <div
                      key={index}
                      className="has-background-white mx-1  my-2 px-2 pb-1 has-rad-4"
                    >
                      <p>{el.body}</p>
                      <h4 className="is-bold has-text-link">{el.user}</h4>
                    </div>
                  ))
                ) : (
                  <p>Loading</p>
                )}
                <div className="is-flex is-align-center mx-2  py-1">
                  <input type="text" className="is-w-90 mr-2 is-h-35" />
                  <SendIcon className="is-click" />
                </div>
              </div>
            </div>
          </div>
          <div className="is-flex is-dis-col">
            <p>Comments</p>
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close"></button>
      </div>
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
        <CardContent className="is-w-80">
          <div className="is-w-full is-h-35 is-flex is-aling-center is-justify-between">
            <Typography
              variant="h5"
              component={LinkComp}
              url={`/users/${say.user}`}
              linkClass="has-text-info f-size-1-3 mb-1"
            >
              {say.user}
            </Typography>
            {deleteBtn}
          </div>
          <div className="is-h-50">
            <Typography variant="body1">{say.body}</Typography>
            <Typography variant="body2" color="textSecondary">
              {day(say.createdAt).fromNow()}
            </Typography>
          </div>
          <div className="mt-4">
            {likeBtn}
            <span className="ml-2 mr-4">{say.likeCount} likes</span>
            <CustomBtn tip="Add a comment">
              <ChatIcon
                color="primary"
                onClick={() => handleOpenAndRequest()}
              />
            </CustomBtn>
            <span className="ml-2 mr-4">{say.commentCount} comments</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Say;
