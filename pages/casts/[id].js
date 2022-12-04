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
        <div className='mx-auto px-[20px]'>

        </div>
    </div>
  )
}