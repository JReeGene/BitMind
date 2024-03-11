import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

//INTERNAL IMPORTS
import { Header, 
        Footer, 
        Loader, 
        Login, 
        MovingSubmenu, 
        Preloader, 
        Search,  
        Sidebar, 
        Signup, 
        UseTimeout, 
        Home, 
        TradeTokens, 
        TopExchangeTokens, 
        Networks, 
        AddNetwork,  
        Price,  
        Profile, 
        Setting, 
        AddTokenPair, 
        Trading,
} from '../components/index';
import { CONTEXT } from '../context/context';

const index = ()=>{
  const { TRADING_BOT,
          topTokens,
          trading,
          tradingCount,
          length,
          setTradingCount,
          setLoader,
          loader, } = useContext(CONTEXT)

  //STATE VARIABLES
  const [activeComponent, setActiveComponent] = useState('Home');
  const [membershipType, setMembershipType] = useState('Premium');
  const [authBackEndID, setAuthBackEndID] = useState('');
  const [Networks, setNetworks] = useState({});
  const [networkName, setNetworkName] = useState();

  //NOTIFICATIONS
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  const notifySuccess= (msg) => toast.success(msg, { duration: 2000 });
  return (
      <div>
          <MovingSubmenu />
          <Preloader />
          {
          activeComponent == 'Signup' ? (
          <Signup 
            axios= {axios} 
            setActiveComponent= {setActiveComponent} 
            notifyError= {notifyError}
            notifySuccess= {notifySuccess}
            />
          ):(
          <div className='techwave_fn_wrapper'>
            <div className='techwave_fn_wrap'>
              <Search />
              <Header networkName={networkName}
                setActiveComponent={setActiveComponent}
              />
              <Sidebar setActiveComponent=
                {setActiveComponent}/>

                {
                  activeComponent == 'Home' ? (<Home/>) : 
                  activeComponent == 'Trade Tokens' ? (<TradeTokens/>) : 
                  activeComponent == 'Top Exchange Tokens' ? (<TopExchangeTokens/>) : 
                  activeComponent == 'Networks' ? (<Networks networkName={networkName} setNetworkName={setNetworkName}/>) : 
                  activeComponent == 'Add Network' ? (<AddNetwork axios= {axios} />): 
                  activeComponent == 'Trading' ? (<Trading 
                                                    axios={axios} 
                                                    trading={trading}
                                                    tradingCount={tradingCount}
                                                    length={length}
                                                    setTradingCount={setTradingCount}
                                                    setActiveComponent={setActiveComponent}
                                                    />): 
                  activeComponent == 'Pricing' ? (<Price />): 
                  activeComponent == 'Profile' ?(<Profile setActiveComponent={setActiveComponent} />) : 
                  activeComponent == 'Setting' ? (<Setting notifyError={notifyError}
                                              notifySuccess={notifySuccess} axios = {axios} />) : 
                  activeComponent == 'Add Token Pair' ? (<AddTokenPair />) : 
                  ('')
               }
            </div>
          </div>
          )}
            {
              activeComponent == 'Login' ? (
                <Login setActiveComponent={setActiveComponent} axios={axios}
                notifyError={notifyError}
                notifySuccess={notifySuccess} 
                
                />
              ) : (
               ''
              )
            }
      </div>
  );
};

export default index
