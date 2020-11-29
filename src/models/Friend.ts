import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  watching: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const ListSchema = new mongoose.Schema({
  friends: [FriendSchema],
});

export default mongoose.models.FriendList ||
  mongoose.model("FriendList", ListSchema);
