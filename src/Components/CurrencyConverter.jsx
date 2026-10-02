import React, { useDebugValue, useEffect, useState } from 'react'
import CurrencyImg from '../assets/ExchangeRate.png'
export const CurrencyConverter = () => {
    
    const options = [
  {
    "code": "USD",
    "name": "United States Dollar"
  },
  {
    "code": "EUR",
    "name": "Euro"
  },
  {
    "code": "GBP",
    "name": "British Pound"
  },
  {
    "code": "INR",
    "name": "Indian Rupee"
  },
  {
    "code": "JPY",
    "name": "Japanese Yen"
  },
  {
    "code": "AUD",
    "name": "Australian Dollar"
  },
  {
    "code": "CAD",
    "name": "Canadian Dollar"
  },
  {
    "code": "SGD",
    "name": "Singapore Dollar"
  }
]
const [amount,setAmount] = useState(1);
    const [fromCurrency,setFromCurrency] = useState('USD');
    const [toCurrency,setToCurrency] = useState('INR');
    const [convertedAmount,setConvertedAmount] = useState(null);
    const [exchangeRate,setExchangeRate] = useState(null);
    useEffect(()=>{
        try {
            const calculateExchangeRate = async()=>{
                let url = `https://api.frankfurter.dev/v2/rates?base=${fromCurrency}&quotes=${toCurrency}`
                let response = await fetch(url);
                let data = await response.json();
                // console.log(data[0].rate);
                setExchangeRate(data[0].rate);
                
            }
            calculateExchangeRate();
        } catch (error) {
            console.log(error);
        }
    },[fromCurrency,toCurrency]);
    useEffect(()=>{
        if(exchangeRate!==null)
        {
            setConvertedAmount((amount*exchangeRate).toFixed(2));
        }
    },[amount,exchangeRate])
  return (
    <div className='flex justify-center items-center h-screen bg-gray-800'>
        <div className='text-black w-[568px] bg-white p-10 rounded-lg'>
            <div className='text-center mb-2'>
                <img className='inline-block' width={300} height={300} src={CurrencyImg} alt="Currency Image" />
            </div>
            <h1 className='text-2xl uppercase font-bold p-3 text-blue-500 text-center border-y-4 border-dashed border-[#ccc]'>Currency Converter</h1>
            <div className='my-3'>
                <label htmlFor="amt" className='block mb-2'>Amount:</label>
                <input className='border-2 p-2 outline-0 rounded-lg w-full border-[#ccc] focus:border-blue-500' value={amount} onChange={(e)=>setAmount(isNaN(e.target.value)?0:e.target.value)} placeholder='Enter Amount' type="text" id='amt' />
            </div>
            <div className='my-3'>
                <label htmlFor="fromCurrency" className='block mb-2'>From Currency:</label>
                <select id="fromCurrency" className='border-2 p-2 outline-0 rounded-lg w-full border-[#ccc] focus:border-blue-500' value={fromCurrency} onChange={(e)=>setFromCurrency(e.target.value)}>
                    {options.map((data)=>(<option key={data.code} value={data.code}>{`${data.code} - ${data.name}`}</option>))}
                </select>
            </div>
            <div className='my-3'>
                <label htmlFor="toCurrency" className='block mb-2'>To Currency:</label>
                <select id="toCurrency" className='border-2 p-2 outline-0 rounded-lg w-full border-[#ccc] focus:border-blue-500' value={toCurrency} onChange={(e)=>setToCurrency(e.target.value)}>
                    {options.map((data)=>(<option key={data.code} value={data.code}>{`${data.code} - ${data.name}`}</option>))}
                </select>
            </div>
            <div className='mt-5'>
                <div className='text-2xl text-blue-500 font-bold text-center'>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</div>
            </div>
        </div>
    </div>
  )
}
