import express from 'express'
import { userRoutes } from '../modules/User/user.route'
import { documentRoutes } from '../modules/Document/document.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/documents',
    route: documentRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
