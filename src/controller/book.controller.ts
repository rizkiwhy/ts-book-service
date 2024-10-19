import { Request, Response, NextFunction } from "express"
import { CreateBookRequest } from "../model/book.model"
import { BookService } from "../service/book.service"

export class BookController {
    
    static async createBook(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateBookRequest = req.body as CreateBookRequest
            const response = await BookService.CreateBook(request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}