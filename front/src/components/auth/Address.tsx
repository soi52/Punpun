import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useGeolocation from '../../common/UseGeolocation';
import { addressState } from '../../store/atoms';

function Address() {
  const [address, setAddress] = useRecoilState(addressState);

  const location = useGeolocation();
  const { latitude = 0, longitude = 0 } =
    typeof location === 'object' ? location : {};

  function getAddr(lat: any, lng: any) {
    let geocoder = new kakao.maps.services.Geocoder();

    let coord = new kakao.maps.LatLng(lat, lng);
    let callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const arr = { ...result };
        const _arr =
          arr[0].address.region_1depth_name +
          ' ' +
          arr[0].address.region_2depth_name;
        setAddress(_arr);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }

  useEffect(() => {
    getAddr(latitude, longitude);
  }, [address]);

  return null;
}

export default Address;
