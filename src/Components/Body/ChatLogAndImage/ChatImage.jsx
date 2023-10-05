import React, {useState, useRef} from 'react'
import Miku from "./assets/miku.png"
import Box from '../ChatBox/Box'


function ChatImage() {
  const inputRef = useRef();
  const [message , setMessage] = useState(null);
  

  const handleSent = () =>{
    setMessage(inputRef.current.value)
    console.log(inputRef.current)
  };
  
  return (
    
    <>
    <div class="grid grid-cols-3 gap-4 mt-5 p-6">

        {/* Chat transcript here */}

        <div className='col-span-1 text-black text-5xl text-center'>

            Chat Log
            <div className='container'>
              <div className='text-2xl text-left mt-5'> { message ? `User : ${message}`: ""}</div>
              <div className='text-2xl text-left mt-2'>Miku : reply</div>
            </div>
        </div>



        {/* Image goes here */}
        <div className='col-span-2 '><img src={Miku} /></div>

    </div>
    <Box handleSent={handleSent} ref={inputRef}/>
    </>
  )
}

export default ChatImage