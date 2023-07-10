import { useState } from 'react'
// import { useAuthContext } from '../hooks/useAuthContext'
import { useLogin } from '../hooks/useLogin.jsx'
import logo from '../assets/logo.png'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const { loggedInUser, setLoggedInUser } = useContext(UserContext)
    // const [user, setUser] = useState({})
    const { login, error, isLoading } = useLogin()
    // const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
        console.log(name, value)
    }

    return (
        <div className='login'>
            <div className='login-content'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <img src={logo} alt="" />
                    <h2 className='mb-5'>Log in</h2>

                    <div className='my-3 email-input'>
                        <label htmlFor="login-email" className="form-label">Email:</label>
                        <input
                            className='form-control'
                            type='email'
                            id='login-email'
                            name='email'
                            onChange={handleChange}
                            value={email}
                        />
                    </div>

                    <div className='mb-3 password-input'>
                        <label htmlFor="login-password" className="form-label">Password:</label>
                        <input
                            className='form-control'
                            id='login-password'
                            type='password'
                            name='password'
                            onChange={handleChange}
                            value={password}
                        />
                    </div>

                    <button type='submit' className='btn btn-primary my-3' disabled={isLoading}>Login</button>
                    {error && <div className='error'>{error}</div>}
                </form>

                {/* <div>{user}</div> */}
            </div>

        </div>
    )
}


export default Login