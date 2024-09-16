import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import mongoose from "mongoose";

const treeSchema = z.object({
  _id: z.string().refine((value) => mongoose.isValidObjectId(value), { message: "Invalid ID" }),
  archive: z.array(z.any()).optional(),
  description: z.string().optional(),
  id_category: z.array(z.any()).optional(),
  location: z.string().optional(),
  name: z.string().optional(),
  price: z.array(z.any()).optional(),
  specie: z.string().optional(),
  quantity: z.any().optional(),
  __v: z.number().optional(),
});

const create = validateRequest({
  body: z.object({
    tree: z.array(treeSchema).nonempty({ message: "The tree array must not be empty" }),
    years: z.any({ required_error: "The quantity required" }),
    id_user: z
      .string({ required_error: "The user ID is required" })
      .refine(mongoose.isValidObjectId, { message: "The ID is not valid" }),
  }),
});

// Validação para deletar um recurso
const destroy = validateRequest({
  params: z.object({
    id: z.string().refine(mongoose.isValidObjectId, { message: "The ID is not valid" }),
  }),
});

// Validação para atualizar um recurso
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

// Validação para ler um recurso (sem corpo)
const read = validateRequest({
  body: z.object({}),
});

export default {
  destroy,
  create,
  update,
  read,
};
