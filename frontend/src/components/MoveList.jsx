import React from 'react'

const MoveList = ({moves}) => {
  return (
    <div
    className="mt-4 border"
    style={{
      height: '385px',
      width: '180px',
      overflowY: 'scroll',
      backgroundColor: 'lightgray',
      padding: '3px',
    }}
  >
      <h5 className='text-center'>Moves:</h5>
      <ul className='list-grouo'>
        {moves.map((move, index) =>(
          <li key={index} className='list-group-item'>{(index + 1) + "." + move}</li>
        ))}
      </ul>
    </div>
  )
}

export default MoveList