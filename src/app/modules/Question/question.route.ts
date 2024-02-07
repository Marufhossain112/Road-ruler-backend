import express from 'express'

import { QuestionController } from './question.controller'

const router = express.Router()
router.post('/create-question', QuestionController.createQuestion)
router.get('/', QuestionController.getAllQuestions)

export const QuestionRoutes = router
