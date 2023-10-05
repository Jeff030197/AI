import React, { forwardRef } from 'react'


const BoxForwardRef = ({handleSent},ref) => {

 
  return (
    <div className=' flex-1'>
         
        <div class="md:container md:mx-auto bg-gray-500 mt-5 flex items-center gap-4 p-4 mb-3 ">

        <input type="text" placeholder="Type here" className="p-5 mt-5 mb-5 rounded-full w-full "  ref={ref} />

        <button className='btn bg-blue-700 p-5 rounded-xl text-xl text-white' onClick={handleSent}>Send</button>
        </div>

    </div>
  )
} 
const Box = forwardRef(BoxForwardRef)
export default Box