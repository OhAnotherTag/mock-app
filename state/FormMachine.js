import { Machine, assign, sendParent, send, sendUpdate, spawn } from 'xstate';
import { login } from '../lib/authAPI'

function formMachineFactory(request, id) {
  return Machine(
    {
      id,
      initial: 'waitingInput',
      context: {
        username: undefined,
        password: undefined,
        error: undefined,
        userId: undefined,
      },
      states: {
        waitingInput: {
          on: {
            SUBMIT: {
              target: 'sending',
              actions: 'setFormData',
            },
          },
        },
        sending: {
          invoke: {
            src: (ctx) => request(ctx.username, ctx.password),
            onDone: {
              target: 'success',
              actions: 'onSuccess',
            },
            onError: {
              target: 'error',
              actions: 'onError',
            },
          },
        },
        success: {
          type: 'final',
          entry: sendParent((ctx) => ({
            type: `${id.toUpperCase()}.COMPLETE`,
            user: { username: ctx.username, id: ctx.userId },
          })),
        },
        error: {
          on: {
            RESEND: 'waitingInput',
          },
        },
      },
    },
    {
      actions: {
        setFormData: assign((ctx, e) => {
          return {
            username: e.value.username,
            password: e.value.password,
          };
        }),
        onSuccess: assign((ctx, e) => {
          return {
            error: undefined,
            userId: e.data,
          };
        }),
        onError: assign({
          error: (ctx, e) => e.data,
        }),
      },
    }
  );
}

const SignInMachine = formMachineFactory(login, 'signin');

export { SignInMachine };
