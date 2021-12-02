import * as React from "react";
// import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
// import { Link, useHistory } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
// import "./index.css";
// import Tooltip from "../../components/Tooltip";

const Register: React.FC = () => {
  return <h1>Register Old 1</h1>;
  // const { login } = useAuth();
  // const history = useHistory();
  // const [seePassword, setSeePassword] = React.useState(false);
  // const [seeConfirmPassword, setSeeConfirmPassword] = React.useState(false);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  // return (
  //   <section className="background-pattern {-- h-screen --}">
  //     <div className="mx-auto flex justify-center lg:items-center h-full">
  //       <form
  //         onSubmit={handleSubmit}
  //         className="w-full sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 text-white py-12 px-2 sm:px-0 flex flex-col"
  //       >
  //         <div className="pt-0 px-2 flex flex-col items-center justify-center">
  //           <h2 className="text-4xl leading-tight pt-8">Gestão e Valor</h2>
  //         </div>
  //         <div className="pt-8 pb-1 px-2 flex flex-col items-center justify-center">
  //           <h3 className="text-1xl sm:text-2xl xl:text-1xl font-bold leading-tight">
  //             Criar sua conta agora!
  //           </h3>
  //         </div>
  //         <button
  //           type="button"
  //           className="self-center mb-3 my-2 flex items-center bg-white transition duration-150 ease-in-out hover:border-indigo-600 border border-indigo-700 rounded text-indigo-700 hover:text-indigo-600 pl-3 pr-6 py-2 text-sm"
  //         >
  //           <svg
  //             aria-hidden="true"
  //             focusable="false"
  //             data-prefix="fab"
  //             data-icon="google"
  //             className="svg-inline--fa fa-google mr-5 fa-w-16 w-7"
  //             role="img"
  //             xmlns="http://www.w3.org/2000/svg"
  //             viewBox="0 0 488 512"
  //           >
  //             <path
  //               fill="currentColor"
  //               d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
  //             ></path>
  //           </svg>
  //           Criar com Google
  //         </button>
  //         <hr />
  //         <div className="mt-1 w-full px-2 sm:px-6">
  //           <div className="flex flex-col mt-2">
  //             <label
  //               htmlFor="name"
  //               className="text-lg font-semibold leading-tight"
  //             >
  //               Nome *
  //             </label>
  //             <input
  //               required
  //               id="name"
  //               name="name"
  //               placeholder="seu nome"
  //               className="h-10 px-2 w-full text-white bg-indigo-700 rounded mt-2 focus:outline-none shadow"
  //               type="text"
  //             />
  //           </div>
  //           <div className="flex flex-col mt-5">
  //             <label
  //               htmlFor="email"
  //               className="text-lg font-semibold leading-tight"
  //             >
  //               E-mail *
  //             </label>
  //             <input
  //               required
  //               id="email"
  //               name="email"
  //               placeholder="seu@email.com"
  //               className="h-10 px-2 w-full text-white bg-indigo-700 rounded mt-2 focus:outline-none shadow"
  //               type="email"
  //             />
  //           </div>
  //           <div className="flex flex-col mt-5">
  //             <label
  //               htmlFor="password"
  //               className="text-lg mb-2 font-semibold fleading-tight"
  //             >
  //               Senha
  //             </label>
  //             <div className="relative">
  //               <input
  //                 required
  //                 id="password"
  //                 name="password"
  //                 placeholder="*********"
  //                 className="h-10 px-2 w-full text-white bg-indigo-700 rounded focus:outline-none shadow flex items-center pl-4 pr-16 text-sm"
  //                 type={!seePassword ? "password" : "text"}
  //               />
  //               <div onClick={() => setSeePassword(!seePassword)}>
  //                 <Tooltip
  //                   widthComponent="150px"
  //                   componentStyle="absolute flex items-center px-4 border-l border-indigo-500 h-full cursor-pointer right-0 top-0"
  //                   texts={{ title: "Mostrar Senha" }}
  //                   button={{ exist: false }}
  //                 >
  //                   {!seePassword ? (
  //                     <EyeIcon className="h-4 w-4 text-white" />
  //                   ) : (
  //                     <EyeOffIcon className="h-4 w-4 text-white" />
  //                   )}
  //                 </Tooltip>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="flex flex-col mt-5">
  //             <label
  //               htmlFor="confirm-password"
  //               className="text-lg mb-2 font-semibold fleading-tight"
  //             >
  //               Confirmar Senha
  //             </label>
  //             <div className="relative">
  //               <input
  //                 required
  //                 id="confirm-password"
  //                 name="confirm-password"
  //                 placeholder="*********"
  //                 className="h-10 px-2 w-full text-white bg-indigo-700 rounded focus:outline-none shadow flex items-center pl-4 pr-16 text-sm"
  //                 type={!seeConfirmPassword ? "password" : "text"}
  //               />
  //               <div onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}>
  //                 <Tooltip
  //                   widthComponent="150px"
  //                   componentStyle="absolute flex items-center px-4 border-l border-indigo-500 h-full cursor-pointer right-0 top-0"
  //                   texts={{ title: "Mostrar Senha" }}
  //                   button={{ exist: false }}
  //                 >
  //                   {!seeConfirmPassword ? (
  //                     <EyeIcon className="h-4 w-4 text-white" />
  //                   ) : (
  //                     <EyeOffIcon className="h-4 w-4 text-white" />
  //                   )}
  //                 </Tooltip>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="px-2 sm:px-6">
  //           <button className="focus:outline-none w-full bg-white transition duration-150 ease-in-out hover:bg-gray-200 rounded text-indigo-600 px-8 py-3 text-sm mt-6">
  //             Criar conta
  //           </button>
  //           <p className="mt-6 text-xs text-center">
  //             Já tem uma conta?{" "}
  //             <a className="underline">
  //               <Link to="/login">Entrar agora</Link>
  //             </a>
  //           </p>
  //         </div>
  //       </form>
  //     </div>
  //   </section>
  // );
};

export default Register;
