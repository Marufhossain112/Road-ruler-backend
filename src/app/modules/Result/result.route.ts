import express from 'express'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'
import { ResultController } from './result.controller'

const router = express.Router()
router.post(
  '/create-result',
  auth(ENUM_USER_ROLE.USER),
  ResultController.createResult
)
// router.get(
//   '/single-answer',
//   auth(ENUM_USER_ROLE.USER),
//   AnswerController.getSingleAnswer
// )
// router.get(
//   '/:user_id',
//   auth(ENUM_USER_ROLE.USER),
//   AnswerController.getAllAnswersByUserId
// )

export const ResultRoutes = router
