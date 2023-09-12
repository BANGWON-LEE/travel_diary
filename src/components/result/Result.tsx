import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { resultAtom } from '../../recoil/Atoms';

const Result = () => {
  const [responseState] = useRecoilState<any>(resultAtom);

  console.log(
    'responseState',
    JSON.stringify({ key: 'apiResult' }),
    responseState,
  );

  useEffect(() => {
    console.log('responseState2', responseState);
  }, [responseState]);

  return (
    <div>
      {responseState === null ? '글을 불러온는 중입니다.' : responseState}
    </div>
  );
};

export default Result;
