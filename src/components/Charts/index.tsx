import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { GetProducts, GetSales } from "../../services/firebase/api";

const Charts = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([{ productName: "", total: "" }]);

  useEffect(() => {
    GetProducts().then((response) => setProducts(response));
    GetSales().then((response) => setSales(response));
  }, []);

  const prodNames: string[] = [];
  const prodValues: number[] = [];
  if (products) {
    products.map((val: { productName: string }) => {
      prodNames.push(val.productName);
    });

    for (let i = 0; i < prodNames.length; i++) {
      for (let iS = 0; iS < sales.length; iS++) {
        if (sales[iS].productName == prodNames[i]) {
          prodValues[i] =
            prodValues[i] == undefined
              ? parseFloat(sales[iS].total)
              : prodValues[i] + parseFloat(sales[iS].total);
        }
      }
    }
  }

  const data = {
    labels: prodNames,
    datasets: [
      {
        label: "Valor total vendido do produto",
        data: prodValues,
        fill: false,
        backgroundColor: "rgb(65, 190, 108)",
        borderColor: "rgba(101, 205, 130, 1)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Charts;
