import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import mongoose from "mongoose";

const create = validateRequest({
  body: z.object({
    title: z
      .string({ required_error: "The title is required" })
      .min(2, { message: "Title must be at least 2 characters long" })
      .max(60, { message: "Title cannot exceed 60 characters" }),

    shortDescription: z
      .string({ required_error: "The short description is required" })
      .min(2, {
        message: "Short description must be at least 2 characters long",
      })
      .max(70, { message: "Short description cannot exceed 70 characters" }),

    longDescription: z
      .string({ required_error: "The description is required" })
      .min(20, {
        message: "Large description must be at least 20 characters long",
      })
      .max(750, { message: "Large description cannot exceed 750 characters" }),
    archives: z.array(z.any()),
  }),
  link: z.string({ required_error: "The link is required" }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O ID não é válido"),
  }),
});

const read = validateRequest({
  body: z.object({}),
});

const update = validateRequest({
  body: z.object({
    title: z.string().optional(),
    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    link: z.string().optional(),
    archives: z.array(z.any()),
  }),
});

export default {
  create,
  destroy,
  read,
  update,
};
