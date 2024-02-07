import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'
import { AnswerController } from './answer.controller'

const router = express.Router()
router.post(
  '/create-answer',
  auth(ENUM_USER_ROLE.USER),
  AnswerController.createAnswer
)
router.get(
  '/single-answer',
  auth(ENUM_USER_ROLE.USER),
  AnswerController.getSingleAnswer
)
router.get(
  '/:user_id',
  auth(ENUM_USER_ROLE.USER),
  AnswerController.getAllAnswersByUserId
)

export const AnswerRoutes = router
