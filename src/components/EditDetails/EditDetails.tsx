import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosEditUserDetails } from "../../redux/actions/userActions/userAxios";

//Mui imports
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";

//icons
import EditIcon from "@material-ui/icons/Edit";

const EditDetails = () => {
  const UserState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState<any>({
    bio: "",
    website: "",
    location: "",
    openDetails: false,
  });

  const handleOpen = () => {
    setUserDetails({
      bio: UserState.credentials.bio ? UserState.credentials.bio : "",
      website: UserState.credentials.website
        ? UserState.credentials.website
        : "",
      location: UserState.credentials.location
        ? UserState.credentials.location
        : "",
      openDetails: !userDetails.openDetails,
    });
  };

  const handleSubmit = async () => {
    await dispatch(axiosEditUserDetails(userDetails));
    handleOpen();
  };

  const handleInput = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Tooltip title="Edit details" placement="top">
        <IconButton onClick={() => handleOpen()} className="pb-4">
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={userDetails.openDetails}
        onClose={userDetails.openDetails}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Your Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about You"
              value={userDetails.bio}
              onChange={(e) => handleInput(e)}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal website"
              value={userDetails.website}
              onChange={(e) => handleInput(e)}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              value={userDetails.location}
              onChange={(e) => handleInput(e)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOpen()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDetails;
