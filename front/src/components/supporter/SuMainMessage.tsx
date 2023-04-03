import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import API from '../../store/API';
import { usePointState, userInfoState } from '../../store/atoms';

import MainMessage from '../ui/MainMessage';
import MainTitle from '../ui/MainTitle';

function SuMainMessage() {
  const userInfo = useRecoilValue(userInfoState);
  // const [usePoint, setUsePoint] = useRecoilState(usePointState);

  // useEffect(() => {
  //   API.get('payments/total')
  //     .then((response: any) => {
  //       console.log(response.data);
  //       setUsePoint(response.data.memberPoint);
  //     })
  //     .catch((error: any) => {
  //       console.error(error);
  //     });
  // }, []);

  const usePoint = userInfo.userSupportedPoint;
  const formattedPoint = usePoint ? usePoint.toLocaleString() : '';

  const mainMessage = {
    title: '',
    ownerName: `${userInfo.userName} 후원자님`,
    message: `어느새 후원한 금액이 ${formattedPoint}원 이네요!`,
    name: `${userInfo.userName} 후원자님`,
  };
  return (
    <>
      <h2>
        <MainTitle title={`${mainMessage.name} ${mainMessage.title}`} />
      </h2>
      <MainMessage
        message={`　${mainMessage.ownerName}, ${mainMessage.message}`}
      />
    </>
  );
}

export default SuMainMessage;
