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
        <div className='mx-auto px-[20px] w-[600px] flex flex-col min-h-screen text-white'>
          <div className='flex w-full h-fit pt-[30px]'>
            <div className=' w-[40%] h-fit flex'>
              <div className='m-auto flex w-[175px] h-[250px] relative'>
                <Image src={movieDet.poster} layout='fill' objectfit='cover' objectposition={'center'} />
              </div>
            </div>
            <div className='w-[60%] flex h-fit flex-col'>
              <h3 className='text-[30px] font-extrabold'>{movieDet.title}</h3>
              <div>
                {movieGenres?.map((a)=>(
                  <span key={a.id} className='mr-[10px] font-bold'>{a.name}</span>
                ))}
              </div>
              
              <h2 className='font-bold'>Category :<span className='ml-[10px] font-normal'>{movieDet.category}</span></h2>
              <h2 className='font-bold'>Release Date:<span className='ml-[10px] font-normal'>{movieDet.release_date.substring(0,10)}</span> </h2>
            </div> 
          </div>

          <div className='w-full flex flex-col pt-[25px]  '>
              <h1 className= 'text-[20px] font-bold'>
                Overview:
              </h1>
              <p>{movieDet.overview}</p>

            </div>

            <div className='flex overflow-x-auto w-full h-fit pt-[25px]'>
              {movieCasts?.map((a)=>(
                <div className='flex flex-col p-[10px] w-fit h-fit'>
                  <div className='flex relative w-[100px] h-[150px]'><Image src={a.photo} layout='fill' objectfit='cover' objectposition={'center'} /></div>
                  <h2>{a.name}</h2>
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}
