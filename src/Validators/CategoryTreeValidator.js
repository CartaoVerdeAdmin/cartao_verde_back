import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import mongoose from "mongoose";

const create = validateRequest({
  body: z.object({
    name: z
      .string({ required_error: "The name is required" })
      .min(2, {
        message: "Name must be at least 2 characters long",
      })
      .max(60, {
        message: "Name cannot exceed 60 characters",
      }),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "The ID is not valid"),
  }),
});

const update = validateRequest({
  body: z.object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters long",
      })
      .max(60, { message: "Name cannot exceed 60 characters" })
      .optional(),
  }),

  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "The ID is not valid"),
  }),
});

export default {
  create,
  destroy,
  update,
};
