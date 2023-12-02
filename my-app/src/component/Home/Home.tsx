import React from 'react'
import Button from '../../custom/Button'
import {useNavigate} from "react-router-dom"


const Home:React.FC = () => {

    const Navigate=useNavigate()

    const handleClick = () => {
        Navigate('/add')
      };
    
  return (
    <>
    <h1 className="text-xl m-20">Welcome to Favorite NPM Packages </h1>
   
    <div className=" flex items-center justify-center  align-middle" >
    <div className="text-center border-2 border-gray p-20 w-8/12">
        <p className="m-5 text-sm">You don't have any favs yet. Please add.</p>
    <Button onClick={handleClick} className="w-28 bg-purple-500 rounded-md p-1 m-1">
        Add fav
    </Button>
    </div>
    </div>
    
     </>
  )
}

export default Home