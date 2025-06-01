import { z } from "zod";

export const DepartmentCitySchema = z.object({
  departamento: z.string(),
  municipios: z.array(z.string()),
});

export const DepartmentsCitiesResponseSchema = z.array(DepartmentCitySchema);

export const MerchantFormSchema = z.object({
  nombreRazonSocial: z
    .string()
    .min(2, "La razón social debe tener al menos 2 caracteres")
    .max(200, "La razón social no puede exceder 200 caracteres")
    .trim(),

  departamento: z.string().min(1, "Debe seleccionar un departamento"),

  municipio: z.string().min(1, "Debe seleccionar un municipio"),

  telefono: z
    .string()
    .optional()
    .transform((val) => val?.trim() || undefined),

  correoElectronico: z
    .string()
    .email("Debe ser un correo electrónico válido")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),

  fechaRegistro: z
    .string()
    .min(1, "La fecha de registro es requerida")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido"),

  poseeEstablecimientos: z.boolean().default(false),

  estado: z.enum(["ACTIVO", "INACTIVO"]).default("ACTIVO"),
});

export const CreateMerchantPayloadSchema = z.object({
  nombreRazonSocial: z.string().min(2).max(200),
  municipio: z.string().min(1),
  telefono: z.string().optional(),
  correoElectronico: z.string().email().optional(),
  estado: z.enum(["ACTIVO", "INACTIVO"]).default("ACTIVO"),
});

export const RazonSocialSchema = z
  .string()
  .min(2, "Mínimo 2 caracteres")
  .max(200, "Máximo 200 caracteres");

export const EmailSchema = z
  .string()
  .email("Formato de email inválido")
  .or(z.literal(""));

export const TelefonoSchema = z.string().optional();

export type DepartmentCity = z.infer<typeof DepartmentCitySchema>;
export type DepartmentsCitiesResponse = z.infer<
  typeof DepartmentsCitiesResponseSchema
>;
export type MerchantForm = z.infer<typeof MerchantFormSchema>;
export type CreateMerchantPayload = z.infer<typeof CreateMerchantPayloadSchema>;
