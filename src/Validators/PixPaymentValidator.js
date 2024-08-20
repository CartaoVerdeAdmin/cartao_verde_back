import { z } from "zod";
import { validateRequest } from "zod-express-middleware";

const create = validateRequest({
  body: z.object({
    transaction_amount: z.number(),
    email: z.string({ required_error: "O email é obrigatório" }),
    description: z.string({ required_error: "The description is required" }).min(2, {
      message: "Description must be at least 2 characters long",
    }),
    number: z.string({ required_error: "O cpf é obrigatorio" }).length(11, {
      message: "CPF must have 11 numbers",
    }),
  }),
});

export default {
  create,
};
