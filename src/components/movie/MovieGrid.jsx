import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'

import MovieCard from './MovieCard'
import MovieSearch from './MovieSearch'

import { OutlineButton } from '../selections/Button'

const MovieGrid = props => {

   const [items, setItems] = useState([])
   const [page, setPage] = useState(1)
   const [totalPage, setTotalPage] = useState(0)

   const {keyword} = useParams()

   useEffect(() => {
      const getList = async () => {
         let response = null

         if (keyword === undefined) {
            const params = {}
            switch (props.category) {
               case category.movie:
                  response = await tmdbApi.getMoviesList(movieType.upcoming, {params})
                  break
               default:
                  response = await tmdbApi.getTvList(tvType.popular, {params})
            }
         } else {
            const params = {
               query: keyword
            }
            response = await tmdbApi.search(props.category, {params})
         }

         setItems(response.results)
         setTotalPage(response.total_pages)
      }

      getList()
   }, [props.category, keyword])

   const loadMore = async () => {
      let response = null

      if (keyword === undefined) {
         const params = { page: page + 1 }
         switch (props.category) {
            case category.movie:
               response = await tmdbApi.getMoviesList(movieType.upcoming, {params})
               break
            default:
               response = await tmdbApi.getTvList(tvType.popular, {params})
         }
      } else {
         const params = {
            page: page + 1,
            query: keyword
         }
         response = await tmdbApi.search(props.category, {params})
      }

      setItems([...items, ...response.results])
      setPage(page + 1)
   }

   return (
      <>
         <div className="section mb-3">
            <MovieSearch category={props.category} keyword={keyword} />
         </div>
         <div className="movie-grid">
            {
               items.map((item, index) => (
                  <Link to={`/${category[props.category]}/${item.id}`}>
                     <MovieCard 
                        key={index}
                        category={props.category}
                        item={item}
                     />
                  </Link>
               
               ))
            }
         </div>
         {
            page < totalPage ? (
               <div className="movie-grid__loadmore">
                  <OutlineButton
                     className="small"
                     onClick={loadMore}
                  >
                     Load more
                  </OutlineButton>
               </div>
            ) : null
         }
      </>
   )
}

export default MovieGrid
