import { useEffect, useState } from 'react';
import axios from 'axios';

const StoreHour = () => {
  const [storeData, setStoreData] = useState({});

  useEffect(() => {
    axios
      .get('/api/store', {
        params: {
          storeId: 'storeId',
        },
      })
      .then((response) => {
        setStoreData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {/* <p>{storeData.storeName}</p>
      <p>{storeData.storeOpenTime}</p> */}
    </div>
  );
};

export default StoreHour;
