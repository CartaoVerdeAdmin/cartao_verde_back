import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import mongoose from "mongoose";

const create = validateRequest({
  body: z.object({
    id_tree: z
      .string({ required_error: "The tree ID is required" })
      .refine(mongoose.isValidObjectId, { message: "The ID is not valid" }),
    id_user: z
      .string({ required_error: "The user ID is required" })
      .refine(mongoose.isValidObjectId, { message: "The ID is not valid" }),
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
  params: z.object({
    id: z.string().refine(mongoose.isValidObjectId, { message: "The ID is not valid" }),
  }),
  body: z.object({
    id_tree: z
      .string()
      .refine(mongoose.isValidObjectId, { message: "The ID is not valid" })
      .optional(),
    id_user: z
      .string()
      .refine(mongoose.isValidObjectId, { message: "The ID is not valid" })
      .optional(),
    description: z.string().optional(),
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
