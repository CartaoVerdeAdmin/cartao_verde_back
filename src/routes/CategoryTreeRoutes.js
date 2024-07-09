import { Router } from 'express';
import CategoryTreeValidator from '../Validators/CategoryTreeValidator.js';
import CategoryController from '../Controllers/CategoryTreeController.js';
import verifyJwt from '../Middlewares/VerifyJwt.js';
import verifyIsAdm from '../Middlewares/VerifyisAdm.js';

const categoryTreeRoutes = Router();

categoryTreeRoutes
  .route('/')
  .get(CategoryController.read)
  .post(
    verifyJwt,
    verifyIsAdm,
    CategoryTreeValidator.create,
    CategoryController.create,
  );

categoryTreeRoutes
  .route('/:id')
  .delete(
    verifyJwt,
    verifyIsAdm,
    CategoryTreeValidator.destroy,
    CategoryController.destroy,
  )
  .put(
    verifyJwt,
    verifyIsAdm,
    CategoryTreeValidator.update,
    CategoryController.update,
  );

categoryTreeRoutes.route('/search-by-name').get(CategoryController.readByName);
categoryTreeRoutes.route('/names').get(CategoryController.readNames);

export default categoryTreeRoutes;
