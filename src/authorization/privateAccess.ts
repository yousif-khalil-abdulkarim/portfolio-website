import type { Access } from 'payload'

export const privateAccess: Access = ({ req: { user } }) => user !== null