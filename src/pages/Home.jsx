import React from 'react'
import { Link } from 'react-router-dom'

import HeroSlide from '../components/slider/HeroSlide'
import { OutlineButton } from '../components/selections/Button'
import MovieList from '../components/movie/MovieList'

import { category, movieType, tvType } from '../api/tmdbApi'

import Helmet from '../components/helmet/Helmet'

const Home = () => {
   return (
      <Helmet title="Trang chủ">
         <HeroSlide />
         <div className="container">
            {/** Trending Movies */}
            <div className="section mb-3">
               <div className="section__header mb2">
                  <h2>Trending Movies</h2>
                  <Link to="/movie">
                     <OutlineButton>View more</OutlineButton>
                  </Link>
               </div>
               <MovieList category={category.movie} type={movieType.popular} />
            </div>
            {/** End */}
            {/** Top Rated Movies */}
            <div className="section mb-3">
               <div className="section__header mb2">
                  <h2>Top Rated Movies</h2>
                  <Link to="/movie">
                     <OutlineButton>View more</OutlineButton>
                  </Link>
               </div>
               <MovieList category={category.movie} type={movieType.top_rated} />
            </div>
            {/** End */}
            {/** Trending TV */}
            <div className="section mb-3">
               <div className="section__header mb2">
                  <h2>Trending TV</h2>
                  <Link to="/tv">
                     <OutlineButton>View more</OutlineButton>
                  </Link>
               </div>
               <MovieList category={category.tv} type={tvType.popular} />
            </div>
            {/** End */}
            {/** Top Rated TV */}
            <div className="section mb-3">
               <div className="section__header mb2">
                  <h2>Top Rated TV</h2>
                  <Link to="/tv">
                     <OutlineButton>View more</OutlineButton>
                  </Link>
               </div>
               <MovieList category={category.tv} type={tvType.top_rated} />
            </div>
            {/** End */}
         </div>
      </Helmet>
   )
}

export default Home
