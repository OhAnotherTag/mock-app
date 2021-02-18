import { Machine, assign, send, spawn } from 'xstate';
import { SignInMachine } from './FormMachine';
import { CartMachine } from './CartMachine';

const AuthMachine = Machine(
  {
    id: 'auth',
    initial: 'unauthorized',
    context: {
      user: undefined,
      signinRef: null,
      cartRef: null,
    },
    states: {
      unauthorized: {
        entry: 'spawnChildren',
      },
      authorized: {
        on: {
          SIGNOUT: {
            actions: 'performSignout',
            target: 'unauthorized',
          },
        },
      },
    },
    on: {
      'SIGNIN.COMPLETE': {
        target: 'authorized',
        actions: ['setUser', 'initializeCart'],
      },
    },
  },
  {
    actions: {
      resetUser: assign({
        user: undefined,
      }),
      setUser: assign({
        user: (ctx, e) => e.user,
      }),
      initializeCart: (ctx) =>
        ctx.cartRef.send({ type: 'INITIALIZE', userId: ctx.user.id }),
      spawnChildren: assign({
        signinRef: () => spawn(SignInMachine, { sync: true }),
        cartRef: () => spawn(CartMachine, { sync: true }),
      }),
      performSignout: assign({
        user: undefined,
        signinRef: null,
        cartRef: null,
      }),
    },
  }
);

export { AuthMachine };
