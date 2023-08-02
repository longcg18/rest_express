import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// Get all customers information
app.get(`/customers`, async (req, res) => {
  const result = await prisma.customers.findMany();
  res.json(result)
})

// Get customer information include his/her orders
app.get(`/customers/:id`, async (req, res) => {
  const { id }: { id?: string } = req.params

  const result = await prisma.customers.findUnique({
    where: { customerNumber: Number(id) },
    include: {
      orders: true
    }
  })
  res.json(result)
})

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
