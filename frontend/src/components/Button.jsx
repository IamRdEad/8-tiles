import React from 'react'

const Button = ({label, onClick}) => {
  return (
    <div className='btn btn-primary mx-2' onClick={onClick}>
    {label}
  </div>
  )
}

export default Button