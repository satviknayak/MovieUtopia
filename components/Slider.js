import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Slider({title , movies}) {
  return (
    <div className='w-full h-fit flex flex-col'>
        <h1 className='text-white text-[1.5rem]'>All Movies</h1>
        <div className='w-full h-[270px] flex overflow-x-auto scroll-hide'>
        {movies?.map((a) => (
            <Link href={'/movies/'+a.id}><div className='flex min-w-[170px] h-[250px] mx-[10px] rounded-2xl overflow-hidden relative hover:scale-[1.1] cursor-pointer transition-all ease-in-out duration-[1s]' key={a.id}>
                <Image src={a.poster} layout='fill' objectFit='cover' objectPosition={'center'} />
            </div></Link>
        ))}
        </div>
    </div>
  )
}
