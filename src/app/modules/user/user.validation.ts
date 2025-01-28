import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .max(25),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["user", "admin", "superAdmin"]).optional().default("user"),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
