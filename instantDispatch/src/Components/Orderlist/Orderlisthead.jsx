import React, { useState } from 'react';
import './orderlisthead.css';
import Dashbord from './Dashbord';

const Orderlisthead = () => {
  const initialData = [
    { id: 1, name: 'John Doe', orderdate: "12 May 2024", deliverydate: "12 May 2024", subtotal: '$1.18', income: '$0.12', from: 'New York', to: 'Los Angeles', status: "Pending", viecal: 'Motorcycle Rider' },
    { id: 2, name: 'Jane Smith', orderdate: "12 May 2024", deliverydate: "12 May 2024", subtotal: '$1.18', income: '$0.12', from: 'New York', to: 'Los Angeles', status: "Pending", viecal: 'Motorcycle Rider' },
    { id: 3, name: 'Sam Green', orderdate: "12 may 2024", deliverydate: "12 may 2024" , subtotal: '$1.18' ,income: '$0.12', from: 'New York', to: 'Los Angeles' ,  status: "Pending" , viecal: 'Motocycle Rider'},
     { id: 4, name: 'Jane Smith',orderdate: "12 may 2024" , deliverydate: "12 may 2024" , subtotal: '$1.18' ,income: '$0.12', from: 'New York', to: 'Los Angeles' , status: "Pending" , viecal: 'Motocycle Rider'}, 
     { id: 5, name: 'Sam Green', orderdate: "12 may 2024", deliverydate: "12 may 2024" , subtotal: '$1.18' ,income: '$0.12', from: 'New York', to: 'Los Angeles' , status: "Pending" , viecal: 'Motocycle Rider'},
     { id: 6, name: 'Jane Smith',orderdate: "12 may 2024" , deliverydate: "12 may 2024" , subtotal: '$1.18' ,income: '$0.12', from: 'New York', to: 'Los Angeles' , status: "Pending" , viecal: 'Motocycle Rider'}, 
     { id: 7, name: 'Sam Green', orderdate: "12 may 2024", deliverydate: "12 may 2024" , subtotal: '$1.18' ,income: '$0.12', from: 'New York', to: 'Los Angeles' ,  status: "Pending" , viecal: 'Motocycle Rider'},
     { id: 8, name: 'Jane Smith',orderdate: "12 may 2024" , deliverydate: "12 may 2024" , subtotal: '$1.18' ,income: '$0.12', from: 'New York', to: 'Los Angeles' , status: "Pending" , viecal: 'Motocycle Rider'}, 
     { id: 9, name: 'Sam Green', orderdate: "12 may 2024", deliverydate: "12 may 2024" , subtotal: '$1.18' ,income: '$0.12', from: 'New York', to: 'Los Angeles' ,  status: "Pending" , viecal: 'Motocycle Rider'}, 
     { id: 10, name: 'Jane Smith',orderdate: "12 may 2024" , deliverydate: "12 may 2024" , subtotal: '$1.18' ,income: '$0.12', from: 'New York', to: 'Los Angeles' , status: "Pending" , viecal: 'Motocycle Rider'}, 
     { id: 11, name: 'Sam Green', orderdate: "12 may 2024", deliverydate: "12 may 2024" , subtotal: '$1.18' ,income: '$0.12', from: 'New York', to: 'Los Angeles' ,  status: "Pending" , viecal: 'Motocycle Rider'},
     { id: 12, name: 'Sam Green', orderdate: "12 may 2024", deliverydate: "12 may 2024" , subtotal: '$1.18' ,income: '$0.12', from: 'New York', to: 'Los Angeles' ,  status: "Pending" , viecal: 'Motocycle Rider'}, 
     { id: 13, name: 'Jane Smith',orderdate: "12 may 2024" , deliverydate: "12 may 2024" , subtotal: '$1.18' ,income: '$0.12', from: 'New York', to: 'Los Angeles' , status: "Pending" , viecal: 'Motocycle Rider'}, 
     { id: 14, name: 'Sam Green', orderdate: "12 may 2024", deliverydate: "12 may 2024" , subtotal: '$1.18' ,income: '$0.12', from: 'New York', to: 'Los Angeles' , status: "Pending" , viecal: 'Motocycle Rider'},
    // Add more data as needed
  ];

  const [data, setData] = useState(initialData);
  const [outForDeliveryCount, setOutForDeliveryCount] = useState(0);
  

  const handleAccept = (id) => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, status: 'Out for Delivery' } : item
    );
    setData(updatedData);
    setOutForDeliveryCount(outForDeliveryCount + 1);
  };

  return (
    <>
      <div className="orderlistheader text-center justify-center py-40">
        <h1 className=''>Orders</h1>
        <p>Your Route, Your Earnings</p>
      </div>   

      <Dashbord ordersCount={data.length} outForDeliveryCount={outForDeliveryCount} />

      <div className="container mx-auto p-6 tablecon"> 
        <h2 className="text-xl font-semibold mb-6 ml-6">Today's Orders</h2>
        <table className="min-w-full bg-white text-center justify-center">
          <thead> 
            <tr> 
              <th className="py-2 px-4 border-b bg-orange-300">Order ID</th>
              <th className="py-2 px-4 border-b bg-orange-300">Name</th> 
              <th className="py-2 px-4 border-b bg-orange-300">Order Date</th> 
              <th className="py-2 px-4 border-b bg-orange-300">Delivery Date</th> 
              <th className="py-2 px-4 border-b bg-orange-300">SubTotal</th>
              <th className="py-2 px-4 border-b bg-orange-300">Income</th> 
              <th className="py-2 px-4 border-b bg-orange-300" colSpan="2">Location</th>
              <th className="py-2 px-4 border-b bg-orange-300">Vehicle</th>
              <th className="py-2 px-4 border-b bg-orange-300 status-column">Status</th>
              <th className="py-2 px-4 border-b bg-orange-300" colSpan="2">Action</th> 
            </tr> 
            <tr> 
              <th className="py-2 px-4 border"></th>
              <th className="py-2 px-4 border"></th> 
              <th className="py-2 px-4 border"></th>
              <th className="py-2 px-4 border"></th>
              <th className="py-2 px-4 border"></th> 
              <th className="py-2 px-4 border"></th> 
              <th className="py-2 px-4 border">From</th>
              <th className="py-2 px-4 border">To</th>
              <th className="py-2 px-4 border"></th> 
              <th className="py-2 px-4 border status-column"></th>
              <th className="py-2 px-4 border"></th>
            </tr>
          </thead> 
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4">{item.id}</td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.orderdate}</td>
                <td className="py-2 px-4">{item.deliverydate}</td>
                <td className="py-2 px-4">{item.subtotal}</td>
                <td className="py-2 px-4">{item.income}</td>
                <td className="py-2 px-4 border">{item.from}</td>
                <td className="py-2 px-4 border">{item.to}</td>
                <td className="py-2 px-4">{item.viecal}</td>
                <td className="py-2 px-4 status-column">{item.status}</td>
                <td className="py-2 px-4 border"> 
                  {item.status === 'Out for Delivery' ? ( 
                    <button className="btn-color hover:bg-orange-500 font-bold py-1 px-2 rounded border-none">Details</button> 
                    ) :
                     ( <> 
                     <button onClick={() => handleAccept(item.id)} className="btn-color hover:bg-orange-500 font-bold py-1 px-2 rounded border-none">Accept</button> 
                     <button className="bg-black hover:bg-black text-white font-bold py-1 px-2 rounded ml-2 border-none">Reject</button>
                      </> 
                    )} 
                    </td>
              </tr>
            ))}
          </tbody> 
        </table>
      </div>
    </>
  );
}
export default Orderlisthead;
