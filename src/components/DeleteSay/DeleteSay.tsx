//Mui imports import Button from "@material-ui/core/Button";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosDeleteSay } from "../../redux/actions/dataActions/dataAxios";
import CustomBtn from "../myBtn/CustomBtn";

interface DeleteSayProps {
  sayId: string;
}

const DeleteSay = ({ sayId }: DeleteSayProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const deleteSay = () => {
    dispatch(axiosDeleteSay(sayId));
    handleOpenDialog();
  };

  return (
    <>
      <CustomBtn
        tip="Delete Say"
        func={handleOpenDialog}
        toolClass="px-1 py-1 my-2 mr-2 has-round-half has-background-white"
      >
        <DeleteOutline color="secondary" />
      </CustomBtn>
      <Dialog
        open={openDialog}
        onClose={handleOpenDialog}
        fullWidth
        maxWidth="sm"
        className="is-flex is-dis-col is-align-center is-justify-center pb-2"
      >
        <DialogContent className="has-back-red has-text-white f-size-1-3 mb-2 pb-4">
          This action is irreversible
        </DialogContent>
        <DialogTitle className="has-text-red is-bold f-size-1-3 text-center is-w-full">
          Are you sure?
        </DialogTitle>
        <div className="is-flex is-align-center is-justify-evenly pb-4">
          <button
            className="button has-text-white has-background-link f-size-1-1"
            onClick={handleOpenDialog}
          >
            Cancel
          </button>
          <button
            className="button has-text-white has-back-red f-size-1-1"
            onClick={deleteSay}
          >
            Delete
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteSay;
