import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import tmdbApi from '../api/tmdbApi'
import apiConfig from '../api/apiConfig'

import Helmet from '../components/helmet/Helmet'
import MovieList from '../components/movie/MovieList'

const Detail = () => {

   const {category, id} = useParams()

   const [item, setItem] = useState(null)

   useEffect(() => {
      const getDetail = async () => {
         const response = await tmdbApi.detail(category, id, {params: {}})
         setItem(response)
         window.scrollTo(0, 0)
      }

      getDetail()
   }, [category, id])

   return (
      <>
         {
            item && (
               <Helmet title={item.title || item.name}>
                  <div 
                     className="banner"
                     style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}
                  ></div>
                  <div className="movie-detail mb-3">
                     <div className="movie-detail__poster">
                        <div 
                           className="movie-detail__poster__img"
                           style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}
                        ></div>
                     </div>
                     <div className="movie-detail__info">
                        <h1 className="title">{item.title || item.name}</h1>
                        <div className="genres">
                           {
                              item.genres && item.genres.slice(0, 5).map((genres, index) => (
                                 <span key={index} className="genres__item" >{genres.name}</span>
                              ))
                           }
                        </div>
                        <p className="overview">{item.overview}</p>
                        <div className="cast">
                           <div className="section__header">
                              <h2>Cast</h2>
                           </div>
                           <CastList id={item.id} />
                        </div>
                     </div>
                  </div>
                  <div className="container">
                     <div className="section mb-3">
                        <VideoList id={item.id} />
                     </div>
                     <div className="section mb-3">
                        <h2>Similar</h2>
                        <MovieList category={category} id={item.id} type="similar" />
                     </div>
                  </div>
               </Helmet>
            )
         }
      </>
   )
}

const CastList = props => {

   const {category} = useParams()

   const [casts, setCasts] = useState([])

   useEffect(() => {
      const getCredits = async () => {
         const res = await tmdbApi.credits(category, props.id)
         setCasts(res.cast.slice(0, 5))
      }

      getCredits()
   }, [category, props.id])

   return (
      <div className="casts">
         {
            casts.map((item, index) => (
               <div className="casts__item" key={index} >
                  <div 
                     className="casts__item__img"
                     style={{backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`}}
                  ></div>
                  <p className="casts__item__name">{item.name}</p>
               </div>
            ))
         }
      </div>
   )
}

const Video = props => {

   const item = props.item

   const iframeRef = useRef(null)

   useEffect(() => {
      const height = iframeRef.current.offsetWidth * 9 / 16 + 'px'
      iframeRef.current.setAttribute('height', height)
   }, [])

   return (
      <div className="video">
         <div className="video__title">
            <h2>{item.name}</h2>
         </div>
         <iframe 
            src={`https://www.youtube.com/embed/${item.key}`}
            ref={iframeRef}
            width="100%"
            title="video"
         ></iframe>
      </div>
   )
}

const VideoList = props => {

   const {category} = useParams()

   const [videos, setVideos] = useState([])

   useEffect(() => {
      const getVideos = async () => {
         const res = await tmdbApi.getVideos(category, props.id)
         setVideos(res.results.slice(0, 5))
      }

      getVideos()
   }, [category, props.id])

   return (
      <>
         {
            videos.map((item, index) => (
               <Video key={index} item={item} />
            ))
         }
      </>
   )
}

export default Detail
