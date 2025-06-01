import { z } from "zod";

export const ValidationErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
});

export const ApiValidationErrorSchema = z.object({
  message: z.string(),
  statusCode: z.number(),
  error: z.string(),
  validationErrors: z.array(ValidationErrorSchema).optional(),
});

export type ValidationError = z.infer<typeof ValidationErrorSchema>;
export type ApiValidationError = z.infer<typeof ApiValidationErrorSchema>;

export type PaginatedResponse<T> = {
  data: T[];
};
