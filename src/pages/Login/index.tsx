import React from "react";
import { Link, useHistory } from "react-router-dom";
import { MailIcon, LockOpenIcon } from "@heroicons/react/solid";
import { useForm, SubmitErrorHandler, FieldError } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  InputCard,
  InputGroup,
  InputWithIcon,
  Label,
} from "../../components/Form";
import { useAuth } from "../../contexts/AuthContext";
import AuthSocial from "../../components/AuthSocial";
import Button from "../../components/Button";
import Divider from "../../components/Divider";
import Modal from "../../components/Modal";
import TranslateMessage from "../../components/GoogleErros";
import { loginEmail } from "../../services/firebase/api";

interface Inputs {
  email: string;
  password: string;
}

interface InputErros {
  name?: FieldError;
  email?: FieldError;
  password?: FieldError;
  confirmPassword?: FieldError;
}

const Login: React.FC = () => {
  const history = useHistory();
  const [messageModal, setMessageModal] = React.useState("");
  const [errors, setErrors] = React.useState<InputErros>({});
  const [seeModal, setSeeModal] = React.useState(false);
  const { login } = useAuth();

  const EditSchema = yup.object().shape({
    email: yup
      .string()
      .required("Preencha com seu email")
      .email("Preencha com um e-mail válido"),
    password: yup.string().required("Informe a sua senha"),
  });

  const { register, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(EditSchema),
  });

  const onError: SubmitErrorHandler<Inputs> = async (error) => {
    await setErrors(error);
  };

  const onSubmit = async (data: Inputs) => {
    setErrors({});
    try {
      const response = await loginEmail(data);
      if (response) {
        login(response);
        history.push("/dashboard");
      } else {
        setSeeModal(true);
      }
    } catch (error) {
      const errorT: any = error;
      setMessageModal(TranslateMessage(errorT.code));
      setSeeModal(true);
    }
  };

  return (
    <section className="bg-primary min-h-screen py-6">
      <Modal
        id="loginmodal"
        title="Ops! Algo de errado aconteceu 😔"
        description={
          messageModal == ""
            ? "Parece que deu algum erro ao tentar entrar em sua conta, tente novamente mais tarde."
            : messageModal
        }
        button="Fechar"
        timer={5}
        active={seeModal}
        closeModal={setSeeModal}
      />
      <div className="container mx-auto md:container md:mx-auto flex flex-col items-center align-center justify-center">
        <h1 className="mb-10 text-5xl font-bold text-white">
          Gestão e Valor! 📈
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="w-1/2 flex items-center align-center justify-center h-auto"
        >
          <InputCard width="w-3/4">
            <h2 className="text-2xl text-center	font-bold">Bem Vindo!</h2>
            <p className="font-light text-gray-400 text-sm text-center">
              Para acessar o painel utilize suas credencias. 😄
            </p>
            <AuthSocial />
            <Divider>Ou</Divider>
            <FormControl>
              <Label>E-mail</Label>
              <InputGroup>
                <span>
                  <MailIcon className="w-4 h-4" />
                </span>
                <InputWithIcon
                  validate={errors.email?.message}
                  innerRef={register("email")}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Seu e-mail"
                />
              </InputGroup>
              {errors.email?.message != undefined ? (
                <p className="text-xs	italic text-red-500 mt-2">
                  {errors.email?.message}
                </p>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl>
              <Label>Senha</Label>
              <InputGroup>
                <span>
                  <LockOpenIcon className="w-4 h-4" />
                </span>
                <InputWithIcon
                  type="password"
                  placeholder="********"
                  name="password"
                  validate={errors.password?.message}
                  id="password"
                  innerRef={register("password")}
                />
              </InputGroup>
              {errors.password?.message != undefined ? (
                <p className="text-xs	italic text-red-500 mt-2">
                  {errors.password?.message}
                </p>
              ) : (
                ""
              )}
            </FormControl>
            {/* <div className="flex justify-end">
              <Link
                className="link link-accent text-xs mt-5"
                to="/forgot-password"
              >
                Esqueci minha senha 😔
              </Link>
            </div> */}
            <Button type="submit">Entrar</Button>
            <Divider />
            <p className="text-center">
              Não tem uma conta?{" "}
              <Link className="link" to="/register">
                Criar Agora!!
              </Link>
            </p>
          </InputCard>
        </form>
      </div>
    </section>
  );
};

export default Login;
