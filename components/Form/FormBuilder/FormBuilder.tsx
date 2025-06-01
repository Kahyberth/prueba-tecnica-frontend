"use client";

import FormInput from "@/components/Form/FormInput/FormInput";
import FormSelect from "@/components/Form/FormSelect/FormSelect";
import Checkbox from "@/components/CheckBox/CheckBox";
import { type MerchantForm, type DepartmentsCitiesResponse } from "@/schemas/form.schemas";

import "./FormBuilder.css";

interface FormBuilderProps {
  formData: MerchantForm;
  errors: { [key: string]: string };
  departments: DepartmentsCitiesResponse;
  availableMunicipios: string[];
  updateField: (field: keyof MerchantForm, value: any) => void;
  validateField: (field: keyof MerchantForm) => boolean;
  isEditMode: boolean;
}

export default function FormBuilder({
  formData,
  errors,
  departments,
  availableMunicipios,
  updateField,
  validateField,
  isEditMode,
}: FormBuilderProps) {
  
  const departmentOptions = [
    { value: "", label: "Seleccionar departamento" },
    ...departments.map(dept => ({
      value: dept.departamento,
      label: dept.departamento
    }))
  ];

  const municipioOptions = [
    { value: "", label: "Seleccionar municipio" },
    ...availableMunicipios.map(municipio => ({
      value: municipio,
      label: municipio
    }))
  ];

  const estadoOptions = [
    { value: "", label: "Seleccionar estado" },
    { value: "ACTIVO", label: "ACTIVO" },
    { value: "INACTIVO", label: "INACTIVO" }
  ];

  return (
    <div className="form-builder">
      <div className="form-section">
        <h2 className="section-title">Datos Generales</h2>

        <div className="form-grid">
          <div className="form-row">
            <FormInput
              id="nombreRazonSocial"
              label="Razón Social"
              type="text"
              value={formData.nombreRazonSocial}
              onChange={(value) => updateField("nombreRazonSocial", value)}
              onBlur={() => validateField("nombreRazonSocial")}
              error={errors.nombreRazonSocial}
              required
            />

            <FormInput
              id="correoElectronico"
              label="Correo electrónico"
              type="email"
              value={formData.correoElectronico || ''}
              onChange={(value) => updateField("correoElectronico", value)}
              onBlur={() => validateField("correoElectronico")}
              error={errors.correoElectronico}
            />
          </div>

          <div className="form-row">
            <FormSelect
              id="departamento"
              label="Departamento"
              value={formData.departamento}
              options={departmentOptions}
              onChange={(value) => updateField("departamento", value)}
              required
            />

            <FormInput
              id="fechaRegistro"
              label="Fecha de registro"
              type="date"
              value={formData.fechaRegistro}
              onChange={(value) => updateField("fechaRegistro", value)}
              onBlur={() => validateField("fechaRegistro")}
              error={errors.fechaRegistro}
              required
            />
          </div>

          <div className="form-row">
            <FormSelect
              id="municipio"
              label="Municipio"
              value={formData.municipio}
              options={municipioOptions}
              onChange={(value) => updateField("municipio", value)}
              required
            />

            <div className="checkbox-container">
              <Checkbox
                id="poseeEstablecimientos"
                label="¿Posee establecimientos?"
                checked={formData.poseeEstablecimientos}
                onChange={(checked) => updateField("poseeEstablecimientos", checked)}
              />
            </div>
          </div>

          <div className="form-row">
            <FormSelect
              id="estado"
              label="Estado del Merchant"
              value={formData.estado || ''}
              options={estadoOptions}
              onChange={(value) => updateField("estado", value)}
              required
            />
          </div>

          <div className="form-row">
            <FormInput
              id="telefono"
              label="Teléfono"
              type="tel"
              value={formData.telefono || ''}
              onChange={(value) => updateField("telefono", value)}
              onBlur={() => validateField("telefono")}
              error={errors.telefono}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
