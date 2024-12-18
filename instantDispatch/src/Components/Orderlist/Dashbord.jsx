import React from 'react';
import './dashbord.css' 

const Dashbord = () => {
  return (

<div className="bg-white p-4 rounded-lg shadow-md dashbord">
<h2 className="text-xl font-semibold mb-4">Today's Overview</h2>
<div className="grid grid-cols-3 gap-4">
  <div className="dashcolor p-4 rounded-lg">
    <div className="flex justify-between items-center">
      <h3 className="text-sm font-semibold mb-2">Orders</h3>
      {/* <button className="view-btn">View Orders</button> */}
      <button className="view-btn hover:bg-orange-500 font-bold py-1 px-2 rounded border-none">View Orders</button> 
    </div>
    <p className="text-lg font-bold">7</p>
  </div>
   <div className="dashcolor p-4 rounded-lg">
    <div className="flex justify-between items-center">
      <h3 className="text-sm font-semibold mb-2">Out for Delivery</h3>
      <button className="view-btn hover:bg-orange-500 font-bold py-1 px-2 rounded border-none">Pending</button> 
    </div>
    <p className="text-lg font-bold">5</p>
  </div>
   <div className="dashcolor p-4 rounded-lg">
    <div className="flex justify-between items-center">
      <h3 className="text-sm font-semibold mb-2">Delivered</h3>
      <button className="view-btn hover:bg-orange-500 font-bold py-1 px-2 rounded border-none">Completed</button> 
    </div>
    <p className="text-lg font-bold">2</p>
  </div>
</div>
</div>
  );
}

export default Dashbord;