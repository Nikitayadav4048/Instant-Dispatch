import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for fetching all bookings
export const fetchBookings = createAsyncThunk('orders/fetchBookings', async () => {
    const response = await axios.get('http://localhost:4000/api/bookings');
    return response.data;
});

// Async Thunk for fetching a booking by ID
export const fetchBookingById = createAsyncThunk('orders/fetchBookingById', async (id) => {
    const response = await axios.get(`http://localhost:4000/api/bookings/${id}`);
    return response.data;
});

const initialState = {
    data: [],
    filteredData: [],
    ordersCount: 0,
    outForDeliveryCount: 0,
    completeCount: 0,
    selectedOrder: null,
    loading: false,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        handleAccept: (state, action) => {
            const updatedData = state.data.map(item => item._id === action.payload ? { ...item, status: 'Out for Delivery' } : item);
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
            const updatedData = state.data.map(item => item._id === action.payload ? { ...item, status: 'Delivered' } : item);
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
        handleReject: (state, action) => {
            const updatedData = state.data.filter(item => item._id !== action.payload);
            state.data = updatedData;
            state.filteredData = updatedData.filter(order => order.status !== 'Delivered');
            state.ordersCount -= 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.filteredData = action.payload.filter(order => order.status !== 'Delivered');
                state.ordersCount = action.payload.length;
                state.outForDeliveryCount = action.payload.filter(order => order.status === 'Out for Delivery').length;
                state.completeCount = action.payload.filter(order => order.status === 'Delivered').length;
            })
            .addCase(fetchBookings.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchBookingById.fulfilled, (state, action) => {
                state.selectedOrder = action.payload;
            });
    }
});

export const { handleAccept, handleDetails, handleBack, handleComplete, handleFilter, handleReject } = ordersSlice.actions;
export default ordersSlice.reducer;
