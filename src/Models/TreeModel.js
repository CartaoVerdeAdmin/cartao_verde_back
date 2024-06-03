import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TreeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: false,
    },
    imageURL: {
        type: String,
        required: true,
        trim: true,
    },
    especire: {
        type: String,
        required: true,
        trim: true,
    },
    id_category: {
        type: Schema.Types.UUID,
        ref: "category",
        required: true,
    },
});

const TreeModel = mongoose.model("trees", TreeSchema);

export default TreeModel;