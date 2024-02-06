import express from 'express'
import { ProfileController } from './profile.controller'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'

const router = express.Router()
router.post(
  '/create-profile',
  auth(ENUM_USER_ROLE.USER),
  ProfileController.createProfile
)

export const ProfileRoutes = router
