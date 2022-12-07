import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import {prisma} from '../../libs/prisma'
import superjson from 'superjson'

export async function getServerSideProps(context) {
    const castId = parseInt(context.query.id)
    const CastDet = superjson.serialize(await prisma.cast.findUnique({where:{id:castId}}))
    const Movies = superjson.serialize(await prisma.cast.findUnique({where:{id:castId}}).movies())
    return {
      props:{
        cast: CastDet,
        movies: Movies
      },
    }
  }


export default function cast({cast,movies}) {
    const castDet = cast.json
    const movieList = movies.json

  return (
    <div className='bg-black flex min-h-screen w-full'>
        <Head>
            <title>{castDet.name}</title>
        </Head>
        <div className='mx-auto px-[20px] w-[600px]  flex flex-col min-h-screen text-white'>
           <div className='flex w-full h-fit pt-[30px]'>
              <div className='w-[40%] h-fit flex'>
                <div className='m-auto flex w-[175px] h-[250px] relative'>
                   <Image src={castDet.photo} layout='fill' objectfit='cover' objectposition={'center'} />
                 </div>
                </div>
                <div className='w-[60%] flex h-fit flex-col'>
                   <h3 className='text-[30px] font-extrabold'>{castDet.name}</h3>
              
                   <h2 className='font-bold'>D.O.B :<span className='ml-[10px] font-normal'>{castDet.dob.substring(0,10)}</span></h2>
                   <h2 className='font-bold'>Roles :<span className='ml-[10px] font-normal'>{castDet.roles}</span> </h2>
                </div>
             </div>
             <div className='w-full flex flex-col pt-[25px] '>
              <h2 className= 'font-bold '>
                Overview:
              </h2>
              <p className =' font-thin-serif'>{castDet.overview}</p>

            </div>
            <div className='flex overflow-x-auto w-full h-fit pt-[25px]'>
              {movieList?.map((a)=>(
                <div className='flex flex-col p-[10px] w-fit h-fit'>
                  <div className='flex relative w-[110px] h-[160px]'><Image src={a.poster} layout='fill' objectfit='cover' objectposition={'center'} /></div>
                  <h2 >{a.title}</h2>
                </div>
              ))}
            </div>
         </div>
    </div>
  )
}