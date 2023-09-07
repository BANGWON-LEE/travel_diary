import React, { useMemo, useState } from 'react';

import ModalRegisterProject from '../popup/ModalRegisterProject';
import Content from './Content';

const Project: React.FC = () => {
  const [projectTitleState, setProjectTitleState] =
    useState<string>('제목을 입력하세요');

  const titleState = useMemo(() => {
    return projectTitleState;
  }, [projectTitleState]);

  return (
    <div className="project_background">
      <div className="project_background_inner">
        <ModalRegisterProject />
      </div>
      <div className="project_top">
        <div className="project_top_block">
          <h1 className="project_top_block_title">{titleState}</h1>
        </div>
      </div>
      <Content setProjectTitleState={setProjectTitleState} />
    </div>
  );
};

export default Project;
