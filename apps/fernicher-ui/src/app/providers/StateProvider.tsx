import { createContext, useState } from 'react';

export const stateContext = createContext<{
  products?: any[];
  setProducts?: any;
}>({});

export default function StateProvider(props: any) {
  const [products, setProducts] = useState<any[]>([]);

  // This list can get long with a lot of functions.  Reducer may be a better choice
  const providerData = { products, setProducts };

  // We can now use this as a component to wrap anything
  // that needs our state
  return (
    <stateContext.Provider value={providerData}>
      {props.children}
    </stateContext.Provider>
  );
}
