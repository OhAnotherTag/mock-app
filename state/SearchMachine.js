import { Machine, assign } from 'xstate';
const SearchMachine = Machine(
  {
    id: 'search',
    initial: 'waitingInput',
    context: {
      param: undefined,
    },
    states: {
      waitingInput: {}
    },
    on: {
      'SEARCH.CHANGE': {
        actions: assign({
          todo: (_, event) => event.value,
        }),
      },
    },
  },
  {
    actions: {
      onChange: assign({
        param: (_, event) => event.value,
      }),
    },
  }
);

export default SearchMachine
