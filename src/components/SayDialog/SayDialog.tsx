//Mui Imports
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//Icons
import Cancel from "@material-ui/icons/Cancel";
import SendIcon from "@material-ui/icons/Send";

import React, { useState } from "react";
import LinkComp from "../LinkComp/LinkComp";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector, useDispatch } from "react-redux";
import { DataInitialState } from "../../redux/reducers/dataReducers";
import { GlobalState } from "../../redux/store";
import { commentSchema, validateSchema } from "../../../YupSchemas/YupSchemas";
import { AxiosPostComment } from "../../redux/actions/dataActions/dataAxios";

const SayDialog = ({ openModal, say, handleClose, likeBtn }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState<any>("");

  dayjs.extend(relativeTime);
  const DataState: DataInitialState = useSelector(
    (state: GlobalState) => state.data
  );

  const [form, setForm] = useState<any>({
    comment: "",
  });

  const handlePost = async () => {
    const validate = await validateSchema(commentSchema, form);
    if (validate) {
      dispatch(AxiosPostComment(form, say.sayingId));
    } else {
      setError(validate);
    }
  };

  return (
    <Grid className={openModal ? "is-active modal" : "modal"}>
      <div className="modal-background has-background-light"></div>
      <div className="modal-content is-w-45 has-background-white   has-rad-4">
        <div className="is-w-full has-back-blue is-flex is-align-center is-h-35">
          <Cancel
            className="has-text-white pl-1 is-click has-back-blue"
            onClick={() => handleClose()}
          />
        </div>
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
          <div className="is-flex is-align-center is-dis-col  is-w-40">
            <span className="text-center has-background-light px-1 is-h-75 is-w-full has-rad-4 is-flex is-dis-col is-justify-between">
              <p className="f-size-1-2">{say.body}</p>
            </span>
            <div className="my-2">
              <Typography
                variant="body2"
                color="primary"
                className="mt-1  is-w-full py-1"
              >
                {dayjs(say.createdAt).fromNow()}
              </Typography>
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
                <input
                  type="text"
                  className="is-w-90 mr-2 is-h-35"
                  value={form.comment}
                  onChange={(e) => setForm({ comment: e.target.value })}
                />
                <SendIcon className="is-click" onClick={() => handlePost()} />
              </div>
            </div>
          </div>
        </div>
        <div className="is-flex is-dis-col">
          <Typography
            variant="h5"
            component={LinkComp}
            url={`/users/${say.user}`}
            linkClass="has-text-info f-size-1-3 mb-1 ml-1"
          >
            @{say.user}
          </Typography>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </Grid>
  );
};

export default SayDialog;
