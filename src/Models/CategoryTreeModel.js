import mongoose from "mongoose";

const CategoryTreeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

CategoryTreeSchema.virtual("categoryTree", {
  ref: "categoryTree",
  localField: "_id",
  foreignField: "id_categoryTree",
  options: { lean: true },
});

const categoryTreeModel = mongoose.model("categoryTree", CategoryTreeSchema);

export default categoryTreeModel;
