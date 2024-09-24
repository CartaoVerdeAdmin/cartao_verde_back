import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CertificateSchema = new Schema(
  {
    id_tree: {
      type: Schema.Types.ObjectId,
      ref: "trees",
      unique: false,
      required: true,
    },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    finalDate: {
      type: Date,
      required: true,
    },
    years: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = mongoose.model("certificates", CertificateSchema);

export default CertificateModel;
