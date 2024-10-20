import { BookDTO, BookResponse, CreateBookRequest } from "../model/book.model";
import { prismaClient } from "../utils/database";
import { ResponseError } from "../utils/error";
import { BookValidation } from "../validation/book.validation";
import { Validation } from "../validation/validation";

export class BookService {
    
    static async CreateBook(request: CreateBookRequest): Promise<BookResponse> {
        const createBookRequest = Validation.validate(request, BookValidation.CREATE)
        let bookCreateInput = BookDTO.toBookCreateInput(createBookRequest)
        const existingBook = await prismaClient.book.findFirst({
            where: {
                title: createBookRequest.title
            }
        })

        if (existingBook) {
            throw new ResponseError(409, "Book already exists")
        }

        let author = await prismaClient.author.findFirst({
            where: {
                name: createBookRequest.authorName
            }
        })

        if (!author) {
            author = await prismaClient.author.create({ data: { name: createBookRequest.authorName } })
        }

        bookCreateInput.authorId = author.id

        if (createBookRequest.genres.length < 1) {
            throw new ResponseError(400, "At least one genre is required")
        }

        const genres: any[] = []
        const bookGenres: any[] = []
        await Promise.all(createBookRequest.genres.map(async (genre: string) => {
            let existingGenre = await prismaClient.genre.findFirst({
                where: {
                    name: genre.toLowerCase()
                }
            });
        
            if (!existingGenre) {
                existingGenre = await prismaClient.genre.create({ data: { name: genre.toLowerCase() } })
            }
            
            genres.push(existingGenre)
            bookGenres.push({
                book_id: bookCreateInput.id,
                genre_id: existingGenre.id
            })
        }))

        const book = await prismaClient.book.create({
            data: {
                id: bookCreateInput.id,
                title: bookCreateInput.title,
                author_id: bookCreateInput.authorId,
                published_year: bookCreateInput.publishedYear,
                stock: bookCreateInput.stock,
            }
        })

        await prismaClient.book_genre.createMany({
            data: bookGenres
        })

        return BookDTO.toBookResponse(book, author, genres)
    }
}