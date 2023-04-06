import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../store/atoms';

import MainMessage from '../ui/MainMessage';
import MainTitle from '../ui/MainTitle';

function ChMainMessage() {
  const userInfo = useRecoilValue(userInfoState);

  const mainMessage = {
    title: '',
    ownerName: `${userInfo.userName} 학생`,
    message: '오늘도 맛있는 밥 먹어요~!',
    name: `${userInfo.userName} 학생`,
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

export default ChMainMessage;
