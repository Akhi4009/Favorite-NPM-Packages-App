import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../component/Home/Home'
import AddFavorite from '../component/AddFav/AddFavorite'
import Favorite from '../component/Favorite/Favorite'

const AllRoute = () => {
  return (
    <>
    <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/add'element={<AddFavorite/>}/>
        <Route path='/fav'element={<Favorite/>}/>
    </Routes>
    </>
  )
}

export default AllRoute