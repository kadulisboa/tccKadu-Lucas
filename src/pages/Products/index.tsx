import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../../components/NavBar";
import NavMenu from "../../components/NavMenu";
import { User } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import {
  GetProducts,
  DeleteProducts,
  GetMarkup,
} from "../../services/firebase/api";

import {
  PlusCircleIcon,
  XCircleIcon,
  PencilIcon,
} from "@heroicons/react/solid";

interface ProductsProps {
  productName: string;
  valueBuyProduct: string;
  qtdProduct: number;
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const [ml, setMl] = useState(0);
  const history = useHistory();

  const handleDelete = () => {
    const deleteId = prompt("Qual o Id do item a ser deletado?") || "";
    if (
      deleteId &&
      parseInt(deleteId) <= products.length &&
      parseInt(deleteId) != -1
    ) {
      DeleteProducts(parseInt(deleteId)).then((response) =>
        setProducts(response)
      );
    }
  };

  const handleEdit = () => {
    const editId = prompt("Qual o Id do item a ser editado?") || "";
    if (
      editId &&
      parseInt(editId) <= products.length &&
      parseInt(editId) != -1
    ) {
      history.push("/products/edit/" + editId);
    }
  };

  useEffect(() => {
    const res = GetProducts();
    res.then((response) => setProducts(response));
    GetMarkup().then((res) => setMl(res?.im));
  }, []);

  return (
    <div className="dashboard h-screen bg-base-200 drawer">
      <NavMenu>
        <NavBar />
        <div className="card shadow-lg bg-white mt-5 overflow-y-auto">
          <div className="card-body">
            <div className="actions flex align-center justify-end pb-5">
              <Link
                to="products/create"
                className="btn btn-primary btn-sm ml-2"
              >
                <PlusCircleIcon className="w-4 h-4 mr-2" />
                Adicionar
              </Link>
              <button
                onClick={handleEdit}
                className="btn btn-secondary btn-sm ml-2"
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                Editar
              </button>
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
                    <th>Valor de Compra</th>
                    <th>Quantidade</th>
                    <th>Valor de Venda</th>
                    <th>Mark-up</th>
                  </tr>
                </thead>
                <tbody className="overflow-y-auto">
                  {!products ? (
                    <p className="text-center w-full text-accent mt-5">
                      Sem itens no momento
                    </p>
                  ) : (
                    products.map((item: ProductsProps, index: number) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.productName}</td>
                        <td>R$ {item.valueBuyProduct}</td>
                        <td>{item.qtdProduct}</td>
                        <td>
                          R${" "}
                          {(parseFloat(item.valueBuyProduct) * ml).toFixed(2)}
                        </td>
                        <td>{ml.toFixed(2)}</td>
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

export default Products;
