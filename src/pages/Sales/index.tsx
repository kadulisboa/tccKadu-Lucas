import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../../components/NavBar";
import NavMenu from "../../components/NavMenu";
import { User } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import {
  GetProducts,
  DeleteSales,
  GetSales,
} from "../../services/firebase/api";

import {
  PlusCircleIcon,
  XCircleIcon,
  PencilIcon,
} from "@heroicons/react/solid";

interface SalesProps {
  productName: string;
  valueSaleProduct: string;
  qtdProduct: number;
  total: string;
}

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [ml, setMl] = useState(0);
  const history = useHistory();

  const handleDelete = () => {
    const deleteId = prompt("Qual o Id do item a ser deletado?") || "";
    if (
      deleteId &&
      parseInt(deleteId) <= sales.length &&
      parseInt(deleteId) != -1
    ) {
      DeleteSales(parseInt(deleteId)).then((response) => setSales(response));
    }
  };
  useEffect(() => {
    const res = GetSales();
    res.then((response) => setSales(response));
  }, []);

  return (
    <div className="dashboard h-screen bg-base-200 drawer">
      <NavMenu>
        <NavBar />
        <div className="card shadow-lg bg-white mt-5 overflow-y-auto">
          <div className="card-body">
            <div className="actions flex align-center justify-end pb-5">
              <Link to="sales/create" className="btn btn-primary btn-sm ml-2">
                <PlusCircleIcon className="w-4 h-4 mr-2" />
                Adicionar
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-accent btn-sm ml-2"
              >
                <XCircleIcon className="w-4 h-4  mr-2" />
                Excluir
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full table-zebra">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Produto</th>
                    <th>Valor de Venda</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto">
                  {!sales ? (
                    <p className="text-center w-full text-accent mt-5">
                      Sem vendas no momento
                    </p>
                  ) : (
                    sales.map((item: SalesProps, index: number) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.productName}</td>
                        <td>R$ {item.valueSaleProduct}</td>
                        <td>{item.qtdProduct}</td>
                        <td>R$ {item.total}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </NavMenu>
    </div>
  );
};

export default Sales;
