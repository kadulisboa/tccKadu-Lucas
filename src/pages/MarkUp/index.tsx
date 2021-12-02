import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitErrorHandler, FieldError } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import NavBar from "../../components/NavBar";
import NavMenu from "../../components/NavMenu";
import Charts from "../../components/Charts";
import { User } from "../../contexts/AuthContext";
import {
  PlusCircleIcon,
  XCircleIcon,
  PencilIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  InputCard,
  Input,
  InputGroup,
  InputWithIcon,
  Label,
} from "../../components/Form";
import Button from "../../components/Button";
import Tooltip from "../../components/Tooltip";

import { CreateMarkup, GetMarkup } from "../../services/firebase/api";

interface Inputs {
  df: string;
  dv: string;
  ml: number;
}

interface InputErros {
  df?: FieldError;
  dv?: FieldError;
  ml?: FieldError;
}

const MarkUp = () => {
  const [errors, setErrors] = React.useState<InputErros>({});
  const [dfValue, setDfValue] = React.useState(0);
  const [dvValue, setDvValue] = React.useState(0);
  const [mlValue, setMlValue] = React.useState(0);
  const [indMulti, setIndMulti] = React.useState("0");
  const history = useHistory();
  User();

  useEffect(() => {
    GetMarkup().then((response) => {
      const dfVN =
        response?.df != undefined ? response?.df * 100 : response?.df;
      const dvVN =
        response?.dv != undefined ? response?.dv * 100 : response?.dv;
      const mlVN =
        response?.ml != undefined ? response?.ml * 100 : response?.ml;
      setDfValue(dfVN);
      setDvValue(dvVN);
      setMlValue(mlVN);
      setIndMulti(response?.im.toFixed(2));
    });
  }, []);

  const EditSchema = yup.object().shape({
    df: yup.number().required("Preencha com algum valor"),
    dv: yup.number().required("Preencha com algum valor"),
    ml: yup.number().required("Preencha com algum valor"),
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
      const result = await CreateMarkup({
        df: parseInt(data.df),
        dv: parseInt(data.dv),
        ml: data.ml,
      });
      const confirmNP = window.alert("Markup calculado com sucesso!\n");
      console.log(result.toFixed(2));
      setIndMulti(result.toFixed(2));
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="dashboard h-screen bg-base-200 drawer">
      <NavMenu>
        <NavBar />
        <div className="card shadow-lg bg-white mt-5">
          <div className="card-body">
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="flex items-center flex-col align-center justify-center h-auto"
            >
              <FormControl className="w-1/4">
                <Label>
                  % Despesas Fixas do seu Negócio{" "}
                  <Tooltip
                    message={
                      "Adicione aqui quantos % do valor do produto você deseja alocar para pagar as despesas fixas."
                    }
                    direction="tooltip-right"
                  >
                    <InformationCircleIcon className="w-4 h-4" />
                  </Tooltip>
                </Label>
                <Input
                  id="df"
                  type="number"
                  placeholder=""
                  value={dfValue}
                  onChange={(e) => setDfValue(parseInt(e.target.value))}
                  className="input-bordered w-50"
                  validate={errors.df?.message}
                  innerRef={register("df")}
                />
                {errors.df?.message != undefined ? (
                  <p className="text-xs	italic text-red-500 mt-2">
                    {errors.df?.message}
                  </p>
                ) : (
                  ""
                )}
              </FormControl>

              <FormControl className="w-1/4">
                <Label>
                  % Despesas Variaveis do seu Negócio{" "}
                  <Tooltip
                    message={
                      "Adicione aqui quantos % do valor de venda é para pagar as despesas variaveis.\n Como taxas do cartão, comissão entre outros."
                    }
                    direction="tooltip-right"
                  >
                    <InformationCircleIcon className="w-4 h-4" />
                  </Tooltip>
                </Label>
                <Input
                  id="dv"
                  type="number"
                  placeholder=""
                  value={dvValue}
                  onChange={(e) => setDvValue(parseInt(e.target.value))}
                  className="input-bordered"
                  validate={errors.dv?.message}
                  innerRef={register("dv")}
                />
                {errors.dv?.message != undefined ? (
                  <p className="text-xs	italic text-red-500 mt-2">
                    {errors.dv?.message}
                  </p>
                ) : (
                  ""
                )}
              </FormControl>

              <FormControl className="w-1/4">
                <Label>% Porcentagem de Lucro</Label>
                <Input
                  id="ml"
                  type="number"
                  placeholder=""
                  value={mlValue}
                  onChange={(e) => setMlValue(parseInt(e.target.value))}
                  className="input-bordered"
                  validate={errors.ml?.message}
                  innerRef={register("ml")}
                />
                {errors.ml?.message != undefined ? (
                  <p className="text-xs	italic text-red-500 mt-2">
                    {errors.ml?.message}
                  </p>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl>
                <Label>
                  Indice Multiplicador{" "}
                  <Tooltip
                    message={
                      "Use esse valor para multiplicar com o valor do produto e tenha o valor de venda do seu produto."
                    }
                    direction="tooltip-right"
                  >
                    <InformationCircleIcon className="w-4 h-4" />
                  </Tooltip>
                </Label>
                <Input
                  id="ind"
                  type="text"
                  disabled
                  value={indMulti}
                  className="input-bordered"
                />
              </FormControl>
              <FormControl>
                <Button type="submit">Salvar</Button>
                <Link to="/products">
                  <Button type="button" color="btn-accent">
                    Voltar
                  </Button>
                </Link>
              </FormControl>
            </form>
          </div>
        </div>
      </NavMenu>
    </div>
  );
};

export default MarkUp;
