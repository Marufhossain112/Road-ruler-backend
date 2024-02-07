import express from 'express'
import { UserRoutes } from '../modules/User/user.route'
import { ProfileRoutes } from '../modules/Profile/profile.route'
import { QuestionRoutes } from '../modules/Question/question.route'
import { AnswerRoutes } from '../modules/Answer/answer.route'
import { ResultRoutes } from '../modules/Result/result.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profiles',
    route: ProfileRoutes,
  },
  {
    path: '/questions',
    route: QuestionRoutes,
  },
  {
    path: '/answers',
    route: AnswerRoutes,
  },
  {
    path: '/results',
    route: ResultRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
