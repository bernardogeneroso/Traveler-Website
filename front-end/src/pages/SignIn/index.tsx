import React, { useRef, useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { FiInfo } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import Input from "../../components/Input";
import getValidationErrors from "./../../utils/getValidationErrors";
import { useAuth } from "../../hooks/Auth";
import { useToast } from "../../hooks/Toast";

import {
  Container,
  Background,
  PanelRight,
  ContentPanelRight,
  ContainerOptions,
  HeaderGoBack,
  Footer,
} from "./styles";

import background from "../../assets/signin/background.png";

interface SignInData {
  email: string;
  password: string;
}

const SignIn = () => {
  const history = useHistory();
  const { user, signIn } = useAuth();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const [remember, setRemember] = useState<boolean>(() => {
    const checkRemember = localStorage.getItem("Traveler:signin-form");

    if (!!checkRemember) return true;

    return false;
  });

  useEffect(() => {
    if (user) history.push("/");
  }, [user, history]);

  const handleSubmit = useCallback(
    async (data: SignInData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("The E-mail field is required")
            .email("Write a valid email"),
          password: Yup.string().required("The Password field is required"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password }, remember);

        history.push("/cities");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);

          formRef.current?.setErrors(erros);

          return;
        }

        addToast({
          type: "error",
          title: "Authentication error",
          description: err.response.data.error_message,
        });
      }
    },
    [remember, signIn, addToast, history]
  );

  const handleChangeRemember = useCallback(() => {
    setRemember((state) => !state);
  }, []);

  return (
    <Container>
      <Background image={background} />

      <PanelRight>
        <HeaderGoBack>
          <Link to="/">
            <IoMdArrowBack size={26} color="#A0ACB2" />
          </Link>
        </HeaderGoBack>
        <ContentPanelRight>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Fazer login</h2>

            <Input
              name="email"
              position="top"
              type="text"
              placeholder="E-mail"
            />
            <Input
              name="password"
              position="bottom"
              type="password"
              placeholder="Senha"
              icon
            />

            <ContainerOptions>
              <div className="form-group">
                <input
                  type="checkbox"
                  id="saveData"
                  defaultChecked={remember}
                  onChange={handleChangeRemember}
                />
                <label htmlFor="saveData">Lembrar-me</label>
              </div>

              <Link to="/">Esqueci minha senha</Link>
            </ContainerOptions>

            <button>Aceder a plataforma</button>
          </Form>
        </ContentPanelRight>
        <Footer>
          <FiInfo size={26} color="#f25d27" />
          <p>Acesso restrito à sócios e moderadores</p>
        </Footer>
      </PanelRight>
    </Container>
  );
};

export default SignIn;
