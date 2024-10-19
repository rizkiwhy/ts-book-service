import express from "express"
import { BookController } from "../controller/book.controller"

export const publicRouter = express.Router()
publicRouter.post('/books', BookController.createBook)