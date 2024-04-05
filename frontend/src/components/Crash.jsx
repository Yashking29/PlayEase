import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Crash() {
    const [amount, setAmount] = useState(0);
    const [val, setVal] = useState(1.00);
    const [winning, setWinning] = useState(0);
    const [target, setTarget] = useState(0);
    const [wallet,setWallet] =useState(100);
    const [color,setColor] = useState('text-white');


    const [value, setValue] = useState(1.00);
    let increment = 0.001;

    useEffect(()=>{

       setValue(1);


    },[val])
     
    useEffect(() => {
        const interval =  setInterval(() => {

            if(value>=val && value<target){
                setColor('text-red-500');
            }else if (value < val) {
                if (value >= target) {
                 
                    setColor('text-green-500');
                }
                
                console.log(1);
                // if(val<5) increment = 0.03;
                // else if(val>=5 && val<=10) increment = 0.10;
                // else if(val>10 && val<20) increment = 0.20;
                // else if(val>=20 && val<30) increment = 0.30;
                // else if(val>=30 && val<40) increment = 0.40;
                // else if(val>=40 && val<50) increment = 0.50;
                // else if(val>=50) increment = 1.01;
                setValue(prevValue => prevValue + increment);
               
              
            } else {
                
                clearInterval(interval);
            }
        }, 0.1);

        return () => {
            clearInterval(interval);
        } 

    }, [value,val]);







    useEffect(() => {
        var canvas = document.getElementById('mycanvas');
        var ctx = canvas.getContext('2d');
      
      // Set black background color
      // ctx.fillStyle = 'black';
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
    
      class Particle {
        constructor() {
             ctx.clearRect(0, 0, canvas.width, canvas.height);
          this.x = 5;
          this.y = 145;
          this.speedX = 0.8; // Initial x speed
          this.speedY = 0.05; // Initial y speed
          this.accX = -0.001; // X acceleration rate
          this.accY = 0.001; // Y acceleration rate
          this.trail = []; // Array to store trail points
        }
    
        update() {
          // Update speeds with acceleration

          if(this.speedX==0){
             this.accX=0.001;
             this.speedY=0;
             this.accY=0;
          }
          this.speedX += this.accX;
          this.speedY += this.accY;
          
          if(value>=val){
             this.speedX=0;
             this.speedY=0;
             this.accX=0;
             this.accY=0;
          }else{
          // Update position
          this.x += this.speedX;
          this.y -= this.speedY;
          this.trail.push({ x: this.x, y: this.y }); // Reverse y-axis for canvas coordinate system
          }
          // Add current position to trail array
          
    
          // Keep trail length limited to 100 points
          // if (this.trail.length > 100) {
          //   this.trail.shift(); // Remove oldest point if trail length exceeds 100
          // }
        }
    
        draw() {
            // Clear canvas
            if(value>=val){
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            

            // Draw trail
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            for (let i = 0; i < this.trail.length; i++) {
              ctx.lineTo(this.trail[i].x, this.trail[i].y);
            }
            ctx.stroke();

            // Draw filled area under the trail
            // ctx.fillStyle = 'yellow';
            // ctx.beginPath();
            // ctx.moveTo(this.x, this.y);
            // for (let i = this.trail.length - 1; i >= 0; i--) {
            //   ctx.lineTo(this.trail[i].x, this.trail[i].y);
            // }
            // ctx.closePath();
            // ctx.fill();

            // Draw line from particle to y-axis in the downward direction
            ctx.strokeStyle = 'orange'; // Set line color
            ctx.beginPath();
            ctx.moveTo(this.x, this.y); // Start from particle's position
            ctx.lineTo(this.x, canvas.height); // Draw line to the bottom of the canvas
            ctx.stroke();

            // Draw particle
            ctx.fillStyle = 'white';
            ctx.lineWidth=3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
          }

        
      }
    
      function animateParticle() {
        let particle = new Particle();
        let startTime = Date.now();
    
        function drawFrame() {
          let elapsedTime = Date.now() - startTime;
    
          particle.update();
          particle.draw();
    
          if (elapsedTime < 8100) {
            requestAnimationFrame(drawFrame);
          }
        }
    
        drawFrame();
      }
    
      animateParticle();
    }, [val]);


    
    

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
            setColor('text-white');
            var canvas = document.getElementById('mycanvas');
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const response = await axios.get("http://localhost:3000/");
            const val = response.data.data;
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

    const handlecashout = (e)=>{
        // e.prventDefaults;
         if(value<val && value < target){
             
              setWallet(prev=>(prev+value*amount).toFixed(2));
              setColor('text-green');
              setWinning((value*amount).toFixed(2));
         }
          


    }

    return (
        <>
         <div className='flex justify-center items-center bg-gray-900'><input type="number" value={wallet} name="" id=""  className='border-2'/><p className='text-white ml-4'>Wallet</p>
         </div>
        <div className='flex justify-center items-center h-screen bg-gray-700'>
            
            <div className='bg-gray-900 p-8 rounded-lg shadow-md w-[900px] h-[570px]'>
                <h1 className='text-2xl mb-4 text-white'>Crash Game</h1>
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
                                value={ winning } 
                                className='border rounded px-2 py-1 w-32'
                                placeholder='0.00' 
                                readOnly 
                            />
                        </div>
                        <button 
                            className='mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-400 w-[70px]'
                            onClick={handlebet}
                        >
                            Bet
                        </button>
                        <button 
                            className='ml-3 mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-400 w-[90px]'
                            onClick={handlecashout}
                        >
                           Cash_out
                        </button>
                    </div>
                    <div>
                        
                        <div className='flex justify-center items-center'>
                        <canvas id ='mycanvas' className='w-[450px] h-[400px] flex items-center justify-center text-5xl  border-2'></canvas>
                         <div className={`ml-[30px] absolute flex justify-center items-center w-[200px] h-[200px text-5xl ${color}`}>{value.toFixed(2)}x</div>
                        </div>
                      
                        
                        <div className='flex gap-4 mt-[5px]'>
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

export default Crash;
