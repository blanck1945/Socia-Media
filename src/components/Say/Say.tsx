//Mui Imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import LinkComp from "../LinkComp/LinkComp";
import PostSay from "../PostSay/PostSay";
import day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CustomBtn from "../myBtn/CustomBtn";
import DeleteSay from "../DeleteSay/DeleteSay";
import { SayInterface } from "../../redux/actions/dataActions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import {
  axiosLikeSay,
  axiosUnLikeSay,
} from "../../redux/actions/dataActions/dataAxios";
import { GlobalState } from "../../redux/store";
import { UserInitialState } from "../../redux/reducers/userReducer";
import { UiInitialState } from "../../redux/reducers/uiReducers";

interface SayProps {
  say: SayInterface;
}

const Say = ({ say }: SayProps) => {
  const dispatch = useDispatch();
  const UserState: UserInitialState = useSelector(
    (state: GlobalState) => state.user
  );
  const UiState: UiInitialState = useSelector((state: GlobalState) => state.ui);

  day.extend(relativeTime);
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

  return (
    <Card className="mb-4 is-flex is-h-175">
      <CardMedia
        image={say.userImage}
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
        <Typography variant="body1">{say.body}</Typography>
        <Typography variant="body2" color="textSecondary">
          {day(say.createdAt).fromNow()}
        </Typography>
        {likeBtn}
        <span>{say.likeCount} likes</span>
        <CustomBtn>
          <ChatIcon color="primary" />
        </CustomBtn>
        <span>{say.commentCount} comments</span>
      </CardContent>
    </Card>
  );
};

export default Say;
