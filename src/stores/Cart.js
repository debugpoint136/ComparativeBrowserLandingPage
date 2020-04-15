import { writable } from 'svelte/store';

  function createStore() {
    const {subscribe, set, update} = writable({
      sourceOptions: [],
      targetOptions: [],
      sourceChecked: '',
      targetChecked: '',
      selection: []
    });

    return {
      subscribe,
      addDataItems: (newVal) => update(n => {
        n.data = newVal;
        return n;
      }),
      addRepeats: (newVal) => update(n => {
        n.repeats = newVal;
        return n;
      }),
      setSourceOptions: (input) => update(n => {
        n.sourceOptions = input;
        return n;
      }),
      setTargetOptions: (input) => update(n => {
        n.targetOptions = input;
        return n;
      }),
      setSourceChecked: (input) => update(n => {
        n.sourceChecked = input;
        return n;
      }),
      setTargetChecked: (input) => update(n => {
        n.targetChecked = input;
        return n;
      })
    }
  }
  export const Cart = createStore();