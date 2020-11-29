import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sayId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  imageUrl: {
    type: String,
  },
});

export default mongoose.models.Commentario ||
  mongoose.model("Comnentario", commentSchema);
