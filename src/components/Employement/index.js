import './index.css'

const Employements = props => {
  const {employeDetails, selectEmployeType} = props
  const {employmentTypeId, label} = employeDetails
  const onSelectEmploye = event => {
    selectEmployeType(event.target.value)
  }
  return (
    <li className="label-container" onChange={onSelectEmploye}>
      <input
        type="checkbox"
        id={employmentTypeId}
        className="checkbox"
        value={employmentTypeId}
      />
      <label className="label-text" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}
export default Employements
