import { firebaseDb, firebaseApi } from "./firebase.config";
import { User } from "../../contexts/AuthContext";
import firebase from "firebase";

const googleAuth = async () => {
  const provider = new firebaseApi.auth.GoogleAuthProvider();
  const response = await firebaseApi.auth().signInWithPopup(provider);
  return response;
};

interface createEmailAuthProps {
  name: string;
  email: string;
  password: string;
}

interface loginProps {
  email: string;
  password: string;
}

interface createProductsProps {
  id?: number;
  productName: string;
  valueBuyProduct: string;
  qtdProduct: number;
}
interface createSalesProps {
  id?: number;
  productName: string;
  valueSaleProduct: string;
  qtdProductSel: number;
  total: string;
}

interface createMarkupProps {
  df: number;
  dv: number;
  ml: number;
}

const createEmailAuth = async ({
  name,
  email,
  password,
}: createEmailAuthProps) => {
  const { user } = await firebaseApi
    .auth()
    .createUserWithEmailAndPassword(email, password);

  const userDb = await accessDb("users").doc(user?.uid).set({
    name,
    email: user?.email,
  });

  const userReturned = {
    user: user?.uid,
    displayName: name,
    email: user?.email,
    photoURL: user?.photoURL,
  };

  return userReturned;
};

const loginEmail = async ({ email, password }: loginProps) => {
  const { user } = await firebaseApi
    .auth()
    .signInWithEmailAndPassword(email, password);

  const userData = {
    uid: user?.uid,
    displayName: "Kadu",
    email: user?.email,
    photoURL: null,
  };

  return userData;
};

const CreateSales = async ({
  productName,
  valueSaleProduct,
  qtdProductSel,
  total,
}: createSalesProps) => {
  const userData = User();
  const sales = await GetSales();
  const ItSales = sales ? sales : [];
  const sale = await accessDb("sales")
    .doc(userData?.uid)
    .set(
      {
        sales: [
          ...ItSales,
          {
            productName,
            valueSaleProduct,
            qtdProduct: qtdProductSel,
            total,
          },
        ],
      },
      { merge: true }
    );

  const prods: [] = await GetProducts();
  const prod: (
    | { productName: string; qtdProduct: number; valueBuyProduct: string }
    | undefined
  )[] = prods.filter(
    (val: {
      productName: string;
      qtdProduct: number;
      valueBuyProduct: string;
    }) => productName == val.productName
  );

  const idProd: number | undefined = prods
    .map((val: { productName: string }, index) => {
      return val.productName;
    })
    .indexOf(productName);

  const menosProd = prod[0]?.qtdProduct
    ? prod[0]?.qtdProduct - qtdProductSel
    : 0;

  const UpdateProdFSales = UpdateProductsForSales({
    id: idProd,
    productName: prod[0]?.productName || "test",
    qtdProduct: menosProd,
    valueBuyProduct: prod[0]?.valueBuyProduct || "00,00",
  });

  return sale;
};

const UpdateProductsForSales = async ({
  id,
  productName,
  valueBuyProduct,
  qtdProduct,
}: createProductsProps) => {
  const IdC = id || 0;
  const userData = User();
  const products = await GetProducts();
  const filtered = products.filter((item: any, index: number) => index != IdC);

  const product = await accessDb("products")
    .doc(userData?.uid)
    .set(
      {
        product: [
          {
            productName,
            valueBuyProduct,
            qtdProduct,
          },
          ...filtered,
        ],
      },
      { merge: true }
    );

  return product;
};

const GetSales = async () => {
  const userData = User();
  const sales = await firebaseDb
    .doc("sales/" + userData?.uid)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    });
  return sales?.sales;
};

const GetProducts = async () => {
  const userData = User();
  const products = await firebaseDb
    .doc("products/" + userData?.uid)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    });
  return products?.product;
};

const GetProduct = async (id: number) => {
  const userData = User();
  const products = await firebaseDb
    .doc("products/" + userData?.uid)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    });

  const filtered = products?.product.filter(
    (item: any, index: number) => index == id - 1
  );
  return filtered;
};

const GetMarkup = async () => {
  const userData = User();
  const markup = await firebaseDb
    .doc("markup/" + userData?.uid)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    });
  return markup;
};

const CreateProducts = async ({
  productName,
  valueBuyProduct,
  qtdProduct,
}: createProductsProps) => {
  const userData = User();
  const products = await GetProducts();
  const Itprod = products ? products : [];
  const product = await accessDb("products")
    .doc(userData?.uid)
    .set(
      {
        product: [
          ...Itprod,
          {
            productName,
            valueBuyProduct,
            qtdProduct,
          },
        ],
      },
      { merge: true }
    );

  return product;
};

const CreateMarkup = async ({ df, dv, ml }: createMarkupProps) => {
  const dfP = df / 100;
  const dvP = dv / 100;
  const mlP = ml / 100;
  const im = 1 / (1 - (dfP + dvP + mlP));

  const userData = User();
  const markup = await accessDb("markup").doc(userData?.uid).set(
    {
      df: dfP,
      dv: dvP,
      ml: mlP,
      im: im,
    },
    { merge: true }
  );

  return im;
};

const UpdateProducts = async ({
  id,
  productName,
  valueBuyProduct,
  qtdProduct,
}: createProductsProps) => {
  const IdC = id || 0;
  const userData = User();
  const products = await GetProducts();
  const filtered = products.filter(
    (item: any, index: number) => index != IdC - 1
  );

  const product = await accessDb("products")
    .doc(userData?.uid)
    .set(
      {
        product: [
          {
            productName,
            valueBuyProduct,
            qtdProduct,
          },
          ...filtered,
        ],
      },
      { merge: true }
    );

  return product;
};

const DeleteProducts = async (indexD: number) => {
  const userData = User();
  const products = await GetProducts();
  const Itprod = products ? products : [];
  const indexCD = indexD == 0 ? indexD : indexD - 1;

  const filtered = Itprod.filter(
    (item: any, index: number) => index != indexCD
  );
  await accessDb("products")
    .doc(userData?.uid)
    .set(
      {
        product: [...filtered],
      },
      { merge: true }
    );

  return filtered;
};

const DeleteSales = async (indexD: number) => {
  const userData = User();
  const sales = await GetSales();
  const Itsales = sales ? sales : [];
  const indexCD = indexD == 0 ? indexD : indexD - 1;

  const filtered = Itsales.filter(
    (item: any, index: number) => index != indexCD
  );
  await accessDb("sales")
    .doc(userData?.uid)
    .set(
      {
        sales: [...filtered],
      },
      { merge: true }
    );

  return filtered;
};

const accessDb = (collection: string) => {
  return firebaseDb.collection(collection);
};

export {
  googleAuth,
  createEmailAuth,
  loginEmail,
  CreateProducts,
  GetProducts,
  GetProduct,
  UpdateProducts,
  DeleteProducts,
  DeleteSales,
  CreateMarkup,
  GetMarkup,
  CreateSales,
  GetSales,
};
