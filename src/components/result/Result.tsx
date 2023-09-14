import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { projectTitleAtom, resultAtom } from '../../recoil/Atoms';

const Result = () => {
  const [responseState] = useRecoilState<any>(resultAtom);
  const [projectTitleState] = useRecoilState<string>(projectTitleAtom);

  console.log(
    'responseState',
    JSON.stringify({ key: 'apiResult' }),
    responseState,
  );

  useEffect(() => {
    console.log('responseState2', responseState);
  }, [responseState]);

  const paragraphs = responseState ? responseState.split('\n') : [];

  return (
    <div className="response-block">
      <div className="response-block_inner">
        <p className="project-title">{projectTitleState}</p>
        <div className="response-text">
          {responseState === null
            ? '글을 불러온는 중입니다.'
            : // 각 문단을 <p> 태그로 렌더링
              paragraphs.map((paragraph: any, index: number) => (
                <p key={`result${Number(index)}`}>{paragraph}</p>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
