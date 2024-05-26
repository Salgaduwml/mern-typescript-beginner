import { useForm } from "react-hook-form";
import { User } from "../types/user";
import { LoginCredentials } from "../network/note_api";
import * as NotesApi from "../network/note_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import { useState } from "react";
import { UnauthorizedError } from "../errors/htpp_errors";

interface LoginModelProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModel = ({ onDismiss, onLoginSuccessful }: LoginModelProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();
  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await NotesApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header>Log in</Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)} id="signUp">
          <TextInputField
            name="username"
            type="text"
            label="Username"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" disabled={isSubmitting} form="signUp">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModel;
