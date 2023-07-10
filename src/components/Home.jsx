import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className='home'>
      <div className='home-content-1 d-flex'>
        <div className="text-wrapper d-flex flex-column align-items-center">
          <h1 className='text-white'>Welcome to CalSki!</h1>
          <h3 className='text-white p-5 pt-0 lh-base'>We provide everything you need to know to plan your perfect trip to one of California's 26 world-renowned ski resorts.</h3>
          <h3 className="text-white fs-5"><Link to='/resorts' className='text-white icon-link link-offset-1 link-underline-light link-underline-opacity-0 link-underline-opacity-100-hover'>Find a Resort<i className="bi bi-chevron-right"></i></Link></h3>
        </div>
      </div>
      <div className='home-content-2 d-flex flex-column'>
        <h1 className='text-white fs-1'>Personalize your Experience</h1>
        <h3 className='text-white ps-3 pe-3 lh-base'>All you have to do is make an account, make a plan, and enjoy your vacation! </h3>
        <h3 className="text-white mt-4 fs-5"><Link to='/login' className='text-white icon-link link-underline-light link-underline-opacity-0 link-underline-opacity-100-hover'><span>Login or Register</span><i className="bi bi-chevron-right"></i></Link></h3>
      </div>
      <div className='home-content-3 d-flex flex-column'>
        {/* <h1 className='text-white fs-1'>Personalize your Experience</h1> */}
        <h3 className='text-black m-5 p3 lh-base'>California is home to numerous ski resorts that cater to winter sports enthusiasts of all skill levels. These resorts offer a variety of terrains, amenities, and natural beauty, making them popular destinations for locals and tourists alike.</h3>
      </div>
    </div>
    
  )
}

export default Home