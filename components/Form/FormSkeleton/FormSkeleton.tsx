import "./FormSkeleton.css"

export default function FormSkeleton() {
  return (
    <div className="form-skeleton">
      <div className="form-section">
        <div className="skeleton skeleton-section-title"></div>

        <div className="form-grid">
          <div className="form-row">
            <div className="form-field-skeleton">
              <div className="skeleton skeleton-label"></div>
              <div className="skeleton skeleton-input"></div>
            </div>

            <div className="form-field-skeleton">
              <div className="skeleton skeleton-label"></div>
              <div className="skeleton skeleton-input"></div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field-skeleton">
              <div className="skeleton skeleton-label"></div>
              <div className="skeleton skeleton-input"></div>
            </div>

            <div className="form-field-skeleton">
              <div className="skeleton skeleton-label"></div>
              <div className="skeleton skeleton-input"></div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field-skeleton">
              <div className="skeleton skeleton-label"></div>
              <div className="skeleton skeleton-input"></div>
            </div>

            <div className="form-field-skeleton">
              <div className="skeleton skeleton-label"></div>
              <div className="skeleton skeleton-checkbox"></div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field-skeleton">
              <div className="skeleton skeleton-label"></div>
              <div className="skeleton skeleton-input"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
