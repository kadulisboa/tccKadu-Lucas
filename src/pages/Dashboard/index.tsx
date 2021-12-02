import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import NavMenu from "../../components/NavMenu";
import Charts from "../../components/Charts";
import { User } from "../../contexts/AuthContext";
import { GetProducts, GetSales } from "../../services/firebase/api";

const Dashboard = () => {
  // User();
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState("0");

  useEffect(() => {
    const prods = GetProducts();
    prods.then((response) => setProducts(response));

    const sal = GetSales();
    sal.then((response: []) => {
      setSales(response);
      if (response) {
        const totalSalesValue = response.reduce<string>(
          (prv: string, curr: { total: string }) => {
            let result = parseFloat(prv) + parseFloat(curr.total);
            return result.toFixed(2);
          },
          "0"
        );
        setTotalSales(totalSalesValue);
      }
    });
  }, []);
  return (
    <div className="dashboard h-screen bg-base-200 drawer">
      <NavMenu>
        <NavBar />
        <div className="flex">
          <div className="w-4/5 mr-auto card shadow-lg mt-5 bg-white">
            <div className="card-body">
              <Charts />
            </div>
          </div>
          <div className="grid-flow-row shadow-lg stats w-1/5 mt-5 ml-5">
            <div className="stat">
              <div className="stat-title">Vendas</div>
              <div className="stat-value">
                {sales ? sales.length : "Sem Vendas"}
              </div>
              {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
            </div>
            <div className="stat">
              <div className="stat-title">Produtos</div>
              <div className="stat-value">
                {products ? products.length : "Sem Produtos"}
              </div>
              {/* <div className="stat-desc text-success">↗︎ 400 (22%)</div> */}
            </div>
            <div className="stat">
              <div className="stat-title">Valor</div>
              <div className="stat-value">R$ {totalSales}</div>
              {/* <div className="stat-desc text-error">↘︎ 90 (14%)</div> */}
            </div>
          </div>
        </div>
      </NavMenu>
    </div>
    // <div className=" p-4">
    // </div>
  );
};

export default Dashboard;
