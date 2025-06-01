import "./TableSkeleton.css"

export default function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <tr key={index} className="skeleton-row">
          <td>
            <div className="skeleton skeleton-text skeleton-text--long"></div>
          </td>
          <td>
            <div className="skeleton skeleton-text skeleton-text--medium"></div>
          </td>
          <td>
            <div className="skeleton skeleton-text skeleton-text--long"></div>
          </td>
          <td>
            <div className="skeleton skeleton-text skeleton-text--short"></div>
          </td>
          <td>
            <div className="skeleton skeleton-text skeleton-text--short"></div>
          </td>
          <td>
            <div className="skeleton skeleton-badge"></div>
          </td>
          <td>
            <div className="skeleton-actions">
              <div className="skeleton skeleton-action-btn"></div>
              <div className="skeleton skeleton-action-btn"></div>
              <div className="skeleton skeleton-action-btn"></div>
              <div className="skeleton skeleton-action-btn"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  )
}
