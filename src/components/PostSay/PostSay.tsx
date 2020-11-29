//Mui imports
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

//icons
import CloseIcon from "@material-ui/icons/Close";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GlobalState } from "../../redux/store";
import { toogleModal } from "../../redux/actions/uiActions/uiActions";
import { validateField } from "./validateField";
import { axiosPostSay } from "../../redux/actions/dataActions/dataAxios";
import { UiInitialState } from "../../redux/reducers/uiReducers";
import { DataInitialState } from "../../redux/reducers/dataReducers";

const PostSay = () => {
  const UiState: UiInitialState = useSelector((state: GlobalState) => state.ui);
  const DataSate: DataInitialState = useSelector(
    (state: GlobalState) => state.data
  );
  const dispatch = useDispatch();

  const [body, setBody] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>({
    msg: "",
    state: false,
  });
  const [length, setlength] = useState<number>(DataSate.sayLength);
  const handleInput = (value: string) => {
    if (error.state) {
      setError({
        msg: "",
        state: false,
      });
    }
    setBody(value);
    const num = 149 - value.length;
    setlength(num);
  };

  interface Validation {
    validation: boolean;
    msg: string;
  }

  const handleSay = async () => {
    const validate: Validation = validateField(body, length);
    if (!validate.validation) {
      return setError({
        state: true,
        msg: validate.msg,
      });
    }

    const newSay = {
      body,
    };
    await dispatch(axiosPostSay(newSay));
    setBody("");
    dispatch(toogleModal());
  };

  const closeModal = () => {
    setBody("");
    dispatch(toogleModal());
  };

  return (
    <div className={UiState.openModal ? "modal is-active" : "modal"}>
      <div className="modal-background has-background-grey opa-9"></div>
      <div className="modal-content has-background-white has-rad-4 is-w-45 is-h-275 is-flex is-dis-col is-align-center">
        {UiState.loadingModal ? (
          <div className="is-flex is-align-center is-dis-col is-justify-center is-h-full is-w-full">
            <img
              src="/images/icons8-son-goku-64.png"
              alt="appIcon"
              className="mb-4"
            />
          </div>
        ) : (
          <>
            <DialogTitle className="has-text-white px-4 has-background-info is-h-50 pb-2 mb-4  is-w-full">
              <div className="is-flex is-align-center is-justify-between ">
                <Typography variant="body1">Say what you want</Typography>
                <CloseIcon className="is-click" onClick={() => closeModal()} />
              </div>
            </DialogTitle>
            <div className="is-flex is-align-center is-w-80">
              <TextField
                className="mb-4 is-w-full"
                name="say"
                multiline
                rows="3"
                placeholder="Write what you think and say it"
                label="Say"
                helperText={error.msg}
                error={error.state ? true : false}
                fullWidth
                value={body}
                onChange={(e) => handleInput(e.target.value)}
              />
              <Tooltip placement="top" title="a say has 149 caracters">
                <span
                  className={
                    length < 0
                      ? "round is-w-10 has-text-danger"
                      : "round is-w-10 ml-2"
                  }
                >
                  {length}
                </span>
              </Tooltip>
            </div>
            <div className="mt-4 is-w-50 is-flex is-align-center is-justify-evenly">
              <button
                onClick={() => handleSay()}
                className={
                  length < 0
                    ? "button has-text-white f-size-1-1 has-back-red"
                    : "button has-text-white f-size-1-1 has-background-success"
                }
              >
                Post
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostSay;
