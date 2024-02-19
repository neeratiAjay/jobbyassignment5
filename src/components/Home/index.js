import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  return (
    <div className="home-bg-container">
      <Header />
      <h1 className="home-heading">Find The Job That Fits Your Life</h1>
      <p className="home-para">
        Millions of people are searching for jobs, salary Information, compony
        reviews, Find the job that fits your abilities and potential.{' '}
      </p>
      <Link to="/jobs">
        <button className="jobs-btn">Find Jobs</button>
      </Link>
    </div>
  )
}
export default Home
