import { createSlice } from '@reduxjs/toolkit';

const initialData = [
  { id: 1, name: 'John Doe', orderdate: '12 May 2024', deliverydate: '12 May 2024', subtotal: '$1.18', income: '$0.12', from: 'New York', to: 'Los Angeles', status: 'Pending', vehicle: 'Motorcycle Rider', payment: 'Cash On Delivery', phoneNumber: '8795457689', parserType: 'Small' },
  { id: 2, name: 'Jane Smith', orderdate: '12 May 2024', deliverydate: '12 May 2024', subtotal: '$1.18', income: '$0.12', from: 'New York', to: 'Los Angeles', status: 'Pending', vehicle: 'Motorcycle Rider', payment: 'Cash On Delivery', phoneNumber: '8795457689', parserType: 'Small' }
];

const initialState = {
  data: initialData,
  filteredData: initialData.filter(order => order.status !== 'Delivered'),
  ordersCount: initialData.length,
  outForDeliveryCount: 0,
  completeCount: 0,
  selectedOrder: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    handleAccept: (state, action) => {
      const updatedData = state.data.map(item => item.id === action.payload ? { ...item, status: 'Out for Delivery' } : item);
      state.data = updatedData;
      state.filteredData = updatedData.filter(order => order.status !== 'Delivered');
      state.outForDeliveryCount += 1;
    },
    handleDetails: (state, action) => {
      state.selectedOrder = action.payload;
    },
    handleBack: (state) => {
      state.selectedOrder = null;
    },
    handleComplete: (state, action) => {
      const updatedData = state.data.map(item => item.id === action.payload ? { ...item, status: 'Delivered' } : item);
      state.data = updatedData;
      state.filteredData = updatedData.filter(order => order.status !== 'Delivered');
      state.ordersCount -= 1;
      state.completeCount += 1;
      state.outForDeliveryCount -= 1;
      state.selectedOrder = null;
    },
    handleFilter: (state, action) => {
      if (action.payload === 'all') {
        state.filteredData = state.data.filter(order => order.status !== 'Delivered');
      } else {
        state.filteredData = state.data.filter(order => order.status === action.payload);
      }
    },
  },
});

export const { handleAccept, handleDetails, handleBack, handleComplete, handleFilter } = ordersSlice.actions;
export default ordersSlice.reducer  ; 
