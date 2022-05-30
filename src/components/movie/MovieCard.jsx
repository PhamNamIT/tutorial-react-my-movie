import React from 'react'

import Button from '../selections/Button'

import apiConfig from '../../api/apiConfig'

import { FaPlay } from 'react-icons/fa'

const MovieCard = props => {

   const item = props.item
   const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path)

   return (
      <div>
         <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
            <Button>
               <FaPlay />
            </Button>
         </div>
         <h3 className="movie-card__title">{item.title || item.name}</h3>
      </div>
   )
}

export default MovieCard
