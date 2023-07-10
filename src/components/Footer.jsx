import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <div className='app-footer'>
      <div className='social-media'>
        <div className="icon-row">
          <div className="d-flex justify-content-evenly">
            <h3><i className="bi bi-instagram"></i></h3>
            <h3><i className="bi bi-facebook"></i></h3>
            <h3><i className="bi bi-snapchat"></i></h3>
            <h3><i className="bi bi-linkedin"></i></h3>
            <h3><i className="bi bi-google"></i></h3>
          </div>
        </div>
      </div>


      <div className="contact-us d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: 'rgb(0, 76, 153)' }}>
        <div className="d-flex flex-column align-items-center">
          <h6 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '5px', marginBottom: '3px' }}>CONTACT US</h6>
          <h6 className="me-3"><i className="bi bi-envelope"></i> info@calski.com</h6>
          <h6><i className="bi bi-telephone"></i> 555.555.5555</h6>
          <h6><i className="bi bi-geo-alt"></i> 555 One Way Street, Mountain Area CA 00000</h6>
          <h6 className="">© J.E.X</h6>
        </div>
      </div>

    </div>



  )
}

export default Footer;