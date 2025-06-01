"use client";

import { useState, useEffect, useCallback } from "react";
import { merchantsApi } from "../utils/merchants.api";
import { useToast } from "../contexts/ToastContext";
import {
  MerchantFormSchema,
  CreateMerchantPayloadSchema,
  DepartmentsCitiesResponseSchema,
  type MerchantForm,
  type DepartmentsCitiesResponse,
} from "../schemas/form.schemas";
import { ZodError } from "zod";

interface ValidationErrors {
  [key: string]: string;
}

interface FieldChange {
  field: string;
  label: string;
  originalValue: string;
  newValue: string;
}

interface UseMerchantFormReturn {
  formData: MerchantForm;
  originalData: MerchantForm | null;
  errors: ValidationErrors;
  isLoading: boolean;
  isSubmitting: boolean;
  departments: DepartmentsCitiesResponse;
  availableMunicipios: string[];
  editId: number | null;
  setFormData: (data: MerchantForm) => void;
  updateField: (field: keyof MerchantForm, value: any) => void;
  handleSubmit: () => Promise<boolean>;
  clearErrors: () => void;
  validateField: (field: keyof MerchantForm) => boolean;
  loadMerchantData: (id: number) => Promise<void>;
  getChangedFields: () => FieldChange[];
}

export const useMerchantForm = (
  initialData?: Partial<MerchantForm>
): UseMerchantFormReturn => {
  const [formData, setFormData] = useState<MerchantForm>({
    nombreRazonSocial: "",
    departamento: "",
    municipio: "",
    telefono: "",
    correoElectronico: "",
    fechaRegistro: new Date().toISOString().split("T")[0],
    poseeEstablecimientos: false,
    estado: "ACTIVO",
    ...initialData,
  });

  const [originalData, setOriginalData] = useState<MerchantForm | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departments, setDepartments] = useState<DepartmentsCitiesResponse>([]);
  const [availableMunicipios, setAvailableMunicipios] = useState<string[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const { showSuccess, showError } = useToast();

  const fieldLabels: Record<string, string> = {
    nombreRazonSocial: "Razón Social",
    departamento: "Departamento",
    municipio: "Municipio",
    telefono: "Teléfono",
    correoElectronico: "Correo Electrónico",
    fechaRegistro: "Fecha de Registro",
    estado: "Estado",
  };

  useEffect(() => {
    const loadDepartments = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      try {
        const response = await merchantsApi.getDepartmentsAndCities();
        const validatedDepartments =
          DepartmentsCitiesResponseSchema.parse(response);
        setDepartments(validatedDepartments);
      } catch (error) {
        console.error("Error loading departments:", error);
        showError("Error al cargar departamentos y ciudades");
      } finally {
        setIsLoading(false);
      }
    };

    loadDepartments();
  }, [showError]);

  useEffect(() => {
    if (formData.departamento && departments.length > 0) {
      const selectedDepartment = departments.find(
        (dept) => dept.departamento === formData.departamento
      );

      if (selectedDepartment) {
        setAvailableMunicipios(selectedDepartment.municipios);

        if (
          formData.municipio &&
          !selectedDepartment.municipios.includes(formData.municipio)
        ) {
          updateField("municipio", "");
        }
      } else {
        setAvailableMunicipios([]);
      }
    } else {
      setAvailableMunicipios([]);
    }
  }, [formData.departamento, departments]);

  const updateField = useCallback(
    (field: keyof MerchantForm, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const validateField = useCallback(
    (field: keyof MerchantForm): boolean => {
      try {
        MerchantFormSchema.parse(formData);

        if (errors[field]) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }

        return true;
      } catch (error) {
        if (error instanceof ZodError) {
          const fieldError = error.errors.find((err) => err.path[0] === field);
          if (fieldError) {
            setErrors((prev) => ({ ...prev, [field]: fieldError.message }));
            return false;
          }
        }
        return true;
      }
    },
    [formData, errors]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const getChangedFields = useCallback((): FieldChange[] => {
    if (!originalData) return [];

    const changes: FieldChange[] = [];
    const fieldsToCompare: (keyof MerchantForm)[] = [
      "nombreRazonSocial",
      "municipio",
      "telefono",
      "correoElectronico",
      "estado",
    ];

    fieldsToCompare.forEach((field) => {
      const originalValue = originalData[field];
      const newValue = formData[field];

      const normalizeValue = (val: any) => {
        if (val === undefined || val === null || val === "") return "";
        return String(val);
      };

      const normalizedOriginal = normalizeValue(originalValue);
      const normalizedNew = normalizeValue(newValue);

      if (normalizedOriginal !== normalizedNew) {
        changes.push({
          field: String(field),
          label: fieldLabels[String(field)] || String(field),
          originalValue: normalizedOriginal,
          newValue: normalizedNew,
        });
      }
    });

    return changes;
  }, [formData, originalData, fieldLabels]);

  const loadMerchantData = useCallback(
    async (id: number) => {
      setIsLoading(true);
      setEditId(id);

      try {
        const merchant = await merchantsApi.getMerchantById(id);

        const departmentWithMunicipality = departments.find((dept) =>
          dept.municipios.includes(merchant.municipio)
        );

        const merchantFormData = {
          nombreRazonSocial: merchant.nombreRazonSocial,
          departamento: departmentWithMunicipality?.departamento || "",
          municipio: merchant.municipio,
          telefono: merchant.telefono || "",
          correoElectronico: merchant.correoElectronico || "",
          fechaRegistro: new Date(merchant.fechaRegistro)
            .toISOString()
            .split("T")[0],
          poseeEstablecimientos: merchant.establecimientos.length > 0,
          estado: merchant.estado,
        };

        setFormData(merchantFormData);
        setOriginalData(merchantFormData);

        showSuccess(`Datos cargados correctamente`);
      } catch (error) {
        console.error("Error loading merchant:", error);
        showError(
          "Error al cargar los datos del merchant. Por favor, intenta nuevamente."
        );
        setEditId(null);
      } finally {
        setIsLoading(false);
      }
    },
    [departments, showError, showSuccess]
  );

  const handleSubmit = useCallback(async (): Promise<boolean> => {
    setIsSubmitting(true);
    const isEditMode = editId !== null;

    try {
      const validatedData = MerchantFormSchema.parse(formData);

      const payload = CreateMerchantPayloadSchema.parse({
        nombreRazonSocial: validatedData.nombreRazonSocial,
        municipio: validatedData.municipio,
        telefono: validatedData.telefono,
        correoElectronico: validatedData.correoElectronico,
        estado: validatedData.estado || "ACTIVO",
      });

      let response;

      if (isEditMode) {
        response = await merchantsApi.updateMerchant(editId, payload);
        showSuccess(`Merchant actualizado exitosamente`);

        setOriginalData(formData);
      } else {
        response = await merchantsApi.createMerchant(payload);
        showSuccess(`Merchant creado exitosamente`);

        setFormData({
          nombreRazonSocial: "",
          departamento: "",
          municipio: "",
          telefono: "",
          correoElectronico: "",
          fechaRegistro: new Date().toISOString().split("T")[0],
          poseeEstablecimientos: false,
          estado: "ACTIVO",
        });
      }

      clearErrors();
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: ValidationErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        showError(
          "Por favor corrige los errores en el formulario antes de continuar"
        );
      } else {
        console.error("Error submitting form:", error);
        const errorMessage = isEditMode
          ? "Error al actualizar el merchant. Por favor, verifica los datos e intenta nuevamente."
          : "Error al crear el merchant. Por favor, verifica los datos e intenta nuevamente.";
        showError(errorMessage);
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editId, showSuccess, showError, clearErrors]);

  return {
    formData,
    originalData,
    errors,
    isLoading,
    isSubmitting,
    departments,
    availableMunicipios,
    editId,
    setFormData,
    updateField,
    handleSubmit,
    clearErrors,
    validateField,
    loadMerchantData,
    getChangedFields,
  };
};
