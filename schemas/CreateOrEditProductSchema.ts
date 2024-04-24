import { z } from "zod";

/**
 * Create the create product form Zod schema.
 */
export const CreateOrEditProductFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().nonempty({ message: 'Product name is required.' })
        .max(50, { message: 'Product name must be less than 50 characters.' }),
    price: z.number().min(10_000, { message: 'Product price must be at least 10,000.' })
});

/**
 * Obtain the typing from the schema.
 */
export type CreateOrEditProductFormType = z.infer<typeof CreateOrEditProductFormSchema>;