import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CertificateSchema = new Schema(
  {
    id_tree: {
      type: Schema.Types.ObjectId,
      ref: "trees",
      required: true,
      unique: true,
    },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    expirateDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = mongoose.model("certificates", CertificateSchema);

export default CertificateModel;
