"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";


const Navbar = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="navbar bg-purple bg-fixed flex justify-between items-center lg:px-10 xl:px-20">
                <div>
                    <Link className="btn btn-ghost text-xl lg:text-2xl font-bold text-white" href={"/"}>Meme Maker</Link>
                </div>
                <div className='hidden lg:block'>
                    <ul className='flex justify-center items-center gap-5 cursor-pointer text-white'>
                        <li className='px-4 py-2 btn btn-ghost text-xl font-medium text-center hover:rounded-xl'>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li className='px-4 py-2 btn btn-ghost text-xl font-medium text-center hover:rounded-xl'>
                            <Link href={"/Templates"}>Templates</Link>
                        </li>
                    </ul>
                </div>
                <div onClick={() => setOpen(!open)} className='text-2xl btn btn-ghost lg:hidden'>
                    <FaBars />
                </div>
            </div>
            <div className={`${open ? "bg-purple w-full text-center text-white rounded-sm block" : "hidden"}`}>
                <ul className='flex flex-col justify-center items-center cursor-pointer '>
                    <li className='px-4 py-2 btn btn-ghost text-xl font-medium text-center hover:rounded-xl mt-2'>
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li className='px-4 py-2 btn btn-ghost text-xl font-medium text-center hover:rounded-xl mt-2'>
                        <Link href={"/Templates"}>Templates</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Navbar