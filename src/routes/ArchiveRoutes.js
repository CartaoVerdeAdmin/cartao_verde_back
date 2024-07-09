import { Router } from 'express';
import ArchiveController from '../Controllers/ArchiveController.js';

const archiveRoutes = Router();

archiveRoutes.route('/').get(ArchiveController.getArchivesbyID);

export default archiveRoutes;
