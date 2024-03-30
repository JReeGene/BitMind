import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { network, ethers } from 'ethers';
import toast from 'react-hot-toast'; 

//INTERNAL IMPORTS
import { 
        Header, 
        Footer, 
        Loader, 
        Login, 
        MovingSubmenu, 
        Preloader, 
        Search,  
        SideBar, 
        Signup,    
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
import { set } from 'mongoose';

const index = ()=>{
  const {
      TRADING_BOT, 
      topTokens, 
      trading, 
      tradingCount, 
      length, 
      setTradingCount, 
      setLoader, 
      loader 
    } = useContext(CONTEXT)

  //STATE VARIABLES
  const [activeComponent, setActiveComponent] = useState('Home');
  const [membershipType, setMembershipType] = useState('Premium');
  const [authBackEndID, setAuthBackEndID] = useState('');
  const [networks, setNetworks] = useState({}); //Must be 'networks' 
  const [networkName, setNetworkName] = useState();

  //NOTIFICATIONS
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  const notifySuccess= (msg) => toast.success(msg, { duration: 2000 });

  useEffect(()=>{
    const userBackEndID = localStorage.getItem('CryptoBot_BackEnd');
    const auth = localStorage.getItem('CryptoAUT_TOKEN');
    const network = JSON.parse(localStorage.getItem('activeNetwork'));

    setNetworks(network)
    setNetworkName(network?.networkName);

    if(auth == null || userBackEndID == null){ //Place to CHECK
      setActiveComponent('Home')//Signup
    }else{
      setActiveComponent('Home');//Home
      setAuthBackEndID(userBackEndID);
    }
  }, []);

  ///MEMBERSHIP
  
  const buyMembership = async(memberType, price)=>{
    notifySuccess('Transaction is processing...');
    setMembershipType(memberType);
    setLoader(true);

    const provider = new ethers.JsonRpcProvider(`https://rpc.ankr.com/eth_holesky/a023cadcaf07660bae878ffe8e91e824eb652fbab6f612a341a4c056332b2b48`);
    const wallet = new ethers.Wallet(`0x${networks?.privateKey}`, provider);
    const amountToSend = ethers.parseUnits(price.toString(), 'ether')
    const transaction = {
      to: '0x0510a9895976d797d60E97F275359a87B4aF839f',
      value: amountToSend,
    };

    //SIGN THE TX
    const signedTransaction = await wallet.sendTransaction(transaction);
    const receipt = await signedTransaction.wait();

    console.log(receipt);
    try{
      if(receipt){
        const res = await axios({
          method: 'PATCH',
          url: '/api/v1/user/buyMembership',
          withCredentials: true,
          data: {
            membershipType: memberType,
            userID: authBackEndID
          },
        });
        if(res.statusText == 'OK'){
          localStorage.setItem('USER_MEMBERSHIP', memberType);
          notifySuccess('Welcome to Pro Membership');
          setLoader(false);
          window.location.reload();
        }
      }
    }catch(error){
      console.log(error);
      notifyError('Transaction failed...')
    }
  };
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
            <div className='bitmind_fn_wrapper'> 
              <div className='bitmind_fn_wrap'>
                <Search />
                <Header 
                  networkName={networkName}
                  setActiveComponent={setActiveComponent}/>
                <SideBar 
                  setActiveComponent= {setActiveComponent}/>            
                {
                  activeComponent == 'Home' ? (
                <Home/>) : 
                  activeComponent == 'Trade Tokens' ? (
                <TradeTokens/>) : 
                  activeComponent == 'Top Exchange Tokens' ? (
                <TopExchangeTokens/>) : 

                  activeComponent == 'Networks' ? (
                <Networks                     
                    networkName= {networkName} 
                    setNetworkName= {setNetworkName}
                    notifyError= {notifyError}
                    notifySuccess= {notifySuccess}/>) :  

                  activeComponent == 'Add Network' ? (
                <AddNetwork 
                    axios= {axios} />): 
                         
                  activeComponent == 'Trading' ? (
                <Trading
                    axios={axios}
                    trading={trading}
                    tradingCount={tradingCount}
                    length={length}
                    setTradingCount={setTradingCount}
                    setActiveComponent={setActiveComponent}
                    notifyError= {notifyError}
                    notifySuccess= {notifySuccess}/>): 

                  activeComponent == 'Pricing' ? (
                <Price 
                    buyMembership={buyMembership}
                    setMembershipType={setMembershipType}/>): 

                  activeComponent == 'Profile' ?(
                <Profile 
                    setActiveComponent={setActiveComponent} />) : 

                  activeComponent == 'Setting' ? (
                <Setting 
                    notifyError={notifyError}
                    notifySuccess={notifySuccess} axios = {axios} />) : 

                  activeComponent == 'Add Token Pair' ? (
                <AddTokenPair />) : 
                    ''
                }
              </div>
            </div>
          )
        }
        {
          activeComponent == 'Login' ? (
            <Login 
              setActiveComponent= {setActiveComponent} 
              axios= {axios}
              notifyError= {notifyError}
              notifySuccess= {notifySuccess} 
            />
          ) : (
            ''
          )
        }
        {
          loader && (
            <div className='new_loader'>
              <Loader />
            </div>
          )
        }
      </div>
  );
};

export default index
