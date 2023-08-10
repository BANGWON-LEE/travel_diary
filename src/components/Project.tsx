import React, { useEffect, useState } from 'react';

import ModalRegisterProject from './popup/ModalRegisterProject';

const emotionFood = [
  '존맛',
  '별로',
  '황홀',
  '최악',
  '그저 그런',
  '돈이 아까운',
];

const emotionView = [
  '존멋',
  '별로',
  '황홀',
  '최악',
  '그저 그런',
  '생각보다 별로',
];

const emotionGoods = [
  '예뻐서',
  '멋있어서',
  '필수라서',
  '어쩔 수 없이',
  '선물하려고',
  '돈이 남아서',
  '강매 당해서',
];

const Project: React.FC = () => {
  const [modalStatus, setModalStatus] = useState<boolean>(true);

  return (
    <div>
      <div className="main_background">
        <ModalRegisterProject
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
        />
        <div className="main_top">
          <div className="main_top_block">
            <h1 className="main_top_block_title">프로젝트 제목</h1>
          </div>
        </div>
        <div className="main_bottom">
          <div className="main_bottom_top_area">
            <div className="main_bottom_top_area_block">
              <button
                type="button"
                className="main_bottom_top_area_block_btn"
                onClick={() => setModalStatus(true)}
              >
                지도 열기
              </button>
            </div>
          </div>
          <div className="main_bottom_area">
            <div>
              <p>프로젝트 명</p>
              <input type="text" />
            </div>
            <div>
              <div>
                <p>지역명</p>
              </div>
              <div>
                <p>
                  <select>
                    <option>07:00</option>
                    <option>08:00</option>
                  </select>
                </p>
              </div>
              <div>
                <p>먹은 것</p>
                <input type="text" />
                <div>
                  <p>먹은 것에 대한 나의 emotion</p>
                  <div>
                    {emotionFood.map((emotion, index) => (
                      <div key={`emotionFood${Number(index)}`}>
                        <button type="button">{emotion}</button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p>직접 입력</p>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div>
                <p>본 것</p>
                <input type="text" />
                <div>
                  <p>본 것에 대한 나의 emotion</p>
                  <div>
                    {emotionView.map((emotion, index) => (
                      <div key={`emotionView${Number(index)}`}>
                        <button type="button">{emotion}</button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p>직접 입력</p>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div>
                <p>구입한 기념품</p>
                <input type="text" />
                <div>
                  <p>기념품을 구입한 이유</p>
                  <div>
                    {emotionGoods.map((emotion, index) => (
                      <div key={`emotionGoods${Number(index)}`}>
                        <button type="button">{emotion}</button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p>직접 입력</p>
                    <input type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
