export type ILoginUser = {
  email: string
  password: string
}

export type IRefreshTokenResponse = {
  accessToken: string
}

export type IMyProfile = {
  password?: string
  name: string
  email: string
}
export type Role = 'admin' | 'user'

export const Roles: Role[] = ['admin', 'user']
