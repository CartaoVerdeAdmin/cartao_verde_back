import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CertificateSchema = new Schema({
  id_Trees: {
    type: Schema.Types.ObjectId,
    ref: "trees",
    required: true,
  },
  id_user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const CertificateModel = mongoose.model("certificates", CertificateSchema);

export default CertificateModel;
