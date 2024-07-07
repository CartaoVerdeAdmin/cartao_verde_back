import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  imageURL: {
    type: String,
    required: false,
    trim: true,
  },
  type: {
    type: Boolean,
    required: false,
    default: false,
  },
  id_certificates: {
    type: Schema.Types.ObjectId,
    ref: "certificates",
    required: false,
  },
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
