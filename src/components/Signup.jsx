import { useState, useContext } from 'react'
import { useSignup } from '../hooks/useSignup'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [match, setMatch] = useState('')
    const { signup, error, isLoading } = useSignup()
    const { state } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password!== confirmPassword) {
            setMatch('Passwords do not match')
        } else {
            setMatch('')
            await signup(email, password)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value)
        } 
        console.log(name, value)
    }

    return (
        <div className='signup'>
            <div className='signup-content'>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <img src={logo} alt="" />
                    <h2 className='mb-5'>Sign Up</h2>

                    <div className='email-input my-3'>
                        <label htmlFor='email' className='form-label'>Email:</label>
                        <input className='form-control' type='email' name='email' id='email' onChange={handleChange} value={email} />
                    </div>

                    <div className='password-input mb-3'>
                        <label htmlFor='password' className='form-label'>Password:</label>
                        <input className='form-control' type='password' name='password' id='password' onChange={handleChange} value={password} />
                    </div>

                    <div className='password-input mb-3'>
                        <label htmlFor='confirmPassword' className='form-label'>Confirm Password:</label>
                        <input className='form-control' type='password' name='confirmPassword' id='confirmPassword' onChange={handleChange} value={confirmPassword} />
                    </div>

                    <button type='submit' className='btn btn-primary my-3' disabled={isLoading}>Sign Up</button>
                    {error && <div className='error text-danger'>{error}!</div>}
                    { error =='Email already exists' && 
                    <p className="text-white mt-2"><Link to='/login' className='link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-50-hover'>Login<i className="bi bi-chevron-right"></i></Link></p>}
                    {match && <div className='match text-danger'>{match}!</div>}
                </form>
            </div>
            <div>
                {state}
            </div>
        </div>
    )
}

export default Signup