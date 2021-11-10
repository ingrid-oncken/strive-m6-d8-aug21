import express from "express"
import createHttpError from "http-errors"

import UserModel from "./schema.js"

const usersRouter = express.Router()

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body) // here happens validation of req.body, if it is not ok Mongoose will throw a "ValidationError" (btw user is still not saved in db yet)
    const { _id } = await newUser.save() // this is the line in which the interaction with the db happens
    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const id = req.params.userId

    const user = await UserModel.findById(id)
    if (user) {
      res.send(user)
    } else {
      next(createHttpError(404, `User with id ${id} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

usersRouter.put("/:userId", async (req, res, next) => {
  try {
    const id = req.params.userId
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true })

    if (updatedUser) {
      res.send(updatedUser)
    } else {
      next(createHttpError(404, `User with id ${id} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

usersRouter.delete("/:userId", async (req, res, next) => {
  try {
    const id = req.params.userId

    const deletedUser = await UserModel.findByIdAndDelete(id)
    if (deletedUser) {
      res.status(204).send()
    } else {
      next(createHttpError(404, `User with id ${id} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

export default usersRouter
