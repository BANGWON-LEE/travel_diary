import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Main: React.FC = () => {
  return (
    <div>
      <div className="main_background">
        <div className="main_top">
          <div className="main_top_block">
            <h1 className="main_top_block_title">Travel Diary</h1>
          </div>
        </div>
        <div className="main_bottom">
          <div className="main_project_intro">
            <p>
              당신이 여행 경험을 공유해주시면,
              <br /> 여행기에 어울리는 <br />
              음악을 소개해드립니다.
            </p>
          </div>
          <div className="main_bottom_top_area">
            <div className="main_bottom_top_area_block">
              <Link to="/project">
                <button
                  type="button"
                  className="main_bottom_top_area_block_btn"
                >
                  프로젝트 생성
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
