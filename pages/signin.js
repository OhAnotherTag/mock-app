import React, { useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import ValidationSchema from '../utils/formValidationSchemas';
import { useService, useActor } from '@xstate/react';
import { useRouter } from 'next/router';
import { useAuthService } from '../context/AuthContext';
import {
  FormControl,
  Input,
  FormLabel,
  Button,
  Heading,
} from '@chakra-ui/react';

function Signin() {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: ValidationSchema.Login,
  });

  const router = useRouter();

  const service = useAuthService();

  const [authState] = useService(service);
  const [signInState, signInSender] = useActor(authState.context.signinRef);

  const { context } = authState.context.signinRef.state;

  useLayoutEffect(() => {
    if (context.userId) {
      router.push('/');
    }
  }, [context]);

  function onSubmit(data, event) {
    event.preventDefault();

    signInSender({ type: 'SUBMIT', value: data });
  }

  function onError(errors, event) {
    console.error(errors);
  }

  return (
    <main id="login">
      <Heading as="h1" size="2xl">
        Sign In
      </Heading>
      <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
        <FormControl className="input-group" isRequired>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            placeholder="Username"
            id="username"
            name="username"
            type="text"
            ref={register}
            variant="unstyled"
            size="lg"
          />
        </FormControl>
        <FormControl className="input-group" isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            ref={register}
            variant="unstyled"
            size="lg"
          />
        </FormControl>
        <Button
          type="submit"
          size="lg"
          isLoading={signInState.value === 'sending'}
        >
          SUBMIT
        </Button>
      </form>
      <small>{signInState.value}</small>
    </main>
  );
}

export default Signin;
