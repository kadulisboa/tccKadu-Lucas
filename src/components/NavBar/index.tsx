import React from "react";
import { User } from "../../contexts/AuthContext";
import { useAuth } from "../../contexts/AuthContext";

const NavBar = () => {
  const userData = User();
  const { logout } = useAuth();
  return (
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-none hidden lg:flex">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1 hidden px-2 mx-2 lg:flex">
        <span className="text-lg font-bold">Gestão e Valor</span>
      </div>
      <div className="flex-none cursor-pointer">
        <div className="avatar placeholder dropdown dropdown-end">
          <div
            tabIndex={0}
            className={
              "rounded-full w-10 h-10 m-1" +
              (!userData.photoURL
                ? " text-neutral-content bg-neutral-focus"
                : "")
            }
          >
            {!userData.photoURL ? (
              <span className="text-xl">{userData.name[0]}</span>
            ) : (
              <img src={userData.photoURL} />
            )}
          </div>
          <ul
            tabIndex={0}
            className="p-2 text-black shadow menu dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={logout}>Sair</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
