import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { ethers } from "ethers";
import toast from "react-hot-toast";

//Internal Import
import { Header, Footer, Loader, Login, MovingSubmenu, Preloader, Search,  
  Sidebar, Signup, UseTimeout, Home, TradeTokens, TopExchangeTokens, 
  Networks, AddNetwork,  Price,  Profile, Setting, AddTokenPair, Trading,
} from "../components/index";
import { CONTEXT } from "../context/context";

const index = () => {
  const { TRADING_BOT} = useContext(CONTEXT);
  return (
      <div>
          <MovingSubmenu/>
          <Preloader/>
      </div>
  );
};

export default index;
