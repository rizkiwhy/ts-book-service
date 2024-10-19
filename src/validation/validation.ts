import { ZodType } from "zod";

export class Validation {
    static validate<T>(request: T, schema: ZodType<T>): T {
        return schema.parse(request)
    }
}