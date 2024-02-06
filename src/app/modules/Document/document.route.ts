import express from 'express';
import { DocumentController } from './document.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router()
router.post(
  '/create-document',
  auth(ENUM_USER_ROLE.USER),
  DocumentController.createDocument
)

export const documentRoutes = router
