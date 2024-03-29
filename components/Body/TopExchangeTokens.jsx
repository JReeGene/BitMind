import React, {useContext, useEffect, useState} from 'react';
import { FaRegCopy} from 'react-icons/fa6'
import toast from 'react-hot-toast';

//INTERNAL IMPORTS
import { Footer } from '../index';
import { CONTEXT } from '../../context/context';

const TopExchangeTokens = () => {
  //Notifications
  const notifyError = (msg)=> toast.error(msg, 
    {duration: 2000});
  const notifySuccess = (msg)=> toast.success(msg, 
    {duration: 2000});

  const { topTokens } = useContext(CONTEXT);

  //STATE VARIABLES
  const [search, setSearch] = useState('');
  const [searchItem, setSearchItem] = useState(search);
  const [tokens, setTokens] = useState(topTokens);
  const [copyTokens, setCopyTokens] = useState(topTokens);

  const onHandleSearch = (value)=>{
    const filterTokens = tokens?.filter(({name})=>
      name.toLowerCase().includes(value.toLowerCase())
      );
      if(filterTokens?.length ===0){
        setTokens(copyTokens);
      }else{
        setTokens(filterTokens)
      };
    };

  const onClearSearch = ()=>{
    if(tokens?.length && copyTokens?.length){
      setTokens(copyTokens);
    }
  };

  useEffect(()=>{
    const timer = setTimeout(()=>setSearch
    (searchItem), 1000);
    return ()=> clearTimeout(timer);
  }, [searchItem]);

  useEffect(()=>{
    if(search){
      onHandleSearch(search)
    }else{
      onClearSearch();
    }
  }, [search]);
 

  return (
    <div className='bitmind_fn_content'>
      <div className='bitmind_fn_page'>
        <div className='bitmind_fn_comunity_page'>
          <div className='fn__title_holder'>
            <div className='container'>
              <div className='title'>Top 20 Exchange Tokens</div>
            </div>
          </div>
          <div className='bitmind_fn_feed'>
            <div className='container'>
              <div className='feed__filter'>
                <div className='filter__search'>
                  <input 
                    type="text" 
                    placeholder='Search token'
                    onChange={(e)=> setSearchItem
                    (e.target.value)}
                    value={searchItem}
                    />
                    <a className='bitmind_fn_button'>
                      <span>Search</span>
                    </a>
                </div>
              </div>
            </div>
            <div className='bitmind_fn_pricing'>
              <div className='container'>
                <div className='pricing__tabs'>
                  <div className='pricing__tab active'>
                    {/* MOBILE */}
                    <div className='fn__mobile_pricing'>
                      <div className='pricing__item'>
                        <div className='pricing__item_holder'>
                          <div className='pricing__item__heading'>
                            <h2 className='title'>Top 20 tokens (Volume in USD)</h2>                        
                          </div>                         
                            <h6 style={{fontSize: '10px'}}>Real-time data streamed from UniSwap...</h6>
                          <div className='pricing__item_list'>
                            {
                              tokens?.map((token, index)=>(
                                <div 
                                  className='pricing__item_list_item' 
                                  key={index}
                                  >
                                  <h4 
                                    onClick={()=>{
                                      navigator.
                                      clipboard.
                                      writeText(token.id)
                                      notifySuccess('Token address copied to clipboard')                                
                                    }}
                                    className='title'
                                  >
                                    {token.name} &nbsp; &nbsp;
                                    <FaRegCopy/>
                                  </h4>
                                    <p className='desc'>
                                      {Math.trunc(token.volumeUSD).toLocaleString()}
                                    </p>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* DESKTOP */}
                    <div className='pricing__content'>
                      <div className='pricing__heading'>
                        <div className='item'>
                          <span className='title'>
                            Top 20 Tokens
                          </span>
                        </div>
                        <div className='item wide'></div>
                      </div>
                      <div className='pricing__fields'>
                        {
                          tokens?.map((token, 
                            index)=>(
                            <div className= 'item_row'>
                                <div onClick={()=>{                    
                                  navigator.
                                  clipboard.
                                  writeText(token.id)
                                  notifySuccess('Token address copied to clipboard')                                   
                                  }}
                                  className='item_col'
                                  >
                                <span className='heading_text'>
                                  {token.name.
                                  slice(0, 17)}
                                  &nbsp; &nbsp;
                                  <FaRegCopy/>
                                </span>
                              </div>
                              <div className='item_col'>
                                <span className='option_text'>
                                {Math.trunc(token.volumeUSD).toLocaleString()}
                                </span>
                              </div>
                              <div className='item_col'>
                                <span className='option_text'>
                                  {Math.trunc(token.totalValueLocked).toLocaleString().slice(0, 12)}
                                </span>
                              </div>
                              <div className='item_col'>
                                <span className='option_text'>
                                  {token.symbol}
                                </span>
                              </div>
                            </div>
                        ))}           
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

export default TopExchangeTokens