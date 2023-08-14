import React, { useEffect, useState } from 'react';

import ModalRegisterProject from '../popup/ModalRegisterProject';
import Content from './Content';

const Project: React.FC = () => {
  const [projectTitleState, setProjectTitleState] =
    useState<string>('제목을 입력하세요');

  return (
    <div>
      <div className="project_background">
        <ModalRegisterProject />
        <div className="project_top">
          <div className="project_top_block">
            <h1 className="project_top_block_title">{projectTitleState}</h1>
          </div>
        </div>
        <Content setProjectTitleState={setProjectTitleState} />
      </div>
    </div>
  );
};

export default Project;
