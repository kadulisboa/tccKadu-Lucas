import React from "react";
import { Link } from "react-router-dom";
import {
  ChartSquareBarIcon,
  ShoppingBagIcon,
  CashIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

const NavMenu: React.FC = ({ children }) => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col p-4 justify-start drawer-content">
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <Link to="/dashboard">
              <ChartSquareBarIcon className="w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/products">
              <ShoppingBagIcon className="w-5 h-5 mr-2" />
              Produtos
            </Link>
          </li>
          <li>
            <Link to="/sales">
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Vendas
            </Link>
          </li>
          <li>
            <Link to="/markup">
              <CashIcon className="w-5 h-5 mr-2" />
              Markup
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
