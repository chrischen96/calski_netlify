import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Resorts = () => {
  const [resorts, setResorts] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const [region, setRegion] = useState('')
  const [program, setProgram] = useState('')
  const [trails, setTrails] = useState('')
  const [filters, setFilters] = useState(true)

  useEffect(() => {
    const getResorts = async () => {
      await axios.get('http://localhost:3001/api/resort')
        .then(res => {
          console.log(res.data)
          setResorts(res.data)
          setFilters(true)
        })
    }
    getResorts()
  }, [filters])

  // console.log(search, region, program, trails)

  const handleSearch = async (e) => {
    e.preventDefault()
    console.log('hi', search)
    const s = search ? `search=${search}&` : ''
    // const r = region? `region=${region}&` : ''
    // const p = program? `program=${program}&` : ''
    // const t = trails? `trails=${trails}&` : ''
    await axios.get(`http://localhost:3001/api/resort?` + s)
      .then(res => {
        console.log(res.data)
        setResorts(res.data)
        filter(res.data)
      })
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const showResort = (e) => {
    navigate(e)
  }

  const handleSelect = (e) => {
    console.log(e.target.id, e.target.value)
    console.log(search, region, program, trails)
    const option = e.target.id
    if (option === 'region') {
      setRegion(e.target.value)
    } else if (option === 'program') {
      setProgram(e.target.value)
    } else if (option === 'trails') {
      setTrails(e.target.value)
    }
  }

  const filter = (results) => {
    let filtered = results
    console.log(filtered)
    console.log(search, region, program, trails)
    if (region) {
      filtered = filtered.filter(resort => resort.region === region)
      console.log(filtered)
    }
    if (program) {
      filtered = filtered.filter(resort => {
        const programs = resort.programs
        console.log(programs[program])
        return programs[program]
      })
      console.log(filtered)
    }
    if (trails) {
      filtered = filtered.filter(resort => {
        console.log(trails, resort.numberOfTrails)
        if (trails <= 90) {
          return (resort.numberOfTrails <= trails && resort.numberOfTrails > trails - 30)
        } else {
          return (resort.numberOfTrails > 90)
        }
      })
      console.log(filtered)
    }
    setResorts(filtered)
  }

  const clearFilter = (e) => {
    e.preventDefault()
    setSearch('')
    setRegion('')
    setProgram('')
    setTrails('')
    setFilters(false)
  }


  return (
    <div className='resorts'>
      {/* <div className='resorts-intro'>
        <p>California is home to numerous ski resorts that cater to winter sports enthusiasts of all skill levels. These resorts offer a variety of terrains, amenities, and natural beauty, making them popular destinations for locals and tourists alike.

          California ski resorts have excellent snow quality, as the state's climate is diverse and has high elevation. Many resorts receive abundant snowfall that ensures great skiing conditions for a longer season.

          Though skiing and snowboarding are very popular, California ski resorts offer a number of additional winter activities, such as snowshoeing, snowmobiling, tubing, and ice skating.

          If outdoor activities are not for you, come enjoy the village areas that have plenty of lodges, restaurants, bars, and shops.

          Whether you're a seasoned skier,  first-timer, or not an outdoor enthusiast as all, California offers a wide range of activities to suit everyone.
          <br />
          <br />
          Check out destination options below.
        </p>
      </div> */}

      <div className='resorts-search'>
        <div className='container pt-5'>
          <div className="row justify-content-evenly">
            <div className="col-sm-4 col-12">
              <p className="m-2">By Region</p>
              <select id="region" className="form-select" onChange={handleSelect} value={region}>
                <option value="" defaultValue="">Region</option>
                <option disabled={true}>—</option>
                <option value="Central California">Central California</option>
                <option value="Lake Tahoe / North">Lake Tahoe / North</option>
                <option value="Southern California">Southern California</option>
              </select>
            </div>

            <div className="col-sm-4 col-12">
              <p className="m-2">By Program</p>
              <select id="program" className="form-select" onChange={handleSelect} value={program}>
                <option value="" defaultValue="">Program</option>
                <option disabled={true}>—</option>
                <option value="kidsProgram">Kids Program</option>
                <option value="womensProgram">Womens Program</option>
                <option value="skiLessons">Ski Lessons</option>
                <option value="snowboardLessons">Snowboard Lessons</option>
                <option value="equipmentRentals">Equipment Rentals</option>
                <option value="adaptiveProgram">Adaptive Program</option>
              </select>
            </div>

            <div className="col-sm-4 col-12">
              <p className="m-2">By Trails</p>
              <select id="trails" className="form-select" onChange={handleSelect} value={trails}>
                <option value="" defaultValue="">Number of Trails</option>
                <option disabled={true}>—</option>
                <option value="30"> 1 - 30</option>
                <option value="60">31 - 60</option>
                <option value="90">61 - 90</option>
                <option value="91">&gt; 90</option>
              </select>
            </div>
            <form className='my-5 mx-5 d-flex justify-content-center'>
              <input type='text' id='search' placeholder='Search' className='form-control me-3' onChange={handleChange} value={search} />
              <button className='btn btn-primary me-3' type='submit' onClick={handleSearch}>Search</button>
              <button className='result-clear-btn' onClick={clearFilter}><a className='link' >Clear</a></button>
            </form>
          </div>
        </div>

      </div>

      <h1>California Ski Resorts</h1>
      <div className='result-list'>


        <div className='result-grid'>
          {
            resorts.map(resort => (
              <div className='result-item' key={resort._id}>
                <div className='item-card' onClick={() => { showResort(resort._id) }}>
                  <img src={`${resort.image}`} alt={resort.resortName} className='item-img' />
                  <div className='item-content text-start'>
                    <h6 className=''>{resort.resortName}</h6>
                    <p className='p-0 m-0'>{resort.contactAddress}</p>
                    <p className='p-0 mt-auto mb-0'>{resort.region}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Resorts