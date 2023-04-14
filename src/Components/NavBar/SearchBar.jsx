
import React from 'react'
import SearchBtn from '../../assets/icons/SearchBtn.svg'
import '../../styles/NavBar/NavBar.css'
const SearchBar = () => {
  return (
<>
<form className='search-bar'>
    <input type="text" placeholder='What are you looking for?'/>
    <button type='submit'><img src={SearchBtn} alt="search" /></button>
</form>
</>
  )
}

export default SearchBar