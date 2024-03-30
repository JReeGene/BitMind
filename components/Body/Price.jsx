import React from 'react'
import Footer from '../Global/Footer'

const Price = ({ buyMembership, setMembershipType }) => {
  return (
    <div className='bitmind_fn_content'>
      <div className='bitmind_fn_page'>
        <div className='bitmind_fn_pricing_page'>
          <div className='bitmind_fn_pricing'>
            <div className='container'>
              <div className='pricing__tabs'>
                <div className='pricing__tab active'>
                  {/* ONLY MOBILE DEVICES */}
                  <div className='fn__mobile_pricing'>                    
                    {/* 1st item */}
                    <div className='pricing__item'>
                      <div className='pricing__item_holder'>
                        <div className='pricing__item__header'>
                          <h2 className='title'>Personal</h2>
                          <h3 className='price'>
                            <span>$10</span>/month
                          </h3>
                          <p className='desc'>
                            billed annually
                            <br />
                            <span>OR</span>
                            <span> $15.00 </span> 
                            billed monthly                          
                          </p>
                          <p className='purchase'>
                            <a className = 'bitmind_fn_button' 
                              onClick={()=>buyMembership('Personal', 0.0001)}>
                                Buy Personal
                            </a>
                          </p>                        
                      </div>
                      <div className='pricing__item__heading'>
                        <h2 className='title'>Main Features</h2>
                      </div>
                      <div className='pricing__item_list'>
                        {['Crypto', 'DH Tokens', 'Running Bot', 'Matic Trading', 'Any Exchange Trade', 'Unlimited Data.' ].map((item, index)=>(
                          <div className='pricing__item_list_item'>
                            <h4 className='title'>{item}</h4>
                            <p className='desc'>20, {index + 1}
                            00</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    </div>
                    {/* 2nd item */}
                    <div className='pricing__item'>
                      <div className='pricing__item_holder'>
                        <div className='popular'>
                          <span>Most Popular</span>
                        </div>
                        <div className='pricing__item__header'>
                          <h2 className='title'>Premium</h2>
                          <h3 className='price'>
                            <span>$15</span>/month
                          </h3>
                          <p className='desc'>billed annually
                          <br />                          
                          <span>OR </span>
                          <span>$20.00</span> billed monthly                          
                          </p>
                          <p className='purchase'>
                            <a className = 'bitmind_fn_button' 
                              onClick={()=>buyMembership('Premium', 0.0001)}>Buy Premium
                            </a>
                          </p>                        
                      </div>
                      <div className='pricing__item__heading'>
                        <h2 className='title'>Main Features</h2>
                      </div>
                      <div className='pricing__item_list'>
                        {['Crypto', 'DH Tokens', 'Running Bot', 'Matic Trading', 'Any Exchange Trade', 'Unlimited Data.' ].map((item, index)=>(
                          <div className='pricing__item_list_item'>
                            <h4 className='title'>{item}</h4>
                            <p className='desc'>20, {index + 1}
                            00</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    </div>
                    {/* 3rd item */}
                    <div className='pricing__item'>
                      <div className='pricing__item_holder'>
                        <div className='pricing__item__header'>
                          <h2 className='title'>Enterprise</h2>
                          <h3 className='price'>
                            <span>$20</span>/month
                          </h3>
                          <p className='desc'>billed annually
                          <br />
                          <span>OR </span>
                          <span>$25.00</span> billed monthly                          
                          </p>
                          <p className='purchase'>
                            <a className = 'bitmind_fn_button' 
                              onClick={()=>buyMembership('Enterprise', 0.0001)}>Buy Enterprise
                            </a>
                          </p>                        
                      </div>
                      <div className='pricing__item__heading'>
                        <h2 className='title'>Main Features</h2>
                      </div>
                      <div className='pricing__item_list'>
                        {['Crypto', 'DH Tokens', 'Running Bot', 'Matic Trading', 'Any Exchange Trade', 'Unlimited Data.' ].map((item, index)=>(
                          <div className='pricing__item_list_item'>
                            <h4 className='title'>{item}</h4>
                            <p className='desc'>20, {index + 1}
                            00</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    </div>
                  </div>
                  {/* FOR DESKTOPS */}
                  <div className='pricing__content'>
                    <div className='pricing__header'>
                      <div className='item_row'>                        
                        <div className='item_col'></div>
                        {/* 1st item */}
                          <div className='item_col'>
                          <h2 className='title'>Personal</h2>
                          <h3 className='price'>
                            <span>$10.00/Month</span>
                          </h3>
                          <p className='desc'>Limited trading
                            <br />
                            <span>$15</span> billed monthly                          
                          </p>                         
                          <p className='purchase'>
                            <a 
                              onClick={()=>buyMembership('Personal', 0.0001)}
                              className='bitmind_fn_button'>
                                Buy Personal
                            </a>
                          </p>
                          </div>
                      
                        {/* 2nd item */}
                        <div className='item_col'>
                          <div className='popular'>
                            <span>Most Popular</span>
                          </div>
                          <h2 className='title'>Premium</h2>
                          <h3 className='price'>
                            <span>$15.00/Month</span>
                          </h3>
                          <p className='desc'>Limited trading
                            <br />
                            <span>$20</span> billed monthly                          
                          </p>                         
                          <p className='purchase'>
                            <a 
                              onClick={()=>buyMembership('Premium', 0.0001)}
                              className='bitmind_fn_button'>
                                Buy Premium
                            </a>
                          </p>
                          </div>
                        {/* 3rd item */}
                        <div className='item_col'>
                          <h2 className='title'>Enterprise</h2>
                          <h3 className='price'>
                            <span>$20.00/Month</span>
                          </h3>
                          <p className='desc'>Limited trading
                            <br />
                            <span>$25</span> billed monthly                          
                          </p>                         
                          <p className='purchase'>
                            <a 
                              onClick={()=>buyMembership('Enterprise', 0.0001)}
                              className='bitmind_fn_button'>
                                Buy Enterprise
                            </a>
                          </p>
                        </div>
                      </div>                           
                      <div className='pricing__heading'>
                        <div className='item'>
                          <span className='title'>Main Features</span>
                        </div>
                        <div className='item wide'></div>                        
                      </div>
                      <div className='pricing__fields'>
                        {
                          [
                            'Crypto', 
                            'DH Tokens', 
                            'Running Bot', 
                            'Matic Trading', 
                            'Any Exchange Trade', 
                            'Unlimited Data.' 
                          ].map
                          (
                            (item, index)=>(
                            <div className='item_row'>
                              <div className='item_col'>
                                <span className='heading_text'>{item}</span>
                              </div>
                              <div className='item_col'>
                                <span className='heading_text'>5, {index + 1}00</span>
                              </div>
                              <div className='item_col'>
                                <span className='heading_text'>5, {index + 4}00</span>
                              </div>
                              <div className='item_col'>
                                <span className='heading_text'>5, {index + 6}00</span>
                              </div>                          
                            </div>
                            )
                          )
                        }
                      </div>                      
                    </div>
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

export default Price