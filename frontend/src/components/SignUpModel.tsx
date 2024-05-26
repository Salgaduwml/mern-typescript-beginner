import { useForm } from "react-hook-form";
import { User } from "../types/user";
import { SignUpCredentials } from "../network/note_api";
import * as NotesApi from "../network/note_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import { ConflictError } from "../errors/htpp_errors";
import { useState } from "react";

interface SignUpModelProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModel = ({ onDismiss, onSignUpSuccessful }: SignUpModelProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();
  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header>Sign Up</Modal.Header>
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
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
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

export default SignUpModel;
