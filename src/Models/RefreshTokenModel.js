import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ResfreshTokenSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: 0,
    },
  },
  { versionKey: false }
);

ResfreshTokenSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});
const RefreshTokenModel = mongoose.model("refresh", ResfreshTokenSchema);

export default RefreshTokenModel;
