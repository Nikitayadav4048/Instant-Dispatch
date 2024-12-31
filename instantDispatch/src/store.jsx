import { configureStore } from '@reduxjs/toolkit'; 

import ordersReducer from '../src/Components/Orderlist/ordersSlice';
 export const store = configureStore({ 
    reducer: { orders: ordersReducer,

     },
     });