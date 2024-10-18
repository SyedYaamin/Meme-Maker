import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FiUpload } from "react-icons/fi";
import MemeImage from "./public/Assets/Meme Maker.jpg"


const App = () => {
  return (
    <>
      <div className='w-full min-h-[90vh] flex justify-center items-center'>
        <div className='w-full max-w-[50%] min-h-[90vh] flex flex-col justify-center items-start px-20'>
          <h1 className='text-6xl font-bold text-start'>Meme Generator</h1>
          <p className='text-lg text-start font-medium mt-3'>Make memes from images and videos in just a few clicks</p>
          <button className='rounded-xl p-3 text-2xl font-semibold mt-5 text-white bg-purple'>
            <Link className='flex justify-center items-center gap-2' href={'Templates'}>
              <span className='font-extrabold'>
                <FiUpload />
              </span>
              Create a Meme
            </Link>
          </button>
        </div>
        <div className='w-full max-w-[50%] min-h-[90vh] flex justify-center items-center'>
          <div className='max-w-[500px] max-h-[500px] rounded-full'>
            <Image
            className='rounded-full'
              src={MemeImage}
              alt="Meme Maker"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App