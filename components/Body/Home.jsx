import React from 'react'

//Internal Imports
import {  Footer  } from '../index';

const Home = () => {
  return (
    <div className='bitmind_fn_content'>
      <div className='bitmind_fn_page'>
        <div className='bitmind_fn_home'>
          <div className='section_home'>
            <div className='section_left'>
              <div className='bitmind_fn_title_holder'>
                <h1 className='title'>Automate Your Crypto Trading</h1>

              <p className='desc'>
                Crypto Trading Financial Bot for Buying and Selling Crypto on the Fly!
              </p>
            </div>
         
            <div className='bitmind_fn_interactive_list'>
              <ul>
                <li>
                  <div className='item'>
                    <a>
                      <span className='icon'>
                        <img src="img/lighticon/light-19.png" className='fn__svg'alt="" />
                      </span>
                      <h2 className='title'>Buy Any Token</h2>
                      <p className='desc'>
                        Lorem ipsum dolor, sit amet consectetur 
                        adipisicing elit. Voluptas quidem itaque
                        quos necessitatibus est earum labore dolor 
                        cupiditate dolorem excepturi veniam officia 
                        sit reiciendis, illo, obcaecati nam. 
                        Repellendus, commodi ullam.
                      </p>
                      <span className='arrow'>
                        <img src="img/lighticon/light-22.png" className='fn__svg'alt="" />
                      </span>
                    </a>
                  </div>
                </li>
                <li>
                  <div className='item'>
                    <a>
                      <span className='icon'>
                        <img src="img/lighticon/light-16.png" className='fn__svg'alt="" />
                      </span>
                      <h2 className='title'>Sell Any Token</h2>
                      <p className='desc'>
                        Lorem ipsum dolor, sit amet consectetur 
                        adipisicing elit. Voluptas quidem itaque
                        quos necessitatibus est earum labore dolor 
                        cupiditate dolorem excepturi veniam officia 
                        sit reiciendis, illo, obcaecati nam. 
                        Repellendus, commodi ullam.
                      </p>
                      <span className='arrow'>
                        <img src="img/lighticon/light-22.png" className='fn__svg'alt="" />
                      </span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        
          <div className='section_right'>
            <div className='company_info'>
              <img src="img/light-logo.png" alt="" />
              <p className='fn__animated_text'>
              Lorem ipsum dolor, sit amet consectetur 
              adipisicing elit. Voluptas quidem itaque
              quos necessitatibus est earum labore dolor 
              cupiditate dolorem excepturi veniam officia 
              sit reiciendis, illo, obcaecati nam. 
              Repellendus, commodi ullam.
              </p>
              <hr />
              <div className='fn__members'>
                <div className='active item'>
                  <span className='circle'></span>
                  <span className='text'>1,119 Users Online</span>
                </div>
                <div className='item'>
                  <span className='text'>112,319 Members</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home