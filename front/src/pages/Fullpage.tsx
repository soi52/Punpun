import React, { useState } from 'react';
import ReactPageScroller, { SectionContainer } from 'react-page-scroller';

import FirstComponent from '../components/main/FirstComponent';
import SecondComponent from '../components/main/SecondComponent';
import ThirdComponent from '../components/main/ThirdComponent';
import FourthComponent from '../components/main/FourthComponent';
import FifthComponent from '../components/main/FifthComponent';
import Header from '../components/ui/Header';

const FullPage = () => {
  const onSelect = (item: string) => {
    console.log(item);
  };

  return (
    <>
      <Header onSelect={onSelect} />
      <ReactPageScroller>
        <SecondComponent />
        <ThirdComponent />
        {/* <FourthComponent /> */}
        {/* <FifthComponent /> */}
        {/* <SectionContainer height={50}></SectionContainer> */}
        <FirstComponent />
      </ReactPageScroller>
    </>
  );
};

export default FullPage;
