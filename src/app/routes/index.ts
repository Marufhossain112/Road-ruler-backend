import express from 'express'
import { UserRoutes } from '../modules/User/user.route'
import { ProfileRoutes } from '../modules/Profile/profile.route'

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
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
