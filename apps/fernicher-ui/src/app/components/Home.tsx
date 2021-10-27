import axios from 'axios';
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import Map from './Map/Map';

function Home(props : any) {

  const [usersAndProducts, setUsersAndProducts] = useState([]);
  // const { state, dispatch } = useApplicationData();
  console.log("PROPS ARE: ", {...props})
  useEffect(() => {
    axios
      .post<any[]>('/api/users')
      .then((res) => {
        const products: any = [];
        map(res.data, (user) => {
          products.push(
            ...map(user.products, (product) => ({ ...product, user }))
          );
        });
        setUsersAndProducts(products);
      })
      .catch((err) => console.log('ERR HAPPENED', err));
  }, []);

  return (
    <div>
      <Map usersAndProducts={usersAndProducts} />
    </div>
  );
}

export default Home;
