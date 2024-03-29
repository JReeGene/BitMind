import React, { useState, useEffect } from 'react';
import { FaRegCopy } from 'react-icons/fa6';
import toast from 'react-hot-toast';

//INTERNAL IMPORTS
import {shortenAddress} from '../../utils/index';
import Footer from '../Global/Footer';

const Trading = ({
  trading,
  tradingCount ,
  length,
  setTradingCount,
  setActiveComponent, 
  notifySuccess,
  notifyError,
}) => {
  const [activeNetwork, setActiveNetwork] = useState({});
  const [tokens, setTokens] = useState();
  const [tradeToken, setTradeToken] = useState({});
  const [active, setActive] = useState(false);
  const [liveTransaction, setLiveTransaction] = useState([]);
  const [userMembership, setUserMembership] = useState();

  // const tradeFrequency = 3600 * 1000; //EVERY HOUR
  const tradeFrequency = 3000; //EVERY 3 sec

  useEffect(()=>{
    const tokenLists = JSON.parse(localStorage.getItem('setTokens'));
    const active = JSON.parse(localStorage.getItem('activeNetwork'));
    const tokenPair = JSON.parse(localStorage.getItem('tokenPair'));
    const user = localStorage.getItem('USER_MEMBERSHIP');

    setUserMembership(user);
    setActiveNetwork(active);
    setTokens(tokenLists);
    setTradeToken(tokenPair);
  }, []);

  const selectTokenPair = ()=>{
    localStorage.setItem('tokenPair', JSON.stringify(tradeToken))
  };    

  useEffect(()=>{    
    if(active){
      const yourFunction = () => {
        trading(activeNetwork, tradeToken);
        notifySuccess('Transaction completed...');
        console.log('Function called every 1 hour');
      };
      const intervalId = setInterval(yourFunction, tradeFrequency);
      return () => clearInterval(intervalId);
    }
  }, [active]);

  useEffect(()=>{
    const listTransactions = JSON.parse(localStorage.getItem('LIVE_TRANSACTION'));
    setLiveTransaction(listTransactions);
  }, [tradingCount, length]);

  const stopTrading = ()=>{
    setActive(false);
  }  

  return (
    <div className='bitmind_fn_content'>
      <div className='bitmind_fn_page'>
        <div className='bitmind_fn_user_profile_page'>
          <div className='bitmind_fn_pagetitle'>
            <h2 className='title'>Trading Crypto</h2>
            <div className='container small'>
              <div className='bitmind_fn_user_profile'>
                <div className='user__profile'>
                  <div className='user_avatar'>
                    <img src={activeNetwork?.image || 'img/light-logo.png' } alt="" />                    
                  </div>
                  <div className='user_details new_hide'>
                    <ul>
                      <li>
                        <div className='item'>
                          <h4 className='subtitle'>Network</h4>
                          <h3 className='title'>
                            {activeNetwork?.networkName || 'Select Network'}
                          </h3>
                        </div>
                      </li>
                      <li>
                        <div className='item'>
                          <h4 className='subtitle'>Address</h4>
                          <h3 
                            className='title'>
                            {activeNetwork?.walletAddress == undefined ? 
                            'Select Address' : shortenAddress(activeNetwork.walletAddress)}
                            <span onClick={()=>
                              navigator.clipboard.writeText
                              (activeNetwork?.walletAddress)}>
                                <FaRegCopy />
                            </span>
                          </h3>
                        </div>
                      </li>
                      <li>
                        <div className='item'>
                          <h4 className='subtitle'>Private Key</h4>
                          <h3 
                            className='title'>
                            {activeNetwork?.privateKey == undefined ? 
                            'Select Address' : shortenAddress(activeNetwork.privateKey)}
                            <span onClick={()=>
                              navigator.clipboard.writeText
                              (activeNetwork?.privateKey)}>
                                <FaRegCopy />
                            </span>
                          </h3>
                        </div>
                      </li>
                      <li>
                        <div className='item'>
                          <h4 className='subtitle'>RPC URL</h4>
                          <h3 
                            className='title'>
                            {activeNetwork?.rpcUrl == undefined ? 
                            'Select Address' : shortenAddress(activeNetwork.rpcUrl)}
                            <span onClick={()=>
                              navigator.clipboard.writeText
                              (activeNetwork?.rpcUrl)}>
                                <FaRegCopy />
                            </span>
                          </h3>
                        </div>
                      </li>                      
                    </ul>
                  </div>
                </div>
                <div className='user__plan'>
                  <div className='plan_left'>
                    <h4 className='subtitle'>Token A</h4>
                    <p className='info'>{tradeToken?.token1}</p>
                  </div>
                  <div className='plan_left'>
                    <h4 className='subtitle'>Token B</h4>
                    <p className='info'>{tradeToken?.token2}</p>
                  </div>
                  <div className='plan_left'>
                    <h4 className='subtitle'>Fee</h4>
                    <p className='info'>{tradeToken?.fee}</p>
                  </div>
                  <div className='plan_left'>
                    <h4 className='subtitle'>Network</h4>
                    <p className='info'>{tradeToken?.network}</p>
                  </div>
                </div>
                <div>
                  {
                    userMembership == 'notMember' ? (//Switch Subscriptions...
                      <>
                        {
                          active ? (
                          <a 
                            onClick={()=> stopTrading()}
                              className='bitmind_fn_button'>
                              Stop Bot
                          </a>
                          ) : (
                          <a 
                            onClick={()=>( 
                              trading(activeNetwork, tradeToken), 
                              setActive(true))
                            }
                              // notifySuccess('Transaction started...')
                                                    
                              className='bitmind_fn_button'
                            >
                            Start Trading
                          </a>
                        )}                        
                      </>
                        ):(
                          <a 
                            onClick={()=>setActiveComponent('Pricing')}
                            className='bitmind_fn_button'
                            >
                            Buy Membership
                          </a>
                        )}
                </div>
              </div>
            </div>
            <div className='bitmind_fn_pricing'>
              <div className='container'>
                <div className='pricing__tabs'>
                  <div className='pricing__tab active'>
                    {/* MOBILE */}
                    {
                      liveTransaction == null ? (
                        ''
                      ) : (
                        <div className='fn__mobile_pricing'>
                          <div className='pricing__item'>
                            <div className='pricing__item_holder'>
                              <div className='pricing__item__heading'>
                                <h2 className='title'>Live Transaction...</h2>
                              </div>
                              {
                                liveTransaction?.map((transaction, index)=>(
                                  <div key={index} className='pricing__item_list'>
                                    <div className='pricing__item_list_item'>
                                      <h4 className='title'>
                                        {index + 1}. T_Amt: 
                                        {transaction.targetRate}
                                      </h4>
                                      <p 
                                        className='desc'>
                                          C_Amt: 
                                        {transaction.currentRate}
                                        {''}
                                      </p>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      )}
                      {
                        liveTransaction == null ? (
                          ''
                        ) : (
                          <div className='pricing__content'>
                            <div className='pricing__heading'>
                              <div className='item'>
                                <span className='title'>
                                  Live Transaction...
                                </span>
                              </div>
                              <div className='item wide'></div>
                              {
                                liveTransaction?.map((transaction, index)=>(
                                  <div key={index} className='pricing__fields'>
                                    <div className='new_flex'>
                                      <div className='item_col'>
                                        <span className='heading_text'>
                                          {index + 1}. T_Amount: 
                                          {transaction.targetRate}
                                        </span>
                                      </div>
                                      <div className='item_col'>
                                        <span className='option_text'>
                                          {index + 1}. C_Amount: 
                                          {transaction.currentRate}
                                        </span>
                                      </div>
                                      <div className='item_col'>
                                        <span 
                                          onClick = {()=> 
                                            navigator.clipboard.writeText
                                            (transaction.transactionHash)} 
                                            className='option_text'>
                                            {index + 1}. Hash: {transaction.transactionHash}
                                            <FaRegCopy/>
                                        </span>
                                      </div>                                      
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    </div>
  );
}

export default Trading