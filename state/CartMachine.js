import { Machine, assign, sendParent, send, spawn } from 'xstate';
import { getUserCart } from '../lib/userAPI';

export const createCartItemMachine = ({ id, qty }) => {
  return Machine(
    {
      id: 'cartItem',
      initial: 'waiting',
      context: {
        id,
        qty: Number(qty),
      },
      states: {
        waiting: {},
      },
      on: {
        'QTY.CHANGE': {
          actions: ['updateQuantity', 'updateCart'],
        },
        REMOVE: {
          actions: ['removeItem'],
        },
      },
    },
    {
      actions: {
        updateQuantity: assign({
          qty: (ctx, e) => Number(e.value),
        }),
        updateCart: sendParent((ctx) => ({
          type: 'ITEM.UPDATE',
          item: ctx,
        })),
        removeItem: sendParent((ctx) => ({
          type: 'ITEM.REMOVE',
          id: ctx.id,
        })),
      },
    }
  );
};

function createCartItem(id) {
  return {
    id,
    qty: 1,
  };
}

export const CartMachine = Machine(
  {
    id: 'cart',
    initial: 'initializing',
    context: {
      userId: undefined,
      cart: [],
    },
    states: {
      initializing: {
        on: {
          INITIALIZE: {
            actions: ['setUserId'],
            target: 'load',
          },
        },
      },
      load: {
        invoke: {
          src: (ctx, e) => getUserCart(ctx.userId),
          onDone: {
            actions: 'onSuccess',
          },
          onError: {
            actions: 'onError',
          },
        },
      },
    },
    on: {
      'ITEM.ADD': {
        actions: ['addToCart'],
      },
      'ITEM.REMOVE': {
        actions: ['removeFromCart'],
      },
      'ITEM.UPDATE': {
        actions: ['updateCart'],
      },
    },
  },
  {
    actions: {
      setUserId: assign({ userId: (ctx, e) => e.userId }),
      addToCart: assign({
        cart: (ctx, e) => {
          let index = ctx.cart.findIndex((item) => item.id === e.value);

          if (index >= 0) {
            return ctx.cart.map((item) => {
              if (item.id === e.value) {
                item.ref.send({
                  type: 'QTY.CHANGE',
                  value: Number(item.qty) + 1,
                });

                return { ...item, qty: Number(item.qty) + 1 };
              } else {
                return item;
              }
            });
          } else {
            let newItem = createCartItem(e.value);

            return ctx.cart.concat({
              ...newItem,
              ref: spawn(createCartItemMachine(newItem)),
            });
          }
        },
      }),
      updateCart: assign({
        cart: (ctx, e) => {
          return ctx.cart.map((item) => {
            return item.id === e.item.id
              ? { ...item, qty: e.item.qty, ref: item.ref }
              : item;
          });
        },
      }),
      removeFromCart: assign({
        cart: (ctx, e) => ctx.cart.filter((item) => item.id !== e.id),
      }),
      onSuccess: assign({
        error: undefined,
        cart: (ctx, e) => {
          return e.data.map((d) => ({
            ...d,
            ref: spawn(createCartItemMachine(d)),
          }));
        },
      }),
      onError: assign({
        error: (ctx, e) => e.data,
        cart: [],
      }),
    },
  }
);
