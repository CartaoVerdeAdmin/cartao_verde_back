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
  description: {
    type: String,
    required: true,
    trim: true,
  },
  archive: {
    type: [Schema.Types.ObjectId],
    ref: "archive",
    required: true,
  },
  price: {
    type: [Number],
    required: true,
  },
  total_quantity: {
    type: Number,
    required: true,
    trim: true,
  },
  available_quantity: {
    type: Number,
    required: true,
    trim: true,
  },
  id_category: [
    {
      type: Schema.Types.ObjectId,
      ref: "categoryTree",
      required: true,
    },
  ],
});

const TreeModel = mongoose.model("trees", TreeSchema);

export default TreeModel;
