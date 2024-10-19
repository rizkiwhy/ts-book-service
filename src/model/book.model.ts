import { author, book, genre } from '@prisma/client';
import { randomUUID } from 'crypto';

// export type Book = {
//     id: string
//     title: string
//     authorId: string
//     publishedYear: number
//     stock?: number
// }

export type BookResponse = {
    id: string
    title: string
    author: string
    publishedYear: number
    genres: string[]
    stock?: number | null
}

export type CreateBookRequest = {
    title: string
    authorName: string
    publishedYear: number
    genres: string[]
    stock?: number
}

export type BookCreateInput = {
    id: string
    title: string
    authorId?: string | null
    publishedYear: number
    stock?: number | null
}

export class BookDTO {
    static toBookCreateInput(request: CreateBookRequest): BookCreateInput {
        const id = randomUUID()
        const stock = request.stock !== undefined ? request.stock : undefined
        return {
            id: id,
            title: request.title,
            authorId: null,
            publishedYear: request.publishedYear,
            stock: stock
        }
    }

    static toBookResponse(book: book, author: author, genres: genre[]): BookResponse {
        const stock = book.stock !== undefined ? book.stock : undefined
        return {
            id: book.id,
            title: book.title,
            author: author.name,
            publishedYear: book.published_year,
            genres: genres.map(genre => genre.name),
            stock: stock
        }
    }
}