import React, {useState, useEffect} from 'react';
import { ethers } from "ethers";
import axios from "axios";

//Internal Import
export const CONTEXT = React.createContext();

export const PROVIDER = ({ children }) => {
    const TRADING_BOT = "Trading Bot";

    const LOAD_INITIAL_DATA = async()=>{
        try{

        }catch(error){
            console.log("nnnn")
        }

    }
    //Buy Tokens
    const buyTokens = async()=>{
        try{

        }catch(error){
            console.log("nnnnnn")
        }
    }
       //Sell Tokens
       const sellTokens = async()=>{
        try{

        }catch(error){
            console.log("nnnnnn")
        }
    }
       //Trade
       const trading = async()=>{
        try{

        }catch(error){
            console.log("nnnnnn")
        }
    };
    return (
        <CONTEXT.Provider 
            value={{
            TRADING_BOT,
            trading,
        }}
        >
            {children}
        </CONTEXT.Provider>
    )

};


