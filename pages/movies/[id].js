import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

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

    const [addReviewShow,setAddReviewShow] = useState(false)
    const [name,setName] = useState("Anonymous")
    const [text,setText] = useState("")
    const [rating,setRating] = useState(0)
    const [movieId,setMovieId] = useState(movieDet.id)


    const submitData = {name:name,text:text,rating:rating,movieId:movieId}
    const handleSubmit = async() =>{
      console.log(submitData)
      const response = await fetch('api/createReview',{
          method:'POST',
          body: superjson.stringify(submitData)
      })
      const submitResults = await response.json();
      console.log(submitResults)
      router.reload(window.location.pathname)
  }

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

            <div className='flex overflow-x-auto w-full h-fit pt-[25px] scroll-hide'>
              {movieCasts?.map((a)=>(
                <Link href={'/casts/'+a.id} key={a.id}>
                <div className='flex flex-col p-[10px] w-fit h-fit'>
                  <div className='flex relative w-[100px] h-[150px]'><Image src={a.photo} layout='fill' objectfit='cover' objectposition={'center'} /></div>
                  <h2>{a.name}</h2>
                </div></Link>
              ))}
            </div>
            
            <div className='w-full flex flex-col'>
              <div className='flex w-full justify-between'>
                <h1 className='text-[30px] font-bold'>Reviews</h1>
                <button className='bg-red-600 p-[5px] h-fit rounded flex my-auto' onClick={()=>{setAddReviewShow(!addReviewShow)}}>Add Review</button>
              </div>
              <div>
                {movieReviews?.map((a)=>(
                  <div key={a.id} className='px-[15px] py-[10px] flex w-[90%] h-fit flex-col mx-auto my-[15px] border-[1px] border-grey-100 rounded-md'>
                    <div className='flex w-full justify-between'>
                      <h1 className='text-[16px] font-bold'>{a.reviewer_name}</h1>
                      <span className='bg-grey-600 p-[5px] h-fit rounded flex my-auto'>{a.review_rating}</span>
                    </div>
                    <p>{a.review_text}</p>
                  </div>
                ))}
              </div>
            </div>

        </div>

        <div className={`bg-[#00000090] fixed top-0 w-full h-screen ${addReviewShow? 'flex':'hidden'}`}>
        <div className='bg-white flex flex-col h-[80%] overflow-y-auto scroll-hide w-[600px] text-black rounded-md mx-auto mt-[50px] p-[20px]'>
            <h1 className='text-[1.5rem] w-full text-center'>Add New Review</h1>
            
            <table className='my-[50px]'>
                <tbody>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Name:</td>
                    <td className='flex w-full h-[1.75rem] sm:h-[2rem]'><input type={'text'} onChange={(e)=>{setName(e.target.value)}} value={name} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Review:</td>
                    <td className='flex w-full h-[8rem]'><textarea onChange={(e)=>{setText(e.target.value)}} value={text} className='w-full h-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Rating:</td>
                    <td className='flex w-full h-[1.75rem] sm:h-[2rem]'><input type={'number'} onChange={(e)=>{setRating(e.target.value)}} value={rating} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                </tbody>
            </table>
            <div className='mt-[50px] w-full justify-between flex'>
              <button className='bg-red-600 py-[3px] px-[10px] rounded-md ml-[100px] text-white' onClick={()=>{handleSubmit();setAddReviewShow(!addReviewShow)}}>Submit</button>
              <button className='py-[3px] px-[10px] rounded-md mr-[100px]' onClick={()=>{setAddReviewShow(!addReviewShow)}}>Cancel</button>
            </div>

        </div>
      </div>
    </div>
  )
}
