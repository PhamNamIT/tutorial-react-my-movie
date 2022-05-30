import '../node_modules/swiper/swiper.min.css'
import './App.scss'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import Router from './config/Router'

function App() {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route render={props => (
          <>
            <Header {...props} />
            <Router/>
            <Footer/>
          </>
        )} />
      </Routes> */}

      <Header/>
      <div>
        <Router/>
      </div>
      <Footer/>
    </BrowserRouter>
  )
}

export default App