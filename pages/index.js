import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

import {prisma} from '../libs/prisma'
import superjson from 'superjson'

import Slider from '../components/Slider'

export async function getServerSideProps() {
  const Movies = superjson.serialize(await prisma.movie.findMany())
  const Genres = superjson.serialize(await prisma.genre.findMany())
  return {
    props:{
      movies: Movies,
      genres: Genres
    },
  }
}


export default function Home({movies,genres}) {

  const [searchText,setSearchText] =  useState("");
  const [genre,setGenre] =  useState(0);
  const [searchResults,setSearchResults] = useState([]);

  const searchData = {searchText:searchText,genre:genre}

  const handleSearch = async() =>{
    const response = await fetch('api/search',{
      method:'POST',
      body: superjson.stringify(searchData)
    })
    var sr = await response.json();
    setSearchResults(sr.Results)
  }

  const genreList = genres.json
  const scifiMovies = movies.json

  return (
    <div className='bg-black min-h-[100vh]'>
      <Head>
        <title>Movie Utopia</title>
      </Head>
      <div className='flex w-full h-[50vh] sm:h-[60vh] bg-banner relative'>
        <div className='flex w-full h-full absolute top-0 bg-[#00000085]'></div>
        
        <div className='flex w-fit h-fit m-auto z-[50] flex-wrap justify-center'>
          <input type={'text'} 
          onChange={(e)=>{setSearchText(e.target.value)}} 
          className='py-[7px] px-[10px] bg-[#ffffff85] mx-[10px] outline-none border-none rounded-full' />
          
          <select className='my-auto mx-[10px] px-[12px] py-[7px] bg-white h-fit rounded-full outline-none border-none bg-red-700 text-white' 
          onChange={(e)=>{setGenre(e.target.value)}}>
            <option defaultValue={0}>Genre</option>
            {genreList.map((a)=>(
              <option value={a.id} key={a.id}>{a.name}</option>
            ))}
          </select>

          <button
          className='my-auto mx-[10px] px-[12px] py-[7px] bg-white w-[40px] h-[40px] flex rounded-full bg-red-700 text-white' 
          onClick={handleSearch}
          ></button>
        </div>
        <div className='bg-gradient-to-t from-black flex w-full h-[3rem] absolute bottom-0'></div>
      </div>

      {searchResults.length === 0 ? 
      <Slider title='Sci-Fi' movies={scifiMovies}/> 
      :
      <div className='flex flex-wrap w-full px-[50px] '>
      {searchResults?.map((a)=>(
        <Link href={'/movies/'+a.id}><div className='flex min-w-[170px] w-[170px] h-[250px] mx-[10px] rounded-2xl overflow-hidden relative hover:scale-[1.1] cursor-pointer transition-all ease-in-out duration-[1s]' key={a.id}>
          <Image src={a.poster} layout='fill' objectFit='cover' objectPosition={'center'} />
        </div></Link>
      ))}
      </div>
      }
    
    
    </div>
  )
}
