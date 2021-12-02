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
} from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  InputCard,
  Input,
  InputGroup,
  InputWithIcon,
  Label,
  Select,
} from "../../components/Form";
import Button from "../../components/Button";
import {
  GetProducts,
  GetMarkup,
  CreateSales,
} from "../../services/firebase/api";

interface Inputs {
  product: string;
  valueSelProduct: string;
  qtdProduct: number;
  total: string;
}

interface InputErros {
  product?: FieldError;
  valueSelProduct?: FieldError;
  qtdProduct?: FieldError;
}

const CreateSalesPage = () => {
  const [products, setProducts] = React.useState<
    [{ productName: string; valueBuyProduct: string }]
  >([{ productName: "", valueBuyProduct: "" }]);
  const [productsValue, setProductsValue] = React.useState("");
  const [ml, setMl] = React.useState(0);
  const [qtd, setQtd] = React.useState(0);
  const [total, setTotal] = React.useState("0");
  const [errors, setErrors] = React.useState<InputErros>({});
  const history = useHistory();
  User();

  useEffect(() => {
    const res = GetProducts();
    res.then((response) => setProducts(response));
    GetMarkup().then((res) => setMl(res?.im));
  }, []);

  const EditSchema = yup.object().shape({
    product: yup
      .string()
      .required("Preencha com nome do produto")
      .min(5, "Nome muito curto, preencha com o nome completo do produto"),
    valueSelProduct: yup
      .string()
      .matches(/\s*\d+(?:\.\d{2})?/g, "Digite o valor no formato 00.00")
      .required("Preencha com valor que você comprou o produto"),
    qtdProduct: yup
      .number()
      .moreThan(0, "A quantidade tem que ser maior que 0")
      .required("Preencha com a quantidade de produtos comprados"),
    total: yup.string(),
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
      const response = await CreateSales({
        productName: data.product,
        qtdProductSel: data.qtdProduct,
        valueSaleProduct: data.valueSelProduct,
        total: total,
      });

      alert("Venda registrada com sucesso!");
      history.push("/sales");
    } catch (error) {
      alert(error);
    }
  };

  const handleValue = (value: string) => {
    const val = products.filter(
      (produ: { productName: string; valueBuyProduct: string }) =>
        produ.productName == value
    );
    setProductsValue((parseFloat(val[0].valueBuyProduct) * ml).toFixed(2));
    setTotal((parseFloat(val[0].valueBuyProduct) * ml * qtd).toFixed(2));
  };
  const handleQtd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setQtd(parseInt(e.target.value));
    setTotal((parseFloat(productsValue) * parseInt(e.target.value)).toFixed(2));
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
                <Label>Produto</Label>
                <Select
                  id="product"
                  onChange={(e) => {
                    handleValue(e.target.value);
                  }}
                  validate={errors.product?.message}
                  innerRef={register("product")}
                  // validate={errors.product?.message}
                  // innerRef={register("product")}
                >
                  {products.map((prod: { productName: string }, index) => (
                    <option key={index} value={prod.productName}>
                      {prod.productName}
                    </option>
                  ))}
                </Select>
                {/* {errors.product?.message != undefined ? (
                  <p className="text-xs	italic text-red-500 mt-2">
                    {errors.product?.message}
                  </p>
                ) : (
                  ""
                )} */}
              </FormControl>

              <FormControl>
                <Label>Valor de venda</Label>
                <Input
                  id="valueSelProduct"
                  type="string"
                  placeholder="Vendeu por"
                  className="input-bordered"
                  value={productsValue}
                  onChange={(e) => {
                    setProductsValue(e.target.value);
                    setTotal((parseFloat(e.target.value) * qtd).toFixed(2));
                  }}
                  validate={errors.valueSelProduct?.message}
                  innerRef={register("valueSelProduct")}
                />
                {errors.valueSelProduct?.message != undefined ? (
                  <p className="text-xs	italic text-red-500 mt-2">
                    {errors.valueSelProduct?.message}
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
                  onChange={(e) => handleQtd(e)}
                  value={qtd}
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
                <Label>Total</Label>
                <Input
                  id="total"
                  type="text"
                  placeholder="Total"
                  className="input-bordered cursor-not-allowed"
                  value={total == "NaN" ? 0 : total}
                  // validate={errors.total?.message}
                  innerRef={register("total")}
                />
              </FormControl>
              <FormControl>
                <Button type="submit">Salvar</Button>
                <Link to="/sales">
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

export default CreateSalesPage;
