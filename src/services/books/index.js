import express from "express"
import q2m from "query-to-mongo"
/*
q2m translates something like /books?limit=5&sort=-price&offset=15&price<10&category=fantasy into something that could be directly usable by mongo like

{
  criteria: { price: { '$lt': 10 }, category: 'fantasy' },
  options: { sort: { price: -1 }, skip: 15, limit: 5 }
}

*/
import BookModel from "./schema.js"

const booksRouter = express.Router()

booksRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

booksRouter.get("/", async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query)
    console.log(mongoQuery)
    const total = await BookModel.countDocuments(mongoQuery.criteria)
    const books = await BookModel.find(mongoQuery.criteria)
      .limit(mongoQuery.options.limit)
      .skip(mongoQuery.options.skip)
      .sort(mongoQuery.options.sort)

    res.send({ links: mongoQuery.links("/books", total), pageTotal: Math.ceil(total / mongoQuery.options.limit), total, books })
  } catch (error) {
    next(error)
  }
})

booksRouter.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

booksRouter.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

booksRouter.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

export default booksRouter
