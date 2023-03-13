import React from 'react';
import MainComponent from '../../components/ui/MainComponent';
import Sidebar from '../../components/ui/Sidebar';

function ChUserPage () {
  return (
    <div>
        <h1>아동 마이페이지 입니다.</h1>
        <Sidebar/>
        <MainComponent
            width={50}/>
    </div>
  )
}
export default ChUserPage;