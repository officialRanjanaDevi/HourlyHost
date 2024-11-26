import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/userComponents/navbar/Navbar.jsx'
import Signin from './components/userComponents/signin/Signin.jsx'
import Signout from './components/userComponents/signout/Signout.jsx'
import Signup from './components/userComponents/signup/Signup.jsx'
import Home from './components/userComponents/home/Home.jsx'
import About from './components/userComponents/about/About.jsx'
import Account from './components/userComponents/account/Account.jsx'
import ViewAccount from './components/userComponents/viewAccount/ViewAccount.jsx'
import Favourite from './components/userComponents/favourite/Favourite.jsx'
import Profile from './components/userComponents/profile/Profile.jsx'
import Footer from './components/userComponents/footer/Footer.jsx'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signout" element={<Signout />} />
 
      <Route path="/about" element={<About />} />
      <Route path="/account" element={<Account />} />
      <Route path="/account/:id" element={<ViewAccount />} />
      <Route path="/favourite" element={<Favourite />} />
      <Route path="/profile" element={<Profile />} />
      
      </Routes><Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
