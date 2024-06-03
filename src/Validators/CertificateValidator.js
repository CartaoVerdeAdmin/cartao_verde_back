import { z } from "zod";
import { validateRequest } from "zod-express-middleware";

const create = validateRequest({});
const destroy = validateRequest({});
const update = validateRequest({});
const read = validateRequest({});

export default {
  destroy,
  create,
  update,
  read,
};
