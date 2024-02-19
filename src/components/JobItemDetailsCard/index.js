import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BsBoxArrowUpRight} from 'react-icons/bs'

import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const JobItemDetailsCard = props => {
  const {jobItemDetails, lifeAtCompanyDetails, similarJobsData} = props

  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employementType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    skills,
  } = jobItemDetails

  const {imageUrl, description} = lifeAtCompanyDetails

  return (
    <>
      <div className="job-item-container">
        <div className="logo-continer">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
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
        <div className="perannum-container">
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
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="description-flex-container">
          <h1 className="description-name">Description</h1>
          <div className="visit-flex-container">
            <a href={companyWebsiteUrl} className="visit-text">
              Visit
            </a>
            <BsBoxArrowUpRight className="visit-arrow" />
          </div>
        </div>
        <p className="job-description">{jobDescription}</p>
        <h1 className="skills-heading">Skills</h1>
        <ul className="skills-container">
          {skills &&
            skills.map(eachItem => (
              <Skills key={eachItem.name} skillItem={eachItem} />
            ))}
        </ul>
        <h1 className="skills-heading">Life at Company</h1>
        <div className="life-company-container">
          <p className="job-description">{description}</p>
          <img
            src={imageUrl}
            alt=" life at company"
            className="life-company-image"
          />
        </div>
      </div>
      <div className="similar-jobs-container">
        <h1 className="similar-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobsData &&
            similarJobsData.map(item => (
              <SimilarJobs itemData={item} key={item.id} />
            ))}
        </ul>
      </div>
    </>
  )
}
export default JobItemDetailsCard
