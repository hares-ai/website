import { prisma } from "../prisma"

export default defineEventHandler(async (event) => {
  const createUser = await prisma.user.create({
    data: {
      address: Date.now().toString()
    }
  })

  return {
    hello: 'world',
    users: createUser
  }
})
