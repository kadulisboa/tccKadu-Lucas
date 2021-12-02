import React from "react";
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
import { GetProducts, CreateProducts } from "../../services/firebase/api";

interface Inputs {
  nameProduct: string;
  valueBuyProduct: string;
  qtdProduct: number;
}

interface InputErros {
  nameProduct?: FieldError;
  valueBuyProduct?: FieldError;
  qtdProduct?: FieldError;
}

const CreateProductsPage = () => {
  const [errors, setErrors] = React.useState<InputErros>({});
  const history = useHistory();
  User();

  const EditSchema = yup.object().shape({
    nameProduct: yup
      .string()
      .required("Preencha com nome do produto")
      .min(5, "Nome muito curto, preencha com o nome completo do produto"),
    valueBuyProduct: yup
      .string()
      .matches(/\s*\d+(?:\,\d{2})?/g, "Digite o valor no formato 00,00")
      .required("Preencha com valor que você comprou o produto"),
    qtdProduct: yup
      .number()
      .moreThan(0, "A quantidade tem que ser maior que 0")
      .required("Preencha com a quantidade de produtos comprados"),
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
      const response = await CreateProducts({
        productName: data.nameProduct,
        valueBuyProduct: data.valueBuyProduct,
        qtdProduct: data.qtdProduct,
      });
      const confirmNP = window.confirm(
        "Produto cadastrado com sucesso!\n Você deseja adicionar mais itens?"
      );

      if (!confirmNP) {
        history.push("/products");
      }
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
              <FormControl>
                <Label>Nome do produto</Label>
                <Input
                  id="nameProduct"
                  type="text"
                  placeholder="Produto xyz"
                  className="input-bordered"
                  validate={errors.nameProduct?.message}
                  innerRef={register("nameProduct")}
                />
                {errors.nameProduct?.message != undefined ? (
                  <p className="text-xs	italic text-red-500 mt-2">
                    {errors.nameProduct?.message}
                  </p>
                ) : (
                  ""
                )}
              </FormControl>

              <FormControl>
                <Label>Valor de compra</Label>
                <Input
                  id="valueBuyProduct"
                  type="string"
                  placeholder="Comprou por"
                  className="input-bordered"
                  validate={errors.valueBuyProduct?.message}
                  innerRef={register("valueBuyProduct")}
                />
                {errors.valueBuyProduct?.message != undefined ? (
                  <p className="text-xs	italic text-red-500 mt-2">
                    {errors.valueBuyProduct?.message}
                  </p>
                ) : (
                  ""
                )}
              </FormControl>

              <FormControl>
                <Label>Quantidade do produto</Label>
                <Input
                  id="qtdProduct"
                  type="number"
                  placeholder="Quantidade"
                  className="input-bordered"
                  validate={errors.qtdProduct?.message}
                  innerRef={register("qtdProduct")}
                />
                {errors.qtdProduct?.message != undefined ? (
                  <p className="text-xs	italic text-red-500 mt-2">
                    {errors.qtdProduct?.message}
                  </p>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl>
                <Button type="submit">Salvar</Button>
                <Link to="/products">
                  <Button type="button" color="btn-accent">
                    Cancelar
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

export default CreateProductsPage;
