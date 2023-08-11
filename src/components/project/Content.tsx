// import { Content } from 'leaflet';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { modalAtom, placeAtom } from '../../recoil/Atoms';

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

interface ContentPropsType {
  setProjectTitleState: React.Dispatch<React.SetStateAction<string>>;
}

const Content = (props: ContentPropsType) => {
  const { setProjectTitleState } = props;
  const [placeStore] = useRecoilState<any[]>(placeAtom);
  const [modalState, setModalState] = useRecoilState<boolean>(modalAtom);

  const choiceHour = () => {
    const times = [];

    for (let i = 0; i <= 23; i += 1) {
      const timeForm = i < 10 ? `0${i}` : `${i}`;
      times.push(timeForm);
    }
    return times;
  };

  const choiceMin = () => {
    const times = [];

    for (let i = 0; i <= 60; i += 1) {
      const timeForm = i < 10 ? `0${i}` : `${i}`;
      times.push(timeForm);
    }
    return times;
  };

  return (
    <div className="project_bottom">
      <div className="project_bottom_top_area">
        <div className="project_bottom_top_area_block">
          <button
            type="button"
            className="project_bottom_top_area_block_btn"
            onClick={() => setModalState(true)}
          >
            지도 열기
          </button>
        </div>
      </div>
      <div className="project_bottom_area">
        <div className="project-title">
          <p className="project-title_intro">프로젝트 명 : </p>
          <div className="project-title_text-box">
            <input
              className="input-text"
              type="text"
              onChange={(event) =>
                setProjectTitleState(event.currentTarget.value)
              }
            />
          </div>
        </div>
        {modalState === false &&
          placeStore.map((place, num) => (
            <div className="project_block" key={`places${Number(num)}`}>
              <div>
                <p>{place.place_name}</p>
                <p>{place.address_name}</p>
              </div>
              <div>
                <div>
                  <select>
                    {choiceHour().map((hour) => (
                      <option key={Number(hour)}>{hour}</option>
                    ))}
                  </select>
                </div>
                <span> : </span>
                <div>
                  <select>
                    {choiceMin().map((min) => (
                      <option key={Number(min)}>{min}</option>
                    ))}
                  </select>
                </div>
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
          ))}
      </div>
    </div>
  );
};

export default Content;
