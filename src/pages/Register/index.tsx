import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm, SubmitErrorHandler, FieldError } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  MailIcon,
  LockOpenIcon,
  EyeIcon,
  EyeOffIcon,
  UserIcon,
} from "@heroicons/react/solid";
import {
  FormControl,
  InputCard,
  InputGroup,
  InputWithIcon,
  Label,
} from "../../components/Form";
import Modal from "../../components/Modal";
import { useAuth } from "../../contexts/AuthContext";
import { createEmailAuth } from "../../services/firebase/api";
import Button from "../../components/Button";
import Tooltip from "../../components/Tooltip";
import Divider from "../../components/Divider";
import TranslateMessage from "../../components/GoogleErros";
import AuthSocial from "../../components/AuthSocial";

interface Inputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface InputErros {
  name?: FieldError;
  email?: FieldError;
  password?: FieldError;
  confirmPassword?: FieldError;
}

interface ErrorGoogle {
  code: string;
  message: string;
}

const Register: React.FC = () => {
  const history = useHistory();
  const [messageModal, setMessageModal] = React.useState("");
  const [errors, setErrors] = React.useState<InputErros>({});
  const [seePassword, setSeePassword] = React.useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = React.useState(false);
  const [seeModal, setSeeModal] = React.useState(false);
  const { login } = useAuth();

  const EditSchema = yup.object().shape({
    name: yup
      .string()
      .required("Preencha o seu nome completo")
      .min(5, "Nome muito curto, preencha com seu nome e sobrenome"),
    email: yup
      .string()
      .required("Preencha com seu email")
      .email("Preencha com um e-mail válido"),
    password: yup
      .string()
      .required("Informe a sua senha")
      .min(6, "Senha muito curta, no mínimo 6 caracteres"),
    confirmPassword: yup
      .string()
      .required("Informe a confirmação da senha")
      .oneOf([yup.ref("password"), null], "As senhas devem ser iguais"),
  });

  const { register, handleSubmit } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(EditSchema),
  });

  const onError: SubmitErrorHandler<Inputs> = async (error) => {
    await setErrors(error);
  };

  const onSubmit = async (data: Inputs) => {
    setErrors({});
    try {
      const response = await createEmailAuth(data);
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
    <section className="bg-primary min-h-screen">
      <Modal
        id="emailmodal"
        title="Ops! Algo de errado aconteceu 😔"
        description={
          messageModal == ""
            ? "Parece que deu algum erro ao tentar criar a sua conta, tente novamente mais tarde."
            : messageModal
        }
        button="Fechar"
        timer={5}
        active={seeModal}
        closeModal={setSeeModal}
      />
      <div className="hero min-h-screen">
        <div className="flex-col justify-between hero-content w-full lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-5xl text-white font-bold">
              Gestão e Valor! 📈
            </h1>
            <p className="mb-5">
              Gerencie seus produtos de forma facil <br />e prática com o Gestão
              e Valor!
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="w-1/2 flex items-center align-center justify-center h-auto"
          >
            <InputCard width="w-3/4">
              <h2 className="text-2xl text-center	font-bold">
                Crie sua conta agora!
              </h2>
              <p className="font-light text-gray-400 text-sm text-center">
                Totalmente grátis. 😄
              </p>
              <AuthSocial />
              <Divider>Ou</Divider>
              <FormControl>
                <Label>Nome</Label>
                <InputGroup>
                  <span>
                    <UserIcon className="w-4 h-4" />
                  </span>
                  <InputWithIcon
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    validate={errors.name?.message}
                    innerRef={register("name", {
                      required: "O seu nome é importante para nós!",
                    })}
                  />
                </InputGroup>
                {errors.name?.message != undefined ? (
                  <p className="text-xs	italic text-red-500 mt-2">
                    {errors.name?.message}
                  </p>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl>
                <Label>E-mail</Label>
                <InputGroup>
                  <span>
                    <MailIcon className="w-4 h-4" />
                  </span>
                  <InputWithIcon
                    type="email"
                    id="email"
                    validate={errors.email?.message}
                    innerRef={register("email")}
                    name="email"
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
                    type={!seePassword ? "password" : "text"}
                    name="password"
                    validate={errors.password?.message}
                    id="password"
                    innerRef={register("password")}
                    placeholder="********"
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => setSeePassword(!seePassword)}
                  >
                    <Tooltip
                      message={
                        !seePassword ? "Mostrar senha" : "Esconder Senha"
                      }
                      direction="tooltip-right"
                    >
                      {!seePassword ? (
                        <EyeIcon className="w-4 h-4" />
                      ) : (
                        <EyeOffIcon className="w-4 h-4" />
                      )}
                    </Tooltip>
                  </span>
                </InputGroup>
                {errors.password?.message != undefined ? (
                  <p className="text-xs	italic text-red-500 mt-2">
                    {errors.password?.message}
                  </p>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl>
                <Label>Confirmar Senha</Label>
                <InputGroup>
                  <span>
                    <LockOpenIcon className="w-4 h-4" />
                  </span>
                  <InputWithIcon
                    type={!seeConfirmPassword ? "password" : "text"}
                    name="confirmPassword"
                    id="confirmPassword"
                    validate={errors.confirmPassword?.message}
                    innerRef={register("confirmPassword")}
                    placeholder="********"
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
                  >
                    <Tooltip
                      message={
                        !seeConfirmPassword ? "Mostrar senha" : "Esconder Senha"
                      }
                      direction="tooltip-right"
                    >
                      {!seeConfirmPassword ? (
                        <EyeIcon className="w-4 h-4" />
                      ) : (
                        <EyeOffIcon className="w-4 h-4" />
                      )}
                    </Tooltip>
                  </span>
                </InputGroup>
                {errors.confirmPassword?.message != undefined ? (
                  <p className="text-xs	italic text-red-500 mt-2">
                    {errors.confirmPassword?.message}
                  </p>
                ) : (
                  ""
                )}
              </FormControl>
              <Button type="submit">Criar Conta</Button>
              <Divider />
              <p className="text-center">
                Já tem uma conta?{" "}
                <Link className="link" to="/login">
                  Entrar Agora!!
                </Link>
              </p>
            </InputCard>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
