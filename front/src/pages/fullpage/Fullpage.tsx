import React, { useState } from 'react';
import ReactPageScroller, { SectionContainer } from 'react-page-scroller';
import { Pager } from 'react-bootstrap';

import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';
import ThirdComponent from './ThirdComponent';
import FourthComponent from './FourthComponent';
import FifthComponent from './FifthComponent';
import useScrollFadeInPage from '../owner/useScrollFadeInPage';

type FullPageState = {
  currentPage: number | null;
};

const FullPage = () => {
  const [currentPage, setCurrentPage] = useState<number | null>(null);

  const handlePageChange: (eventKey: any) => void = (number) => {
    setCurrentPage(number);
  };

  const handleBeforePageChange = (number: number) => {
    console.log(number);
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
      <ReactPageScroller
        pageOnChange={handlePageChange}
        onBeforePageScroll={handleBeforePageChange}
        customPageNumber={currentPage ?? undefined}
      >
        <FirstComponent />
        <SectionContainer height={50}>
          <SecondComponent />
        </SectionContainer>
        <ThirdComponent />
        <FourthComponent />
        <FifthComponent />
      </ReactPageScroller>
    </>
  );
};

export default FullPage;
