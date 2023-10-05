import React from 'react'
function Header({handleClear}) {
  return (
    <div>
        <div className='md:container:lg md:mx-auto bg-gray-500 flex '>
        <div className='mt-5 mb-5'>
            <button className='btn mr-5 bg-green-300 rounded-full'><p className='text-2xl p-3' onClick={handleClear} >Clear Conversation</p></button>
            </div>
        
        </div>
    </div>
  )
}

export default Header