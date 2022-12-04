import Head from 'next/head'
import { useState } from 'react'
import superjson from 'superjson'
import {MdAddCircleOutline} from 'react-icons/md'


export default function addCast() {

    const [name,setName] = useState("")
    const [overview,setOverview] = useState("")
    const [dob,setDob] = useState("")
    const [photo,setPhoto] = useState("")
    const [role,setRole] = useState("")
    const [roles,setRoles] = useState(["actor"])

    const submitData = {name:name,photo:photo,overview:overview,dob:dob.concat("T00:00:00.000Z"),roles:roles}
    const handleSubmit = async() =>{
        const response = await fetch('api/createCast',{
            method:'POST',
            body: superjson.stringify(submitData)
        })
        const submitResults = await response.json();
    }

    const addRoles = () => {

    }


  return (
    <div>
        <Head><title>Add Cast</title></Head>
        <div className='bg-black flex w-full min-h-screen text-white'>
        <div className='flex flex-col mx-auto px-[10px] w-[300px] sm:w-[600px] text-center'>
            <h1 className='text-[2rem] font-bold mt-[100px]'>Add New Cast</h1>

            <table className='my-[50px]'>
                <tbody>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Name:</td>
                    <td className='flex w-full h-[3rem] py-[10px]'><input type={'text'} onChange={(e)=>{setName(e.target.value)}} value={name} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Overview:</td>
                    <td className='flex w-full h-[8rem] py-[10px]'><textarea onChange={(e)=>{setOverview(e.target.value)}} value={overview} className='w-full h-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Date of Birth:</td>
                    <td className='flex w-full h-[3rem] py-[10px]'><input type={'text'} onChange={(e)=>{setDob(e.target.value)}} value={dob} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Photo URL:</td>
                    <td className='flex w-full h-[3rem] py-[10px]'><input type={'text'} onChange={(e)=>{setPhoto(e.target.value)}} value={photo} className='w-full bg-transparent outline-none border-[1px] rounded-sm px-[5px]' /></td>
                </tr>
                <tr className='w-full'>
                    <td className='text-[0.9rem] sm:text-[1.1rem] w-[30%]'>Roles:</td>
                    <td className='flex w-full h-[4rem] flex-col py-[10px]'>
                        <div className='w-full flex p-[10px]'>

                        </div>
                        <div className='flex'>
                            <input type={'text'} onChange={(e)=>{setRole(e.target.value)}} value={role} className='w-[80%] bg-transparent outline-none border-[1px] rounded-sm px-[5px]' />
                            <MdAddCircleOutline className='text-white text-[1.75rem] m-auto' onClick={addRoles}/>
                        </div>
                        
                    </td>
                </tr>
                </tbody>
            </table>
            <div className='w-full flex'><button className='mx-auto py-[5px] px-[10px] bg-red-600 rounded-md text-white' onClick={handleSubmit}>Submit</button></div>
        </div>
        </div>
    </div>
  )
}
