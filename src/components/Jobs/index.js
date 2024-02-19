import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Employements from '../Employement'
import SalaryRange from '../SalaryRange'
import JobItem from '../JobItem'
import Profile from '../Profile'

import './index.css'

const apiConstantsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsDataList: [],
    apiStatus: apiConstantsStatus.initial,
    employeeType: [],
    minimumSalary: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  updatedJobsData = data => ({
    companyLogoUrl: data.company_logo_url,
    employementType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getJobsDetails = async () => {
    this.setState({apiStatus: apiConstantsStatus.inProgress})

    const {employeeType, minimumSalary, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${minimumSalary}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Berear ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedJobsList = data.jobs.map(eachJob =>
        this.updatedJobsData(eachJob),
      )
      this.setState({
        jobsDataList: updatedJobsList,
        apiStatus: apiConstantsStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantsStatus.failure})
    }
  }
  onClickRetry = () => {
    this.getJobsDetails()
  }
  changeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobsDetails)
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      thi.getJobsDetails()
    }
  }

  changeSalary = salary => {
    this.setState({minimumSalary: salary}, this.getJobsDetails)
  }

  changeEmployeeList = type => {
    this.setState(
      prevState => ({
        employeType: [...prevState.employeeType, type],
      }),
      this.getJobsDetails,
    )
  }

  employementsContainer = () => {
    return (
      <>
        <p className="type-employe-text">Type of Employement</p>
        <ul className="employement-list-container">
          {employmentTypesList.map(employe => (
            <Employements
              key={employe.employmentTypeId}
              employeDetails={employe}
              selectEmployeType={this.changeEmployeeList}
            />
          ))}
        </ul>
      </>
    )
  }

  salaryRatingContainer = () => {
    return (
      <>
        <p className="type-employe-text">Salary Range</p>
        <ul className="employement-list-container">
          {salaryRangesList.map(range => (
            <SalaryRange
              key={range.salaryRangeId}
              rangeDetails={range}
              salaryChange={this.changeSalary}
            />
          ))}
        </ul>
      </>
    )
  }

  jobItemsContainer = () => {
    const {jobsDataList} = this.state
    const successJobsList = jobsDataList.length > 0

    return (
      <>
        {successJobsList && (
          <ul className="jobs-list-container">
            {jobsDataList.map(eachJob => (
              <JobItem key={eachJob.id} jobDetails={eachJob} />
            ))}
          </ul>
        )}
        {!successJobsList && (
          <div className="jobs-failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
              alt="no jobs"
              className="no-jobs-image"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-text">
              We could not find any jobs. Try other filters
            </p>
          </div>
        )}
      </>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    return (
      <>
        <div className="jobs-cards-container">{this.jobItemsContainer()}</div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for{' '}
      </p>
      <button
        type="button"
        className="failure-retry-btn"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  showJobsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantsStatus.success:
        return this.renderSuccessView()
      case apiConstantsStatus.inProgress:
        return this.renderLoaderView()
      case apiConstantsStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <ul>
        </ul>
        <ul></ul>
        <ul></ul>
        
        <div className="jobs-container">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              onChange={this.changeSearchInput}
              onKeyDown={this.onEnterSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-btn"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="lg-section-container-1">
            <Profile />

            <div>
              <hr className="line" />
              {this.employementsContainer()}
            </div>
            <div>
              <hr className="line" />
              {this.salaryRatingContainer()}
            </div>
          </div>

          <div className="lg-container-section-2">
            <div className="search-container-lg">
              <input
                type="search"
                placeholder="Search"
                className="search-input-lg"
                onChange={this.changeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn-lg"
              >
                <BsSearch className="search-icon-lg" />
              </button>
            </div>
            {this.showJobsView()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
