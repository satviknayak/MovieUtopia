import Head from 'next/head'
import { useState } from 'react'
import superjson from 'superjson'


export default function addMovie() {

    const [title,setTitle] = useState("")
    const [overview,setOverview] = useState("")
    const [releaseDate,setRealeaseDate] = useState("")
    const [duration,setDuration] = useState("")
    const [category,setCategory] = useState("")
    const [trailer,setTrailer] = useState("")
    const [poster,setPoster] = useState("")

    const submitData = {title:title,overview:overview,releaseDate:releaseDate.concat("T00:00:00.000Z"),duration:duration,category:category,trailer:trailer,poster:poster}
    const handleSubmit = async() =>{
        const response = await fetch('api/createMovie',{
            method:'POST',
            body: superjson.stringify(submitData)
        })
        const submitResults = await response.json();
    }


  return (
    <div>
        <Head><title>Add Movie</title></Head>
        <div className='bg-black flex w-full min-h-screen text-white'>
        <div className='flex flex-col mx-auto px-[10px] w-[300px] sm:w-[600px] text-center'>
            <h1 className='text-[2rem] font-bold mt-[100px]'>Add New Movie</h1>

            <table className='my-[50px]'>
                <tbody>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Title:</td>
                    <td className='flex w-full h-[1.75rem] sm:h-[2rem]'><input type={'text'} onChange={(e)=>{setTitle(e.target.value)}} value={title} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Overview:</td>
                    <td className='flex w-full h-[8rem]'><textarea onChange={(e)=>{setOverview(e.target.value)}} value={overview} className='w-full h-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Release Date:</td>
                    <td className='flex w-full h-[1.75rem] sm:h-[2rem]'><input type={'text'} onChange={(e)=>{setRealeaseDate(e.target.value)}} value={releaseDate} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Duration:</td>
                    <td className='flex w-full h-[1.75rem] sm:h-[2rem]'><input type={'text'} onChange={(e)=>{setDuration(e.target.value)}} value={duration} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Category:</td>
                    <td className='flex w-full h-[1.75rem] sm:h-[2rem]'><input type={'text'} onChange={(e)=>{setCategory(e.target.value)}} value={category} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Trailer Link:</td>
                    <td className='flex w-full h-[1.75rem] sm:h-[2rem]'><input type={'text'} onChange={(e)=>{setTrailer(e.target.value)}} value={trailer} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[25%]'>Poster Link:</td>
                    <td className='flex w-full h-[1.75rem] sm:h-[2rem]'><input type={'text'} onChange={(e)=>{setPoster(e.target.value)}} value={poster} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                </tbody>
            </table>
            <div className='w-full flex'><button className='mx-auto py-[5px] px-[10px] bg-red-600 rounded-md text-white' onClick={handleSubmit}>Submit</button></div>
        </div>
        </div>
    </div>
  )
}
