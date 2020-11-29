//Mui imports
import Grid from "@material-ui/core/Grid";

import React from "react";

const FriendDis = ({ friend }) => {
  return (
    <Grid xl={12} className="is-flex is-align-center">
      <img src={friend.mongoImgString} alt="friendImg" className="round-img" />
      <p>{friend.name}</p>
    </Grid>
  );
};

export default FriendDis;
