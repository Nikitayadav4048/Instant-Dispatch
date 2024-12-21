import React from 'react'
import './orderdetails.css'

const sampleOrder = { 
    id: 16346457,
     name: 'John Doe',
     orderdate: "12 May 2024",
      deliverydate: "12 May 2024", 
      subtotal: '$1.18', 
      income: '$0.12', 
      from: 'New York', 
      to: 'Los Angeles', 
      status: "Out for Delivery",
       vehicle: 'Motorcycle Rider' ,
       payment : 'Cash On Delivery' , 
       PhoneNumber : 8795457689 , 
       ParserType : 'Small'

    };
const Orderdetails = ({order = sampleOrder}) => {


  return (
    <div className="order-details-container"> 
    <h1 className='heading-orderdetails'>Order Details</h1> 
    <div className="order-details"> 
        <p><strong>Order ID:</strong> {order.id}</p> 
        <p><strong>Name:</strong> {order.name}</p>
        <p><strong>Phone Number:</strong> {order.PhoneNumber}</p>
         <p><strong>Order Date:</strong> {order.orderdate}</p>
          <p><strong>Delivery Date:</strong> {order.deliverydate}</p> 
          <p><strong>SubTotal:</strong> {order.subtotal}</p> 
          {/* <p><strong>Income:</strong> {order.income}</p> */}
           <p><strong>From:</strong> {order.from}</p>
            <p><strong>To:</strong> {order.to}</p>
             <p><strong>Vehicle:</strong> {order.vehicle}</p>
              <p><strong>Status:</strong> {order.status}</p> 
              </div> 
              </div>
  )
}

export default Orderdetails
