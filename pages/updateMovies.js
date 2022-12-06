import Head from 'next/head'
import { useState } from "react"
import {useRouter} from 'next/router'

import {prisma} from '../libs/prisma'
import superjson from 'superjson'
import {MdOutlineCreate,MdDeleteOutline,MdAddCircleOutline,MdClose} from 'react-icons/md'

export async function getServerSideProps() {
  const Movies = superjson.serialize(await prisma.movie.findMany({
    include:{
      genres:true,
      casts:true
    }
  }))
  const Genres = superjson.serialize(await prisma.genre.findMany())
  const Casts = superjson.serialize(await prisma.cast.findMany())

  return {
    props:{
      movies: Movies,
      genres: Genres,
      casts: Casts
    },
  }
}

export default function updateMovies({movies,genres,casts}) {
  
  const router = useRouter()

  const [showDelete,setShowDelete] = useState(false)
  const [showUpdate,setShowUpdate] = useState(false)

  const [deleteInfo,setDeleteInfo] = useState({id:0,title:""})
  
  const [movieid,setMovieId] = useState()
  const [title,setTitle] = useState("")
  const [overview,setOverview] = useState("")
  const [releaseDate,setRealeaseDate] = useState("")
  const [duration,setDuration] = useState("")
  const [category,setCategory] = useState("")
  const [trailer,setTrailer] = useState("")
  const [poster,setPoster] = useState("")
  const [castsArr,setCastsArr] = useState([])
  const [cast,setCast] =  useState()
  const [genreArr,setGenreArr] = useState([])
  const [genre,setGenre] = useState()

  const movieList = movies.json
  const castList = casts.json
  const genreList = genres.json

  const handleDelete = async() => {
    delete deleteInfo.title
    const response = await fetch('api/deleteMovie',{
      method:'POST',
      body: superjson.stringify(deleteInfo)
    })
    const submitResults = await response.json();
    router.reload(window.location.pathname)
  }

  const handleUpdate = async() => {
    for(var i=0;i<genreArr.length;i++){
      delete genreArr[i].name
    }
    for(var i=0;i<castsArr.length;i++){
      delete castsArr[i].name
      delete castsArr[i].dob
      delete castsArr[i].roles
      delete castsArr[i].overview
      delete castsArr[i].photo
    }
    const submitData = {id:movieid,title:title,overview:overview,releaseDate:releaseDate,duration:duration,category:category,trailer:trailer,poster:poster,casts:castsArr,genres:genreArr}
    const response = await fetch('api/updateMovie',{
      method:'POST',
      body: superjson.stringify(submitData)
    })
    const submitResults = await response.json();
    router.reload(window.location.pathname)
  }

  return (
    <div className="bg-black flex w-full min-h-screen text-white">
      <Head><title>Update Movie Info</title></Head>
      <div className='w-full flex flex-col'>
        <h1 className='text-center text-[2rem]'>Update Movie Info</h1>
        <table className='border-spacing-y-[1px] border-separate table-auto w-[600px] mx-auto text-[1.1rem] rounded-md overflow-hidden p-[1px] bg-red-600 mt-[50px]'>
          <thead>
            <tr className='bg-red-600'>
              <td className='w-[5rem] text-center'>Movie ID</td>
              <td className=''>Movie Name</td>
              <td className='w-[5rem] text-center'>Update</td>
              <td className='w-[5rem] text-center'>Delete</td>
            </tr>
          </thead>
          <tbody>
            {movieList.map((a,index)=>(
              <tr key={a.id} className='bg-black'>
                <td className='text-center'>{index+1}</td>
                <td>{a.title}</td>
                <td><MdOutlineCreate className='text-white m-auto cursor-pointer' onClick={()=>{setShowUpdate(!showUpdate); setTitle(a.title); setOverview(a.overview); setCastsArr(a.casts); setGenreArr(a.genres); setCategory(a.category); setDuration(a.duration); setRealeaseDate(a.release_date); setTrailer(a.trailer); setPoster(a.poster);setMovieId(a.id)}}/></td>
                <td><MdDeleteOutline className='text-white m-auto cursor-pointer' onClick={()=>{setShowDelete(!showDelete);setDeleteInfo({id:a.id,title:a.title})}}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`bg-[#00000090] fixed top-0 w-full h-screen ${showDelete? 'flex':'hidden'}`}>
        <div className='text-white w-[400px] rounded-md p-[20px] bg-black m-auto mt-[50px]'>
          <div className='w-full text-center'><p>Are you sure you want to delete {deleteInfo.title} ?</p></div>
          <div className='justify-between flex w-full mt-[20px]'>
            <button className='bg-red-600 py-[3px] px-[10px] rounded-md ml-[40px]' onClick={()=>{handleDelete();setShowDelete(!showDelete)}}>Delete</button>
            <button className='py-[3px] px-[10px] rounded-md mr-[40px]' onClick={()=>{setShowDelete(!showDelete);}}>Cancel</button>
          </div>
        </div>
      </div>

      <div className={`bg-[#00000090] fixed top-0 w-full h-screen ${showUpdate? 'flex':'hidden'}`}>
        <div className='bg-white flex flex-col h-[80%] overflow-y-auto scroll-hide w-[600px] text-black rounded-md mx-auto mt-[50px] p-[20px]'>
            <h1 className='text-[1.5rem] w-full text-center'>Update {title}</h1>
            
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
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Genre:</td>
                    <td className='flex w-full h-[6rem] flex-col py-[10px]'>
                        <div className='w-full flex p-[10px] flex-wrap'>
                          {genreArr?.map((a)=>(
                            <span key={a.id} className='bg-red-200 rounded-full px-[10px] m-[5px] flex'>{a.name}<MdClose className='m-auto' onClick={(e)=>{
                              var dump = {}
                              for(var i=0;i<genreArr.length;i++){
                                if(genreArr[i].id == a.id){
                                  dump = genreArr.splice(i,1)
                                }
                              }
                              setGenreArr(genreArr)
                              e.currentTarget.parentElement.classList.add('hidden')
                            }}/></span>
                          ))}
                        </div>
                        <div className='flex'>
                            <select onChange={(e)=>{setGenre(JSON.parse(e.target.value))}} className='w-[80%] bg-transparent outline-none border-[1px] rounded-sm px-[5px]'>
                              <option defaultValue={0}>Genre</option>
                              {genreList?.map((a)=>(
                                <option key={a.id} value={JSON.stringify(a)}>{a.name}</option>
                              ))}
                            </select>
                            <MdAddCircleOutline className='text-black text-[1.75rem] m-auto' onClick={() => {setGenreArr(genreArr=>([...genreArr,genre]))}}/>
                        </div> 
                    </td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Cast:</td>
                    <td className='flex w-full h-[6rem] flex-col py-[10px]'>
                        <div className='w-full flex p-[10px] flex-wrap'>
                          {castsArr?.map((a)=>(
                            <span key={a.id} className='bg-red-200 rounded-full px-[10px] m-[5px] flex'>{a.name}<MdClose className='m-auto' onClick={(e)=>{
                              var dump = {}
                              for(var i=0;i<castsArr.length;i++){
                                if(castsArr[i].id == a.id){
                                  dump = castsArr.splice(i,1)
                                }
                              }
                              setCastsArr(castsArr)
                              e.currentTarget.parentElement.classList.add('hidden')
                            }}/></span>
                          ))}
                        </div>
                        <div className='flex'>
                            <select onChange={(e)=>{setCast(JSON.parse(e.target.value))}} className='w-[80%] bg-transparent outline-none border-[1px] rounded-sm px-[5px]'>
                              <option defaultValue={0}>Cast</option>
                              {castList?.map((a)=>(
                                <option key={a.id} value={JSON.stringify(a)}>{a.name}</option>
                              ))}
                            </select>
                            <MdAddCircleOutline className='text-black text-[1.75rem] m-auto' onClick={() => {setCastsArr(castsArr=>([...castsArr,cast]))}}/>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className='mt-[50px] w-full justify-between flex'>
              <button className='bg-red-600 py-[3px] px-[10px] rounded-md ml-[100px] text-white' onClick={()=>{handleUpdate();setShowUpdate(!showUpdate)}}>Submit</button>
              <button className='py-[3px] px-[10px] rounded-md mr-[100px]' onClick={()=>{setShowUpdate(!showUpdate)}}>Cancel</button>
            </div>

        </div>
      </div>

    </div>
  )
}
