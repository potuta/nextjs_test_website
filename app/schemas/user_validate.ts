import z from "zod"

export const UserSchema = z.object({
    name: z   
        .string()
        .min(2, { error: 'Name must be at least 2 characters long.' })
        .trim(),
    username: z
        .string()
        .min(2, { error: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    role: z.string(),
    password: z
        .string()
        .min(8, { error: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
        error: 'Contain at least one special character.',
        })
        .trim(),
})