import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  sayId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Like || mongoose.model("Like", likeSchema);
