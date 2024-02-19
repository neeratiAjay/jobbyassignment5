import './index.css'

const SalaryRange = props => {
  const {rangeDetails, salaryChange} = props
  const {salaryRangeId, label} = rangeDetails

  const changeSalary = event => {
    salaryChange(event.target.value)
  }
  return (
    <li className="salary-rating-container">
      <input
        type="radio"
        name="salary"
        className="radio-input"
        id={salaryRangeId}
        value={salaryRangeId}
        onChange={changeSalary}
      />
      <label htmlFor={salaryRangeId} className="radio-label-text">
        {label}
      </label>
    </li>
  )
}
export default SalaryRange
