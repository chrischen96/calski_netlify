import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import axios from "axios"


const ResortsDetail = () => {
  const { id } = useParams()
  const [resort, setResort] = useState({})
  const [plan, setPlan] = useState({})
  const [confirm, setconfirm] = useState('')
  const [fatmap, setFatmap] = useState('')
  const [programs, setPrograms] = useState({})
  const { user } = useAuthContext()
  const localUser = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const getResort = async () => {
      await axios.get(`http://localhost:3001/api/resort/${id}`)
        .then(res => {
          console.log(res.data.resort)
          setResort(res.data.resort)
          const map = res.data.resort.coordinates.replace(/ /g, '')
          setFatmap(map)
          console.log(res.data.resort.programs)
          setPrograms(res.data.resort.programs)
        })
        .catch(err => console.log(err))
    }
    getResort()
  }, [])

  console.log(programs)

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value })
    setPlan({ ...plan, userName: localUser.email, resortName: res.data.resort.resortName })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:3001/api/plan', plan, { headers: { Authorization: `Bearer ${localUser.token}` } })
      .then(res => {
        // console.log(res)
        setconfirm(`You have successfully created you plan to ${resort.resortName}!`)
      })
      .catch(err => {
        // console.log(err)
        setconfirm('Something went wrong, please try again.')
      })
  }

  return (
    <div className="resort-detail pb-5" style={{ backgroundColor: 'rgb(248,249,250)' }}>
      <div className="hero">
        <div className="detail-head">
          <div className="detail-head-grid">
            <button className="detail-head-back">
              <Link to='/resorts'><h1><i className="bi bi-arrow-left-short"></i></h1></Link>
            </button>
            <div className="detail-head-name">
              <h1>{resort.resortName}</h1>
            </div>
          </div>
        </div>
        <div className="detail-hero-img">
          <img src={resort.image} alt="" className="" />
        </div>
        <button type="button" className="btn btn-primary my-4" data-bs-toggle="modal" data-bs-target="#planModal" data-bs-whatever="">Create a Plan</button>
      </div>

      <div className="summary">
        <div className="result-list">
          <p className="detail-description text-start mb-5 lh-base"><span className="fw-bold lh-lg">Description:</span> <br />{resort.description}</p>
          <div className="result-grid mb-5">

            {/* Ticket */}
            <div className="result-item ticket">
              <div className="item-card p-3 px-4 text-start" style={{ height: '' }}>
                <h5 className="fw-bold lh-lg"><i class="bi bi-ticket-detailed"></i> Ticket Prices:</h5>
                <p>Child: <span className="float-end">{resort.ticketChild ? `$ ${resort.ticketChild}` : 'N/A'}</span> </p>
                <p>Youth: <span className="float-end">{resort.ticketYouth ? `$ ${resort.ticketYouth}` : 'N/A'}</span></p>
                <p>Adult: <span className="float-end">{resort.ticketAdult ? `$ ${resort.ticketAdult}` : 'N/A'}</span></p>
                <p>Senior: <span className="float-end">{resort.ticketSenior ? `$ ${resort.ticketSenior}` : 'N/A'}</span></p>
              </div>
            </div>

            {/* Statistics */}
            <div className="result-item statistics">
              <div className="item-card p-3 px-4 text-start" style={{ height: '' }}>
                <h5 className="fw-bold lh-lg"><i class="bi bi-bar-chart-line"></i> Statistics:</h5>
                <p className="">Base Elevation: <span className="float-end">{resort.baseElevation} feet</span></p>
                <p>Summit Elevation: <span className="float-end">{resort.summitElevation} feet</span></p>
                <p>Vertical Rise: <span className="float-end">{resort.verticalRise} feet</span></p>
                <p>Number of Trails: <span className="float-end">{resort.numberOfTrails}</span></p>
                <p>Number of Lifts: <span className="float-end">{resort.numberOfLifts}</span></p>
              </div>
            </div>

            {/* Programs */}
            <div className="result-item programs">
              <div className="item-card p-3 px-4 text-start" style={{ height: '' }}>
                <h5 className="fw-bold lh-lg"><i class="bi bi-card-checklist"></i> Programs:</h5>
                <p className="">
                  Kids Program:
                  <span className="float-end">{programs.kidsProgram ? <i className="bi bi-check-circle-fill text-success"></i> : <i className="bi bi-x-circle-fill"></i>}</span>
                </p>
                <p className="">
                  Womens Program:
                  <span className="float-end">{programs.womensProgram ? <i className="bi bi-check-circle-fill text-success"></i> : <i className="bi bi-x-circle-fill"></i>}</span>
                </p>
                <p className="">
                  Ski Lessons:
                  <span className="float-end">{programs.skiLessons ? <i className="bi bi-check-circle-fill text-success"></i> : <i className="bi bi-x-circle-fill"></i>}</span>
                </p>
                <p className="">
                  Snowboard Lessons:
                  <span className="float-end">{programs.snowboardLessons ? <i className="bi bi-check-circle-fill text-success"></i> : <i className="bi bi-x-circle-fill"></i>}</span>
                </p>
                <p className="">
                  Equipment Rentals:
                  <span className="float-end">{programs.equipmentRentals ? <i className="bi bi-check-circle-fill text-success"></i> : <i className="bi bi-x-circle-fill"></i>}</span>
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="result-item contact">
              <div className="item-card contact p-3 px-4 text-start" style={{ height: '' }}>
                <h5 className="fw-bold lh-lg"><i class="bi bi-person-lines-fill"></i> Contacts:</h5>
                <p className="">Address: <br /> <span className="">{resort.contactAddress}</span></p>
                <p>Email: <br /> <span className="">{resort.contactEmail}</span></p>
                <p>Website: <br /> <a className="" href={`${resort.contactWebsite}`} target="_blank">{resort.contactWebsite}</a></p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="modal fade" id="planModal" tabIndex="-1" aria-labelledby="planModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{ translate: '0px -5vh' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="planModalLabel">Create Plan</h1>
              <button type="button" className="btn-close" name="" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {localUser ? (
              <div className="modal-body">
                <form className="text-start">
                  {/* <div className="mb-3">
                  <label htmlFor="plan-name" className="col-form-label">Plan Name:</label>
                  <input type="text" className="form-control" id="plan-name" onChange={handleChange}/>
                </div> */}
                  <div className="mb-3">
                    <label htmlFor="plan-date" className="col-form-label">Date:</label>
                    <input className="form-control" type="date" name="date" id="plan-date" onChange={handleChange}></input>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="plan-comment" className="col-form-label">Note:</label>
                    <input className="form-control" name="comment" id="plan-comment" onChange={handleChange}></input>
                  </div>
                  {/* <div className="mb-3">
                  <label htmlFor="plan-activity" className="col-form-label">Activity:</label>
                  <input className="form-control" id="plan-activity" onChange={handleChange}></input>
                </div> */}
                </form>
              </div>

            ) : (
              <div><h3 className="m-5">Please Log in to create a plan.</h3></div>
            )
            }
            {localUser ? (
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmModal" onClick={handleSubmit}>Create Plan</button>
              </div>
            ) : (
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"><Link to='/login' className="text-white link-underline link-underline-opacity-0">Log in</Link></button>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="modal fade" id="confirmModal" tabIndex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{ translate: '0px -5vh' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="planModalLabel">Create Plan</h1>
              <button type="button" className="btn-close" name="" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>{confirm}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>

      <iframe height="692px" src={`https://fatmap.com/activity/pistes/@${fatmap}`} width="100%"></iframe>
    </div>
  )
}

export default ResortsDetail