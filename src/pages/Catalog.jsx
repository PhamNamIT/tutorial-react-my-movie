import React from 'react'
import { useParams } from 'react-router-dom'

import Helmet from '../components/helmet/Helmet'
import MovieGrid from '../components/movie/MovieGrid'

import { category as cate } from '../api/tmdbApi'

const Catalog = () => {

   const { category } = useParams()

   const titlePage = category === cate.movie ? 'Movies' : 'TV Series'

   return (
      <Helmet title={titlePage}>
         <div className="content-header" style={{backgroundColor: ``}} >
            <h2>{titlePage}</h2>
         </div>
         <div className="container">
            <div className="section mb-3">
               <MovieGrid category={category} />
            </div>
         </div>
      </Helmet>
   )
}

export default Catalog
