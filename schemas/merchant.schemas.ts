import { z } from "zod";

export const EstadoSchema = z.enum(["ACTIVO", "INACTIVO"]);

export const UserUpdateInfoSchema = z.object({
  nombre: z.string(),
  correoElectronico: z.string().email(),
});

export const EstablishmentSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  ingresos: z.number(),
  numeroEmpleados: z.number(),
});

export const MerchantSchema = z.object({
  id: z.number(),
  nombreRazonSocial: z.string(),
  municipio: z.string(),
  telefono: z.string().nullable(),
  correoElectronico: z.string().email().nullable(),
  fechaRegistro: z.string().datetime(),
  estado: EstadoSchema,
  fechaActualizacion: z.string().datetime(),
  usuarioActualizaId: z.number(),
  usuarioActualiza: UserUpdateInfoSchema,
  establecimientos: z.array(EstablishmentSchema),
});

export const MerchantsPaginationMetaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

export const MerchantsResponseSchema = z.object({
  data: z.array(MerchantSchema),
  meta: MerchantsPaginationMetaSchema,
});

export const MerchantsQueryParamsSchema = z.object({
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(5),
});

export const CreateMerchantSchema = z.object({
  nombreRazonSocial: z.string().min(2).max(200),
  municipio: z.string().min(2).max(100),
  telefono: z.string().optional(),
  correoElectronico: z.string().email().optional(),
  estado: EstadoSchema.optional(),
});

export const UpdateMerchantSchema = CreateMerchantSchema.partial();

export const UpdateMerchantStatusSchema = z.object({
  estado: EstadoSchema,
});

export const CSVExportRequestSchema = z.object({
  format: z.literal("csv").optional(),
});

export const MerchantTotalsSchema = z.object({
  totalIngresos: z.number(),
  totalEmpleados: z.number(),
});

export type Estado = z.infer<typeof EstadoSchema>;
export type UserUpdateInfo = z.infer<typeof UserUpdateInfoSchema>;
export type Establishment = z.infer<typeof EstablishmentSchema>;
export type Merchant = z.infer<typeof MerchantSchema>;
export type MerchantsPaginationMeta = z.infer<
  typeof MerchantsPaginationMetaSchema
>;
export type MerchantsResponse = z.infer<typeof MerchantsResponseSchema>;
export type MerchantsQueryParams = z.infer<typeof MerchantsQueryParamsSchema>;
export type CreateMerchant = z.infer<typeof CreateMerchantSchema>;
export type UpdateMerchant = z.infer<typeof UpdateMerchantSchema>;
export type UpdateMerchantStatus = z.infer<typeof UpdateMerchantStatusSchema>;
export type CSVExportRequest = z.infer<typeof CSVExportRequestSchema>;
export type MerchantTotals = z.infer<typeof MerchantTotalsSchema>;
