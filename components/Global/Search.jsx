import React from 'react'

const Search = () => {
  return <div className='techwave_fn_searchbar'>
      <div className='search__bar'>
        <input type="text" 
        className='search__input'
        placeholder='Search here...'
        />
        <img src="img/lighticon/light-5.png" 
          alt="" 
          className='fn__svg search__icon' 
        />
        <span className='search__closer'>
          <img src="img/lighticon/light-18.png" 
          className="fn__svg"
          alt="" />
        </span>
      </div>
      <div className='search__results'>
        <div className='results_title'>Results</div>
        <div className='results__list'>
          <ul>
            <li>
              <a href="#">Artificial Intelligence</a>
            </li>
            <li>
              <a href="#">Learn about the impact of AI crypto trading bot</a>
            </li>
            <li>
              <a href="#">Welcome to BitMind developer guide </a>
            </li>
            <li>
              <a href="#">Take the blocakchain advanced developer course Intelligence</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
}

export default Search