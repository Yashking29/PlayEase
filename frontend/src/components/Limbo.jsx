import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Limbo() {
    const [amount, setAmount] = useState('');
    const [val, setVal] = useState(1.00);
    const [winning, setWinning] = useState('');
    const [target, setTarget] = useState('');
    const [wallet,setWallet] =useState(100);
    const [color,setColor] = useState('text-black');

    // const targetValue = 100; // This should come from the backend
    const [value, setValue] = useState(1.00);
    let increment = 0.01;

    useEffect(()=>{

       setValue(1);


    },[val])
     
    useEffect(() => {
        const interval =  setInterval(() => {
            
            if(value>=val && value < target){
                setColor('text-red-500');

            }else if(value < val) {
                
                if (value >= target) {
                  
                    setColor('text-green-500');
                }

                console.log(1);
                if(val<5) increment = 0.03;
                else if(val>=5 && val<=10) increment = 0.10;
                else if(val>10 && val<20) increment = 0.20;
                else if(val>=20 && val<30) increment = 0.30;
                else if(val>=30 && val<40) increment = 0.40;
                else if(val>=40 && val<50) increment = 0.50;
                else if(val>=50) increment = 1.01;
                setValue(prevValue => prevValue + increment);
               
              
            } else {
                
                clearInterval(interval);
            }
        }, 0.1);

        return () => {
            clearInterval(interval);
        } 

    }, [value,val]);







    function handle0_5x() {
        setAmount(prevAmount => (prevAmount * 0.5).toFixed(2));
    }

    function handle2x() {
        setAmount(prevAmount => (prevAmount * 2).toFixed(2));
    }

    function handleInput(e) {
        setAmount(e.target.value);
    }

    function handletarget(e) {
        setTarget(e.target.value);
    }

   



    const handlebet = async () => {
        try {
            const response = await axios.get("http://localhost:3000/");
            const val = response.data.data;
            setColor('text-black');
            if(wallet>=amount){
                setWallet(prev=>prev-amount);
            }else{
                alert('amount is not present');
                return ;
            }
       
            setVal(val);

            

       


            if (val >= target) {
                setWinning((amount * target).toFixed(2));
                setWallet(prev=>prev+amount*target);
               
            } else {
                setWinning('0.00');
            }
        } catch (error) {
            console.log(error);
        }
    }

   
   
   // Adjust the increment to control the speed of the change

    // useEffect(() => {
    //     // Only start the interval if the current value is less than the target value
       
    //   }, [currentValue, display]);




    return (
        <>
         <div className='flex justify-center items-center bg-gray-900'><input type="number" value={wallet} name="" id=""  className='border-2'/><p className='text-white ml-4'>Wallet</p>
         </div>
        <div className='flex justify-center items-center h-screen bg-gray-700'>
            
            <div className='bg-gray-900 p-8 rounded-lg shadow-md w-120'>
                <h1 className='text-2xl mb-4 text-white'>Limbo Game</h1>
                <div className='flex gap-8'>
                    <div>
                        <label className='block mb-1 text-white'>Bet Amount</label>
                        <div className='flex items-center mb-4'>
                            <input 
                                onChange={handleInput} 
                                type="number" 
                                value={amount} 
                                className='border rounded px-2 py-1 mr-2 w-32'
                                placeholder='0.00' 
                            />
                            <div className='flex '>
                                <button 
                                    onClick={handle0_5x} 
                                    className='text-white border rounded mr-2 hover:bg-gray-700 p-1'
                                >
                                    0.5x
                                </button>
                                <button 
                                    onClick={handle2x} 
                                    className='text-white border rounded  hover:bg-gray-700 p-2'
                                >
                                    2x
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className='text-white block mb-1'>Profit or Win</label>
                            <input 
                                type="text"
                           
                                value={winning} 
                                className='border rounded px-2 py-1 w-32'
                                placeholder='0.00' 
                                readOnly 
                            />
                        </div>
                        <button 
                            className='mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-400 w-[150px]'
                            onClick={handlebet}
                        >
                            Bet
                        </button>
                    </div>
                    <div>
                        <h1 className={`h-32 flex items-center justify-center text-5xl ${color} mb-4 bg-gray-200 rounded`}> {value.toFixed(2)} </h1>
                        <div className='flex gap-4'>
                            <div>
                                <label className='text-white block mb-1'>Target</label>
                                <input 
                                    onChange={handletarget} 
                                    type="number" 
                                    className='border rounded px-2 py-1 w-32'
                                    placeholder='0.00' 
                                />
                            </div>
                            <div>
                                <label className='text-white block mb-1'>Win Chance</label>
                                <input 
                                    type="text" 
                                    value={(99 / target).toFixed(3) + ' %'} 
                                    className='border rounded px-2 py-1 w-32'
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Limbo;
