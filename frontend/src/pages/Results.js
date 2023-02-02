import React from 'react'

const Results = (props) => {
  const {result} = props;

  return (
    <div className='w-full items-center flex-col justify-center'>
      <h1 className='w-full text-[3rem] text-white text-center my-10 font-bold'>RESULTS</h1>
      {result.map((item, index) => (
        <div className='w-[100%] flex justify-center items-center'>
          <h1 className='text-white text-[1.2rem] font-semibold w-[80%] my-5' key={index+1}>{index}. {item}</h1>

        </div>
      ))}
    </div>
  )
}

export default Results
