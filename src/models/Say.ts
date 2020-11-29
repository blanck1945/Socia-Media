import mongoose from "mongoose";
const paginate = require("mongoose-paginate-v2");

const saySchema = new mongoose.Schema({
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
  commentCount: {
    type: Number,
    default: 0,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  mongoImgString: {
    type: String,
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

saySchema.plugin(paginate);

export default mongoose.models.Say || mongoose.model("Say", saySchema);
