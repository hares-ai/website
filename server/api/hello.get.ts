import { prisma } from "../prisma"

export default defineEventHandler(async (event) => {
  const users = await prisma.user.count()

  return {
    hello: 'world',
    users: users
  }
})
