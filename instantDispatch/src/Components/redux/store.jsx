// import { configureStore } from '@reduxjs/toolkit';
// import ordersReducer from './ordersSlice';

// export const store = configureStore({
//     reducer: {
//         orders: ordersReducer,
//     },
// });

import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './ordersSlice';
import notificationsReducer from './notificationSlice';

const store = configureStore({
    reducer: {
        orders: ordersReducer,
        notifications: notificationsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }),
});

export default store;
