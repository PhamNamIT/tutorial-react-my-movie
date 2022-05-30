import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import tmdbApi, {category, movieType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import Button, { OutlineButton } from '../selections/Button'
import Modal, { ModalContent } from '../modal/Modal'

const HeroSlide = () => {

   SwiperCore.use([Autoplay])

   const [movieItems, setMovieItems] = useState([])

   useEffect(() => {
      const getMovies = async () => {
         const params = {page: 1}
         try {
            const response = await tmdbApi.getMoviesList(movieType.popular, {params})
            setMovieItems(response.results.slice(0, 5))
         } catch {
            console.log('error')
         }
      }
      getMovies()
   }, [])

   return (
      <div className="hero-slide">
         <Swiper
            modules={[Autoplay]}
            grabCursor={true}
            spaceBetween={0}
            slidesPerView={1}
            // autoplay={{delay: 4000}}
         >
            {
               movieItems.map((item, index) => (
                  <SwiperSlide key={index} >
                     {({ isActive }) => (
                        <HeroSlideItem
                           item={item}
                           className={`${isActive ? 'active' : ''}`}
                        />
                     )}
                  </SwiperSlide>
               ))
            }
         </Swiper>
         {
            movieItems.map((item, index) => <TrailerModal item={item} key={index} />)
         }
      </div>
   )
}

const HeroSlideItem = props => {
   let history = useNavigate()

   const item = props.item

   const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

   const setModalActive = async () => {
      const modal = document.querySelector(`#modal_${item.id}`)

      const videos = await tmdbApi.getVideos(category.movie, item.id)

      if (videos.results.length > 0) {
         const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key

         modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc)
      } else {
         modal.querySelector('.modal__content').innerHTML = 'No trailer'
      }

      modal.classList.toggle('active')
   }

   return (
      <div 
         className={`hero-slide__item ${props.className}`}
         style={{backgroundImage: `url(${background})`}}
      >
         <div className="hero-slide__item__content container">
            <div className="hero-slide__item__content__info">
               <h2 className="title">{item.title}</h2>
               <div className="overview">{item.overview}</div>
               <div className="btns">
                  <Button onClick={() => history('/movie/' + item.id)} >
                     Watch now
                  </Button>
                  <OutlineButton onClick={setModalActive} >
                     Watch trailer
                  </OutlineButton>
               </div>
            </div>
            <div className="hero-slide__item__content__poster">
               <img src={apiConfig.w500Image(item.poster_path)} alt="" />
            </div>
         </div>
      </div>
   )
}

const TrailerModal = props => {
   const item = props.item

   const iframeRef = useRef(null)

   const onClose = () => iframeRef.current.setAttribute('src', '')

   return (
      <Modal active={false} id={`modal_${item.id}`} >
         <ModalContent onClose={onClose} >
            <iframe ref={iframeRef} width="100%" height="500px" title="trailer" ></iframe>
         </ModalContent>
      </Modal>
   )
}

export default HeroSlide
