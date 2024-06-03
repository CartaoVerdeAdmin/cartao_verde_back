import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArchiveSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const ArchiveModel = mongoose.model("archive", ArchiveSchema);

export default ArchiveModel;