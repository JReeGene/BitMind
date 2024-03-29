import React from 'react'

const Footer = (setActiveComponent, axios) => {
  return (
    <footer className='bitmind_fn_footer'>
      <div className='bitmind_fn_footer_content'>
        <div className='copyright'>
        <p>2024@BitMind</p>
        </div>
        <div className='menu_items'>
          <ul>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>            
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer