import React, { useState } from 'react';
import axios from 'axios'

function Limbo2() {
    const [amount, setAmount] = useState();
    const [display,setDisplay] = useState(1.00);
    const [winning ,setWinning] =useState();
    const [target,setTarget]=useState();
    



    function handle0_5x() {
        setAmount(prevAmount => prevAmount * 0.5);
    }

    function handle2x() {
        setAmount(prevAmount => prevAmount * 2);
    }

    function handleInput(e) {
        setAmount(parseFloat(e.target.value));
    }

    function handletarget(e){
         setTarget(x=>parseFloat(e.target.value));

        
    }


    const handlebet= async()=>{
       
         try { 
             
             const response = await axios.get("http://localhost:3000/");
             const val=response.data.data;
             setDisplay(response.data.data);
             console.log(target);

             if(val>=target){

                setWinning((amount*target).toFixed(2));
                console.log('Winning');

             }else{
                 setWinning(0);
                 console.log('Losing');
             }

            
          

         } catch (error) {
             

             console.log(error)


         }

           
    }


    return (
        <div className='BigContainer'>
            <div><p>Title</p></div>
            <div className='flex w-[900px] border-2'>
                <div className='w-[255px] ml-[30px] border-2'>
                    <div className="Type"></div>
                    <div className="">
                        <label htmlFor="">Bet Amount</label>
                        <div className='flex'>
                            <input onChange={handleInput} type="number" value={amount} className='border-2' placeholder='0.00'/>
                            <div>
                                <button onClick={handle0_5x} className='border-2 m-[4px]'>0.5x</button>
                                <button onClick={handle2x} className='border-2'>2x</button>
                            </div>
                        </div>
                    </div>
                    <div className="Profit">
                        <label htmlFor="">Profit or Win</label>
                        <br />
                        <input type="text" className='border-2 w-[250px]' value={winning} placeholder='0.00' />
                    </div>
                    <button className='border-2 w-[250px] mt-[10px]' onClick={handlebet}>Bet</button>
                </div>
                <div className='Right ml-[80px] border-2'>
                    <div className='h-[300px] flex justify-center items-center text-[70px]'>{display}</div>
                    <div className="flex">
                        <div className="Target">
                            <label htmlFor="">Target</label>
                            <input onChange={handletarget} type="text" className='border-2' />
                        </div>
                        <div className="WinChance">
                            <label htmlFor="">Win Chance</label>
                            <input type="text" placeholder ='0.00' value={(99/target).toFixed(3)+'  %'} className='border-2' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Limbo2;