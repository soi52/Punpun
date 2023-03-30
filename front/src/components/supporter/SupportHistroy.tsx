import { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../../store/API';

interface SupportData {
  supportId: number;
  supportState: string;
  supportCreationDate: string;
  storeId: number;
  storeName: string;
  menuId: number;
  menuName: string;
  menuPrice: number;
}

const SupportHistory = () => {
  const [supportData, setSupportData] = useState<SupportData[]>([]);

  // useEffect(() => {
  //   const fetchSupportData = async () => {
  //     try {
  //       const response = await axios.get('/supports');
  //       setSupportData(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchSupportData();
  // }, []);
  useEffect(() => {
    API.get('supports')
      .then((response: any) => {
        console.log(response.data);
        // setSupportData(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {supportData.map((support) => (
        <div key={support.supportId}>
          <p>Support ID: {support.supportId}</p>
          <p>Support State: {support.supportState}</p>
          <p>Support Creation Date: {support.supportCreationDate}</p>
          <p>Store ID: {support.storeId}</p>
          <p>Store Name: {support.storeName}</p>
          <p>Menu ID: {support.menuId}</p>
          <p>Menu Name: {support.menuName}</p>
          <p>Menu Price: {support.menuPrice}</p>
        </div>
      ))}
    </>
  );
};

export default SupportHistory;
