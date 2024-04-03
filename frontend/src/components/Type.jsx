import React from 'react';
import { Link } from 'react-router-dom';

function Type() {
  return (
    <div className='bg-gray-900 min-h-screen flex flex-col justify-center items-center'>
      <h1 className="text-white text-3xl font-bold mb-8">Choose the type you want to play</h1>
      <br />
       <div className='mb-[20px]'>
        <span className='mr-[120px] text-white'>Multi-Player</span>
         <span className='ml-[120px] text-white'>Single-Player</span>
        </div>
      <div className='flex justify-center items-center'>
        <Link to="/crash" className='w-72 h-72 border-2 bg-gray-500 flex justify-center items-center rounded-lg cursor-pointer hover:bg-gray-100' style={{backgroundImage: "url('./Images/team.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}>

        </Link>
        <Link to="/limbo" className='w-72 h-72 border-2 bg-gray-500 flex justify-center items-center rounded-lg cursor-pointer hover:bg-gray-100 ml-8' style={{backgroundImage: "url('./Images/gamer.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
          
        </Link>
      </div>
    </div>
  );
}

export default Type;
