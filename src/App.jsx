import React, { useState, useContext } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    email: '',
    password: '',
    favResorts: [],
  })
  return (
    <div className="App">
      <header className='App-header'>
        <Header />
      </header>
      <main className='App-main'>
        <Main />
      </main>
      <footer className='App-footer'>
        <Footer />
      </footer>
    </div>
  )
}

export default App
