import StoreInfo from '../StoreInfo';
import PrevBookings from './PrevBookings';

function BookingToday() {
  return (
    <>
      <StoreInfo/>
      <h2>이전 예약 내역</h2>
      <PrevBookings/>
    </>
  );
}
export default BookingToday;
