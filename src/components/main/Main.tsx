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
              <br /> 한 편의 시와 소설을 추천해드리겠습니다.
            </p>
          </div>
          <div className="main_bottom_top_area">
            <div className="main_bottom_top_area_block">
              <Link to="/project">
                <button
                  type="button"
                  className="main_bottom_top_area_block_btn"
                  // onClick={() => navigate('/project')}
                >
                  프로젝트 생성
                </button>
              </Link>
            </div>
          </div>
          {/* <div className="main_bottom_area">
            <div className="main_bottom_area_project">
              <div className="main_bottom_area_project_title_block">
                <p className="main_bottom_area_project_title_block_text">
                  힐링 여행 일기
                </p>
                <div className="main_bottom_area_project_title_block_loc">
                  국내
                </div>
              </div>
              <div className="main_bottom_area_project_content_block">
                <p className="main_bottom_area_project_content_block_date">
                  2023-02-18 ~ 2023-02-20
                </p>
                <p className="main_bottom_area_project_content_block_detail_loc">
                  부산,김해
                </p>
              </div>
            </div>
            <div className="main_bottom_area_project" />
            <div className="main_bottom_area_project" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
