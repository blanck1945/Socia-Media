import mongoose from "mongoose";
const day = new Date();
const jsDay = day.getFullYear() + "-" + day.getMonth() + "-" + day.getDate();
const paginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: String,
    website: String,
    watching: {
      current: String,
      opinion: String,
      score: Number,
    },
    profile: {
      type: Boolean,
      default: true,
    },
    location: String,
    avatar: Buffer,
    type: String,
    createdAt: {
      type: String,
      default: jsDay,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

userSchema.plugin(paginate);

userSchema.virtual("mongoImgString").get(function () {
  if (this.avatar != null) {
    const mongob64 = Buffer.from(this.avatar, "base64");
    return `data:${this.type};base64,${mongob64}`;
  }
});

userSchema.statics.getImg = function () {
  const mongob64 = Buffer.from(this.avatar, "base64");
  console.log("gettinh img");
  return `data:${this.type};base64,${mongob64}`;
};

export default mongoose.models.Usuario || mongoose.model("Usuario", userSchema);
