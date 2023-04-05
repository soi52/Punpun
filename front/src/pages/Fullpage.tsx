import React, { useState } from 'react';
import ReactPageScroller, { SectionContainer } from 'react-page-scroller';
// import { Pager } from 'react-bootstrap';

import FirstComponent from '../components/main/FirstComponent';
import SecondComponent from '../components/main/SecondComponent';
import ThirdComponent from '../components/main/ThirdComponent';
import FourthComponent from '../components/main/FourthComponent';
import FifthComponent from '../components/main/FifthComponent';
// import useScrollFadeInPage from './owner/useScrollFadeInPage';
import Header from '../components/ui/Header';

// type FullPageState = {
//   currentPage: number | null;
// };

const FullPage = () => {
  // const [currentPage, setCurrentPage] = useState<number | null>(null);

  // const handlePageChange: (eventKey: any) => void = (number) => {
  //   setCurrentPage(number);
  // };

  // const handleBeforePageChange = (number: number) => {
  //   console.log(number);
  // };

  const onSelect = (item: string) => {
    console.log(item);
  };

  // const getPagesNumbers = () => {
  //   const pageNumbers = [];

  //   for (let i = 1; i <= 5; i++) {
  //     pageNumbers.push(
  //       <Pager.Item key={i} eventKey={i - 1} onSelect={handlePageChange}>
  //         {i}
  //       </Pager.Item>
  //     );
  //   }

  //   return [...pageNumbers];
  // };

  // const pagesNumbers = getPagesNumbers();

  return (
    <>
      <Header onSelect={onSelect} />
      <ReactPageScroller
      // pageOnChange={handlePageChange}
      // onBeforePageScroll={handleBeforePageChange}
      // customPageNumber={currentPage ?? undefined}
      >
        <FirstComponent />
        {/* <SectionContainer height={50}> */}
          <SecondComponent />
        {/* </SectionContainer> */}
        <ThirdComponent />
        <FourthComponent />
        <FifthComponent />
      </ReactPageScroller>
    </>
  );
};

export default FullPage;
