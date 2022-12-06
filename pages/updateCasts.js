import Head from 'next/head'
import { useState } from "react"
import { useRouter } from 'next/router'

import {prisma} from '../libs/prisma'
import superjson from 'superjson'
import {MdOutlineCreate,MdDeleteOutline,MdAddCircleOutline,MdClose} from 'react-icons/md'

export async function getServerSideProps() {
  const Casts = superjson.serialize(await prisma.cast.findMany())
  return {
    props:{
      casts: Casts
    },
  }
}

export default function updateCasts({casts}) {
  const router = useRouter()

  const [showDelete,setShowDelete] = useState(false)
  const [showUpdate,setShowUpdate] = useState(false)

  const [deleteInfo,setDeleteInfo] = useState({id:0,name:""})

  const [castID,setCastId] = useState()
  const [name,setName] = useState("")
  const [overview,setOverview] = useState("")
  const [photo,setPhoto] = useState("")
  const [dob,setDOB] = useState("")
  const [role,setRole] = useState("")
  const [roles,setRoles] = useState([])

  const castList = casts.json

  const handleDelete = async() => {
    delete deleteInfo.name
    const response = await fetch('api/delete',{
      method:'POST',
      body: superjson.stringify(deleteInfo)
    })
    const submitResults = await response.json();
    router.reload(window.location.pathname)
  }

  const handleUpdate = async() => {
    const submitData = {id:castID,name:name,photo:photo,overview:overview,dob:dob,roles:roles}
    const response = await fetch('api/updateCast',{
      method:'POST',
      body: superjson.stringify(submitData)
    })
    const submitResults = await response.json();
    router.reload(window.location.pathname)
  }

  return (
    <div className="bg-black flex w-full min-h-screen text-white">
      <Head><title>Update Cast Info</title></Head>
      <div className='w-full flex flex-col'>
        <h1 className='text-center text-[2rem]'>Update Cast Info</h1>
        <table className='border-spacing-y-[1px] border-separate table-auto w-[600px] mx-auto text-[1.1rem] rounded-md overflow-hidden p-[1px] bg-red-600 mt-[50px]'>
          <thead>
            <tr className='bg-red-600'>
              <td className='w-[5rem] text-center'>Sl.No.</td>
              <td className=''>Cast Name</td>
              <td className='w-[5rem] text-center'>Update</td>
              <td className='w-[5rem] text-center'>Delete</td>
            </tr>
          </thead>
          <tbody>
            {castList?.map((a,index)=>(
              <tr key={a.id} className='bg-black'>
                <td className='text-center'>{index+1}</td>
                <td>{a.name}</td>
                <td><MdOutlineCreate className='text-white m-auto cursor-pointer' onClick={()=>{setShowUpdate(!showUpdate); setName(a.name); setOverview(a.overview); setRoles(a.roles); setDOB(a.dob); setPhoto(a.photo);setCastId(a.id)}}/></td>
                <td><MdDeleteOutline className='text-white m-auto cursor-pointer' onClick={()=>{setShowDelete(!showDelete);setDeleteInfo({id:a.id,name:a.name})}}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`bg-[#00000090] fixed top-0 w-full h-screen ${showDelete? 'flex':'hidden'}`}>
        <div className='text-white w-[400px] rounded-md p-[20px] bg-black m-auto mt-[50px]'>
          <div className='w-full text-center'><p>Are you sure you want to delete {deleteInfo.name} ?</p></div>
          <div className='justify-between flex w-full mt-[20px]'>
            <button className='bg-red-600 py-[3px] px-[10px] rounded-md ml-[40px]' onClick={()=>{handleDelete();setShowDelete(!showDelete)}}>Delete</button>
            <button className='py-[3px] px-[10px] rounded-md mr-[40px]' onClick={()=>{setShowDelete(!showDelete);}}>Cancel</button>
          </div>
        </div>
      </div>

      <div className={`bg-[#00000090] fixed top-0 w-full h-screen ${showUpdate? 'flex':'hidden'}`}>
        <div className='bg-white flex flex-col h-[80%] overflow-y-auto scroll-hide w-[600px] text-black rounded-md mx-auto mt-[50px] p-[20px]'>
            <h1 className='text-[1.5rem] w-full text-center'>Update {name}</h1>
            
            <table className='my-[50px]'>
                <tbody>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Name:</td>
                    <td className='flex w-full h-[1.75rem] sm:h-[2rem]'><input type={'text'} onChange={(e)=>{setName(e.target.value)}} value={name} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Overview:</td>
                    <td className='flex w-full h-[8rem]'><textarea onChange={(e)=>{setOverview(e.target.value)}} value={overview} className='w-full h-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Date Of Birth:</td>
                    <td className='flex w-full h-[1.75rem] sm:h-[2rem]'><input type={'text'} onChange={(e)=>{setDOB(e.target.value)}} value={dob} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Photo:</td>
                    <td className='flex w-full h-[1.75rem] sm:h-[2rem]'><input type={'text'} onChange={(e)=>{setPhoto(e.target.value)}} value={photo} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Roles:</td>
                    <td className='flex w-full h-[4rem] flex-col py-[10px]'>
                        <div className='w-full flex p-[10px] flex-wrap'>
                        {roles?.map((a)=>(
                            <span key={a} className='bg-red-200 rounded-full px-[10px] m-[5px] flex text-black'>{a}<MdClose className='m-auto' onClick={(e)=>{
                              var dump = ""
                              for(var i=0;i<roles.length;i++){
                                if(roles[i] == a){
                                  dump =roles.splice(i,1)
                                }
                              }
                              setRoles(roles)
                              e.currentTarget.parentElement.classList.add('hidden')
                            }}/></span>
                          ))}
                        </div>
                        <div className='flex'>
                            <input type={'text'} onChange={(e)=>{setRole(e.target.value)}} value={role} className='w-[80%] bg-transparent outline-none border-[1px] rounded-sm px-[5px]' />
                            <MdAddCircleOutline className='text-black text-[1.75rem] m-auto' onClick={()=>{setRoles(arr=>[...arr,role])}}/>
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
