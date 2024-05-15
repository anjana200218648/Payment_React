import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PieController, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import "../../../Pages/Samidi/OrderManager.css";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

function OM_Dashboard_Content() {
  const navigate = useNavigate();
  const [totals, setTotals] = useState({ cardTotal: 40000, directTotal: 35000, bankTotal: 12000 });

  // Bar chart data and options
  const barData = {
    labels: ['Card Payments', 'Direct Payments', 'Bank Transfers'],
    datasets: [
      {
        label: 'Payment Types',
        data: [totals.cardTotal, totals.directTotal, totals.bankTotal],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  };

  // Pie chart data and options
  const pieData = {
    labels: ['Card Payments', 'Direct Payments', 'Bank Transfers'],
    datasets: [
      {
        label: 'Payment Distribution',
        data: [totals.cardTotal, totals.directTotal, totals.bankTotal],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)'
        ],
        hoverOffset: 4
      }
    ]
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Payment Distribution'
      }
    }
  };

  return (
    <div className="dashboard-header" >
          <div className="row">
        <div style={{ width: '32%', padding: '20px', margin: '10px', background: 'rgba(27, 27, 27, 0.744)', textAlign: 'center', height: '150px' }}>
          <h3 style={{fontSize:"30px", marginTop:"4%", color:"#fa730c", fontWeight: "800"}}>Card Payment</h3>
          <p style={{fontSize:"20px", marginTop:"1%", color:"black"}}>Now Activated Card Payment</p>
        </div>
        <div style={{ width: '32%', padding: '20px', margin: '10px', background: 'rgba(27, 27, 27, 0.744)', textAlign: 'center', height: '150px' }}>
          <h3 style={{fontSize:"30px", marginTop:"4%", color:"#fa730c", fontWeight: "800"}}>Bank Payment</h3>
          <p style={{fontSize:"20px", marginTop:"1%", color:"black"}}>Pending 3 Payments</p>
        </div>
        <div style={{ width: '32%', padding: '20px', margin: '10px', background: 'rgba(27, 27, 27, 0.744)', textAlign: 'center', height: '150px' }}>
          <h3 style={{fontSize:"30px", marginTop:"4%", color:"#fa730c", fontWeight: "800"}}>Direct Payment</h3>
          <p style={{fontSize:"20px", marginTop:"1%", color:"black"}}>Pending 1 Payment</p>
        </div>
      </div>
      <div style={{background:" rgba(255, 74, 2, 0.816);"}}>
      <div className="chart-row" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div style={{ width: '45%' }}>
          <Bar data={barData} options={barOptions} />
        </div>
        <div style={{ width: '30%' }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
      </div>
    </div>
  );
}

export default OM_Dashboard_Content;
