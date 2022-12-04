import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import {prisma} from '../../libs/prisma'
import superjson from 'superjson'

export async function getServerSideProps(context) {
    const movieId = parseInt(context.query.id)
    const MovieDet = superjson.serialize(await prisma.movie.findUnique({where:{id:movieId}}))
    const Genres = superjson.serialize(await prisma.movie.findUnique({where:{id:movieId}}).genres())
    const Reviews = superjson.serialize(await prisma.movie.findUnique({where:{id:movieId}}).reviews())
    const Casts = superjson.serialize(await prisma.movie.findUnique({where:{id:movieId}}).casts())
    return {
      props:{
        movie: MovieDet,
        genres:Genres,
        reviews:Reviews,
        casts:Casts
      },
    }
  }


export default function movie({movie,genres,reviews,casts}) {
    const movieDet = movie.json
    const movieGenres = genres.json
    const movieCasts = casts.json
    const [movieReviews,setMovieReviews] = useState(reviews.json)

  return (
    <div className='bg-black flex min-h-screen w-full'>
        <Head>
            <title>{movieDet.title}</title>
        </Head>
        <div className='mx-auto px-[20px]'>

        </div>
    </div>
  )
}
