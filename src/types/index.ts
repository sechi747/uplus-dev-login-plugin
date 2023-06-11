export interface AuthTokens {
  token: string | null
  refreshToken: string | null
  xAccessToken: string | null
}

export interface UserModal {
  createAt: number
  id: string
  dataType: string
  dataTypeTitle: string
  name: string
  account: string
  phone: string
  code: string
  type: string
  typeTitle: string
  registerWay: string
  registerWayTitle: string
  status: string
  statusTitle: string
  enabled: string
  enabledTitle: string
  schoolName: string
  collegeName: string
  authAccountRoles: AuthAccountRole[]
}
interface AuthAccountRole {
  memberId: string
  roleId: string
  roleName: string
}
