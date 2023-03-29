import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../store/atoms';

import MainMessage from '../ui/MainMessage';
import MainTitle from '../ui/MainTitle';

function SuMainMessage() {
  const userInfo = useRecoilValue(userInfoState);

  const mainMessage = {
    title: '',
    ownerName: `${userInfo.userName} 후원자님`,
    message: '어느새 후원한 금액이 10,000원 이네요!',
    name: `${userInfo.userName} 후원자님`,
  };
  return (
    <>
      <h2>
        <MainTitle title={`${mainMessage.name} ${mainMessage.title}`} />
      </h2>
      <MainMessage
        message={`${mainMessage.ownerName}, ${mainMessage.message}`}
      />
    </>
  );
}

export default SuMainMessage;
