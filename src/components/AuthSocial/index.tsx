import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { googleAuth } from "../../services/firebase/api";
import Button from "../Button";
import Modal from "../Modal";

const AuthSocial: React.FC = () => {
  const history = useHistory();
  const [seeModal, setSeeModal] = React.useState(false);
  const { login } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      const response = await googleAuth();
      if (response) {
        login(response.user);
        history.push("/dashboard");
      } else {
        setSeeModal(true);
      }
    } catch (error) {
      setSeeModal(true);
    }
  };

  return (
    <>
      <Modal
        id="authmodal"
        title="Ops! Algo de errado aconteceu 😔"
        description="Parece que deu algum erro ao tentar entrar com o Google, tente novamente mais tarde."
        button="Fechar"
        timer={5}
        active={seeModal}
        closeModal={setSeeModal}
      />
      <Button
        type="button"
        typeText="capitalize"
        color="flex bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700"
        onClick={handleLoginGoogle}
      >
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="mr-2"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
        </svg>
        {"Google"}
      </Button>
    </>
  );
};

export default AuthSocial;
