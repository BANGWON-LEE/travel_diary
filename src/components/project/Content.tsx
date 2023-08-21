// import { Content } from 'leaflet';
import 'react-calendar/dist/Calendar.css'; // css import

import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { calendarDateAtom, modalAtom, placeAtom } from '../../recoil/Atoms';
import CalendarPop from './CalendarPop';

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

  // 달력 팝업을 불러오기 위한 state
  const [openCalendarState, setOpenCalendarState] = useState<boolean>(false);

  // 달력 팝업을 불러오는 버튼 정보를 가져오는 ref
  const calendarBtnRef = useRef<HTMLButtonElement | null>(null);

  const [choiceDate] = useRecoilState<any>(calendarDateAtom);

  const editCalendar = (editDate: Date) => {
    const year = editDate.getFullYear();
    const month = editDate.getMonth() + 1;
    const date = editDate.getDate();

    return `${year}년${month}월${date}일`;
  };

  return (
    <div className="project_bottom">
      <CalendarPop
        openCalendarState={openCalendarState}
        setOpenCalendarState={setOpenCalendarState}
        calendarBtnRef={calendarBtnRef}
      />
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
          <p className="project-title_intro">제목 : </p>
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
            <div className="project-block" key={`places${Number(num)}`}>
              <div className="project-block_title">
                <p className="project-block_title_place">{place.place_name}</p>
                <p className="project-block_title_address">
                  {place.address_name}
                </p>
              </div>
              <div className="project-block_content">
                <div className="project-block_content_time">
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenCalendarState(true)}
                      ref={calendarBtnRef}
                    >
                      달력
                    </button>
                  </div>
                  <div>{editCalendar(choiceDate)}</div>
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
                  <p>먹은 것을 입력하세요</p>
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
                  <p>본 것을 입력하세요</p>
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
                  <p>구입한 기념품을 입력하세요</p>
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
          ))}
      </div>
    </div>
  );
};

export default Content;
