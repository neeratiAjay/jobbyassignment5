import './index.css'

const Skills = props => {
  const {skillItem} = props
  const {name, imageUrl} = skillItem

  return (
    <li className="list-container">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}
export default Skills
