//Mui imports
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import React from "react";

const FriendListDialog = ({ openFriendList, closeFriendList }) => {
  return (
    <Dialog open={openFriendList} onClose={closeFriendList} fullWidth>
      <h2 className="is-w-full has-back-blue has-text-white is-h-35 text-center is-bold pt-1">
        Your Friend List
      </h2>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

export default FriendListDialog;

// {friendList.map((friend) =>
//     <div>
//     {friend.name}
//     {friend.watching}
//     </div> )}
