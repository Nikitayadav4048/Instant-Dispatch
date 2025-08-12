import React from 'react';
import './Dashboard.css';
import { MdAccountCircle } from "react-icons/md";
// import Sidebar from './Sidebar'; 
import OverviewCards from './OverviewCards';
import Charts from './Charts'; 
import OrdersGraph from './OrdersGraph';
import Notifications from './Notifications'; 
import PerformanceMetrics from './PerformanceMetrics';

const Dashboard = () => {
  return (
    <div className="dashboard-container flex">
      {/* <Sidebar /> */}
      <div className="dashboard-content flex-grow">
        <header className="dashboard-header flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="user-info flex items-center">
            {/* <img src="path_to_avatar_image" alt="User Avatar" className="avatar w-10 h-10 rounded-full" /> */}
            <MdAccountCircle size={30} />
            <span className="ml-2 text-lg">Rampal Singh</span>
          </div>
        </header>
        <OverviewCards />
        <div className="charts-and-tables mt-6">
          <div className="chart-item w-full md:w-1/2 p-4">
            <Charts />
          </div>
          <div className="chart-item w-full md:w-1/2 p-4">
            <OrdersGraph />
          </div>
        </div>
        <div className="additional-info mt-6 flex flex-wrap">
          <div className="info-item w-full md:w-1/2 p-4">
            <Notifications />
          </div>
          <div className="info-item w-full md:w-1/2 p-4">
            <PerformanceMetrics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
