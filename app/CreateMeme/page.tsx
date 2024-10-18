"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { FiUpload } from 'react-icons/fi';


const CreateMeme = ({ searchParams }: { searchParams: { id: string, url: string, name: string, box: number } }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Generating Meme and setting the url into State
  const [meme, setMeme] = useState<string>('');

  // loading Stage
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);

  // Changing the Data type of Box Count from String to Number
  const boxCount = Number(searchParams.box);
  
  // Pushes the Box Count Value into Array to Implement forEach
  const boxArray = Array.from({ length: boxCount });
  
  
  // Function to Generate Meme
  const createMeme = async (data: any) => {
    const inputValues = Object.values(data);
    reset();
    setIsLoading(true);

    try {
      // Setting the API according to the Box Count
      let queryParams = '';
      inputValues.forEach((text, index) => {
        queryParams += `&text${index}=${text}`;
      });
      console.log(queryParams);
      
      // Calling API
      const memesData = await fetch(`https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=SyedYaamin12&password=syed@1234${queryParams}`, {
        method: 'POST'
      })
      const response = await memesData.json();
      console.log(response.data.url);
      setMeme(response.data.url);
      setDisplay(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const Download = () => {
    if (meme) {
      window.open(meme, '_blank');
    }
  }

  useEffect(() => {
    setIsLoading(false);
    setDisplay(false);
  }, []);

  return (
    <>
      <div className='max-w-[100vw] min-h-[100vh]'>
        <h1 className='text-center text-5xl mt-5 font-bold'>Create Meme</h1>
        <div className='flex flex-col justify-center items-center mt-10'>
          <div className='flex flex-col justify-center items-center min-w-[350px] min-h-[350px]'>
            <div className='w-full h-full'>
              <Image className='h-full w-full object-contain' width={300} height={300} src={searchParams.url} alt='Meme Template' />
            </div>
            <h1 className='text-5xl font-bold mt-5'>{searchParams.name}</h1>
            <form className='flex flex-col w-full h-full mt-5 p-3' onSubmit={handleSubmit(createMeme)}>
              {boxArray.map((_, index) => (
                <input
                  key={index} type="text" placeholder={`Enter Text ${index}`} className='p-3 rounded-2xl mt-2 text-xl outline-none' {...register(`text${index}`, { required: true })}
                />
              ))}
              <button type='submit' className='flex justify-center items-center rounded-xl p-2 text-xl gap-2 text-center font-semibold mt-5 text-white bg-purple'>
                <span className='font-extrabold'>
                  <FiUpload />
                </span>
                Create a Meme
              </button>
            </form>
          </div>
          {isloading ? (<span className="loading loading-spinner loading-lg"></span>) : (
            <div className={display ? "flex flex-col justify-center items-center mt-5" : "hidden"}>
              <div className='min-w-[350px] min-h-[350px] mt-10'>
                <Image className='h-full w-full object-cover' width={300} height={300} src={meme} alt='Generated Meme' />
              </div>
              <button onClick={Download} className='flex justify-center items-center rounded-xl p-2 text-xl gap-2 text-center font-semibold my-5 text-white bg-purple'>
                <span className='font-extrabold'>
                  <FiUpload />
                </span>
                Download Meme
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CreateMeme;