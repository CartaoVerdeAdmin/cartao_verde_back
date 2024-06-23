import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import mongoose from "mongoose";

const create = validateRequest({
  body: z.object({
    description: z
      .string({ required_error: "The description is required" })
      .min(10, { message: "Description must be at least 10 characters long" })
      .max(100, { message: "Description cannot exceed 100 characters" }),
  }),
});
const destroy = validateRequest({
  params: z.object({
    id: z.string().refine(mongoose.isValidObjectId, { message: "The ID is not valid" }),
  }),
});
const update = validateRequest({
  body: z.object({
    description: z.string(),
  }),
});

const read = validateRequest({
  body: z.object({}),
});

export default {
  destroy,
  create,
  update,
  read,
};
