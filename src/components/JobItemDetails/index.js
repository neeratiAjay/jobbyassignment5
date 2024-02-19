import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobItemDetailsCard from '../JobItemDetailsCard'

import './index.css'

const apiConstantsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItemData: '',
    similarJobsData: '',
    updateLifeData: '',
    apiStatus: apiConstantsStatus.initial,
  }

  componentDidMount() {
    this.getJobItemData()
  }

  getJobItemData = async props => {
    this.setState({apiStatus: apiConstantsStatus.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Berear ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedSkillsData = fetchedData.job_details.skills.map(
        eachItem => ({
          name: eachItem.name,
          imageUrl: eachItem.image_url,
        }),
      )

      const updatedLifeAtCompany = {
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
      }

      const updateSimilarData = fetchedData.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employementType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      const updatedJobDetailsData = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employementType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        lifeAtCompany: updatedLifeAtCompany,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        title: fetchedData.job_details.title,
        skills: updatedSkillsData,
      }

      this.setState({
        jobItemData: updatedJobDetailsData,
        similarJobsData: updateSimilarData,
        apiStatus: apiConstantsStatus.success,
        updateLifeData: updatedLifeAtCompany,
      })
    } else {
      this.setState({apiStatus: apiConstantsStatus.failure})
    }
  }

  retryData = () => {
    this.getJobItemData()
  }

  renderSuccessView = () => {
    const {jobItemData, updateLifeData, similarJobsData} = this.state

    return (
      <>
        <JobItemDetailsCard
          jobItemDetails={jobItemData}
          lifeAtCompanyDetails={updateLifeData}
          similarJobsData={similarJobsData}
        />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failure-view-image"
      />

      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-retry-btn"
        onClick={this.retryData}
      >
        Retry
      </button>
    </div>
  )
  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderShowContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantsStatus.success:
        return this.renderSuccessView()
      case apiConstantsStatus.failure:
        return this.renderFailureView()
      case apiConstantsStatus.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-bg-container">{this.renderShowContent()}</div>
      </>
    )
  }
}
export default JobItemDetails
