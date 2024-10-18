import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiUpload } from 'react-icons/fi'
import loading from '../loading';

interface Meme {
  id: string;
  name: string;
  url: string;
  box_count: string;
}

const Templates = async () => {
  const data = await fetch('https://api.imgflip.com/get_memes');
  const response = await data.json();
  const allMemes = response.data.memes;
  console.log(response.data.memes);
  return (
    <>
      <h1 className='mt-5 text-5xl font-bold text-center'>Choose Templates</h1>
      <div className='mt-5 min-h-[100vh] flex justify-center items-center gap-5 flex-wrap'>
        {allMemes ? allMemes.map((items: Meme) => {
          return (
            <div key={items.id} className='flex flex-col justify-center items-center shadow-md rounded-lg shadow-full shadow-black bg-gray-300 max-w-[300px] max-h-[300px] w-full h-full p-5'>
              <div className='w-full h-[180px]'>
                <Image className='w-full h-full object-contain' width={180} height={180} src={items.url} alt='meme' />
              </div>
              <div className='flex flex-col justify-center items-center'>
                <h1 className='mt-2 text-xl font-semibold'>{items.name}</h1>
                <button className='rounded-xl p-2 text-md font-semibold mt-2 text-white bg-purple'>
                  <Link className='flex justify-center items-center gap-2' href={{
                    pathname: 'CreateMeme',
                    query: {
                      url: items.url,
                      id: items.id,
                      name: items.name,
                      box: parseInt(items.box_count),
                    }
                  }}>
                    <span className='font-extrabold'>
                      <FiUpload />
                    </span>
                    Create a Meme
                  </Link>
                </button>
              </div>
            </div>
          );
        })
          : <div className='h-[100vh] w-full flex justify-center items-center'>
            (loading)
          </div>}
      </div>
    </>
  );
};

export default Templates;
