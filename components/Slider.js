import React from 'react'
import Image from 'next/image'

export default function Slider({title , movies}) {
  return (
    <div className='w-full h-[500px] flex flex-col'>
        <h1 className='text-white text-[1.5rem]'>{title}</h1>
        <div className='w-full h-[350px] flex overflow-x-auto scroll-hide'>
        {movies?.map((a) => (
            <div className='flex min-w-[170px] h-[250px] mx-[10px] rounded-2xl overflow-hidden relative' key={a.id}>
                <Image src={a.poster} layout='fill' objectFit='cover' objectPosition={'center'} />
            </div>
        ))}
        </div>
    </div>
  )
}
