import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'

import './index.css'

const SimilarJobs = props => {
  const {itemData} = props
  const {
    companyLogoUrl,
    employementType,
    jobDescription,
    location,
    title,
    rating,
  } = itemData
  console.log(itemData)
  return (
    <li className="similar-jobs-bg-container">
      <div className="logo-continer">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div>
          <h1 className="title">{title}</h1>
          <div className="flex-row-container">
            <FaStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="location-intership-flex-container">
        <div className="location-container">
          <MdLocationOn className="location-icon" />
          <p className="location-text">{location}</p>
        </div>
        <div className="location-container">
          <BsFillBriefcaseFill className="location-icon" />
          <p className="location-text">{employementType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
