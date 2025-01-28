import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required.",
      invalid_type_error: "Email must be a string",
    }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
  }),
});

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

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Old password is required",
      invalid_type_error: "Old password must be a string",
    }),
    newPassword: z.string({
      required_error: "New password is required",
      invalid_type_error: "New password must be a string",
    }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required!",
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "User id is required!",
    }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "User id is required!",
    }),
    newPassword: z.string({
      required_error: "New password is required",
      invalid_type_error: "New password must be a string",
    }),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
  refreshTokenValidationSchema,
  resetPasswordValidationSchema,
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  createUserValidationSchema,
};
