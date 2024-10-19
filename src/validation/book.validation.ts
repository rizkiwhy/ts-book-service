import { CreateBookRequest } from "../model/book.model";
import { ZodType, z } from "zod";

export class BookValidation {
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(3).max(100),
        authorName: z.string().min(3).max(100),
        publishedYear: z.number(),
        genres: z.array(z.string()),
        stock: z.optional(z.number()),
    })
}