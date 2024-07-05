import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import mongoose from "mongoose";

const create = validateRequest({
  body: z.object({
    name: z
      .string({ required_error: "The name is required" })
      .min(2, { message: "Title must be at least 2 characters long" })
      .max(60, { message: "Title cannot exceed 60 characters" }),
    description: z
      .string({ required_error: "The description is required" })
      .min(2, {
        message: "Description must be at least 2 characters long",
      })
      .max(750, { message: "Description cannot exceed 750 characters" }),
    location: z
      .string({ required_error: "The location is required" })
      .min(2, {
        message: "Location must be at least 2 characters long",
      })
      .max(750, { message: "Location cannot exceed 750 characters" }),
    archive: z.array(z.any()),
    specie: z
      .string({ required_error: "The specie is required" })
      .min(2, {
        message: "Specie must be at least 2 characters long",
      })
      .max(70, { message: "Specie cannot exceed 70 characters" }),
    price: z.number({ required_error: "The price is required" }),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "Invalid ID"),
  }),
});

const read = validateRequest({
  body: z.object({}),
});

const update = validateRequest({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    specie: z.string().optional(),
    price: z.number().optional(),
    archive: z.array(z.any()).optional(),
  }),
});

export default {
  create,
  destroy,
  read,
  update,
};
