import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { projectTitleAtom, resultAtom } from '../../recoil/Atoms';

const Result = () => {
  const [responseState] = useRecoilState<any>(resultAtom);
  const [projectTitleState] = useRecoilState<string>(projectTitleAtom);

  const paragraphs = responseState ? responseState.split('\n') : [];
  const queryParamsRegex = /\?(.+)/;
  const queryParamsMatch = responseState.match(queryParamsRegex);

  const goToMusic = (link: string) => {
    window.location.href = `https://www.youtube.com/watch${link}`;
  };

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
          <p>
            <button
              type="button"
              onClick={() => goToMusic(queryParamsMatch[0])}
            >
              음악 듣기
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
