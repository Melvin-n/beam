//import dependencies and css
import React from 'react';
import './after-payment.css'

export default function SuccessPayment() {
  return (
  <div className='after-payment'>
    <h1 className='after-payment-title'>Payment Successful!</h1>
    <a href='http://localhost:3000/' className='after-payment-redirect'>Back to home</a>
  </div>
  )
}
