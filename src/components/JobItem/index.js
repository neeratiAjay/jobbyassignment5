import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employementType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-card-container">
        <div className="image-flex-container">
          <img src={companyLogoUrl} alt="company logo" className="logo-image" />
          <div className="title-container">
            <h1 className="title">{title}</h1>
            <div className="flex-row-container">
              <FaStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="flex-row-container">
          <div className="location-flex-container">
            <div className="location-flex-container">
              <MdLocationOn className="location-icon" />
              <p className="location-text">{location}</p>
            </div>

            <div className="location-flex-container">
              <BsFillBriefcaseFill className="brefecase-icon" />
              <p className="employement-text">{employementType}</p>
            </div>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="description-container">
          <h1 className="description-heading">Description</h1>
          <p className="description-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobItem
