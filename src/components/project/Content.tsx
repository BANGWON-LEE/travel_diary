// import { Content } from 'leaflet';
import 'react-calendar/dist/Calendar.css'; // css import

// import console from 'console';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { calendarDateAtom, modalAtom, placeAtom } from '../../recoil/Atoms';
import CalendarPop from './CalendarPop';

const emotionFood = [
  ['존맛', '별로', '황홀'],
  ['최악', '그저 그런', '돈이 아까운'],
];

const emotionView = [
  ['존멋', '별로', '황홀'],
  ['최악', '그저 그런', '생각보다 별로'],
];

const emotionGoods = [
  ['예뻐서', '멋있어서', '필수라서'],
  ['어쩔 수 없이', '선물하려고', '돈이 남아서', '강매 당해서'],
];

interface CalendarBtnDomType {
  place: any;
  openCalendarState: boolean;
  // onClick: any;
  setOpenCalendarState: React.Dispatch<React.SetStateAction<boolean>>;
  // calendarBlockRef: React.RefObject<HTMLDivElement | null>;
}

const CalendarBtnDom = (props: CalendarBtnDomType) => {
  const {
    place,
    // onClick,
    openCalendarState,
    setOpenCalendarState,
    // calendarBlockRef,
  } = props;
  // console.log('와우', calendarBlockRef);
  const openPopBtnRef = useRef<HTMLButtonElement | null>(null);

  const openCalendarPop = (elRef: any, placeId: string) => {
    // const refNum = documen(number);
    const btn = elRef?.current;
    const popNum = btn?.getAttribute('data-index');
    console.log('rere', popNum, placeId);

    if (popNum === placeId) {
      setOpenCalendarState(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      console.log('dfdf1', event.target.className);
      // console.log('dfdf2', calendarBlockRef.current);
      console.log('dfdf3', openPopBtnRef.current);
      if (
        openCalendarState &&
        openPopBtnRef.current &&
        !openPopBtnRef.current!.contains(event.target as Node) &&
        event.target.className.includes('MuiBackdrop-root') &&
        event.target !== openPopBtnRef.current
      ) {
        setOpenCalendarState(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openCalendarState]);

  return (
    <div className="calendar-section">
      <button
        className="btn-calendar"
        type="button"
        data-index={place.id}
        onClick={() => openCalendarPop(openPopBtnRef, place.id)}
        ref={openPopBtnRef}
      >
        달력
      </button>
    </div>
  );
};

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
  // const calendarBlockRef = useRef<HTMLDivElement | null>(null);

  const [choiceDate] = useRecoilState<any>(calendarDateAtom);

  const editCalendar = (editDate: Date) => {
    const year = editDate.getFullYear();
    const month = editDate.getMonth() + 1;
    const date = editDate.getDate();

    return `${year}년 ${month}월 ${date}일`;
  };

  return (
    <div className="project_bottom">
      <CalendarPop
        openCalendarState={openCalendarState}
        setOpenCalendarState={setOpenCalendarState}
        // calendarBlockRef={calendarBlockRef}
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
          placeStore.map((place, index: number) => (
            <>
              <div className="project-block" key={`places${Number(index)}`}>
                <div className="project-block_title">
                  <p className="project-block_title_place">
                    {place.place_name}
                  </p>
                  <p className="project-block_title_address">
                    {place.address_name}
                  </p>
                </div>
                <div className="project-block_content">
                  <div className="project-block_content_time">
                    {/* <div>
                    <button
                      type="button"
                      data-index={place.id}
                      // onClick={() => setOpenCalendarState(true)}
                      onClick={() => openCalendarPop(calendarBlockRef, place.id)}
                    >
                      달력
                    </button>
                  </div> */}
                    <CalendarBtnDom
                      place={place}
                      // onClick={openCalendarPop}
                      openCalendarState={openCalendarState}
                      setOpenCalendarState={setOpenCalendarState}
                      // calendarBlockRef={calendarBlockRef}
                    />
                    <div className="date-block">
                      <div className="date-block_value">
                        {editCalendar(choiceDate)}
                      </div>
                      <div className="date-block_inner">
                        <div className="date-block_time">
                          <select className="time-select">
                            {choiceHour().map((hour) => (
                              <option key={Number(hour)}>{hour}</option>
                            ))}
                          </select>
                        </div>
                        <span className="date-block_time"> : </span>
                        <div className="date-block_time">
                          <select className="time-select">
                            {choiceMin().map((min) => (
                              <option key={Number(min)}>{min}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-block">
                    <div className="cate-section">
                      <div className="emotion-block">
                        <p className="emotion-title">
                          1. 먹은 것에 대한 나의 emotion
                        </p>
                        <div className="cate-block">
                          <p className="cate-title">먹은 것을 입력하세요 : </p>
                          <input type="text" className="cate-input" />
                        </div>
                        <div className="emotion-cate">
                          {emotionFood.map((emotion, num) => (
                            <div key={`emotionFood${Number(num)}`}>
                              {emotion.map((el, eatIndex) => (
                                <button
                                  className="emotion-cate_btn"
                                  type="button"
                                  key={Number(eatIndex)}
                                >
                                  {el}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="cs-block">
                          <p className="cs-block_title">직접 입력 : </p>
                          <input type="text" className="cs-block_input" />
                        </div>
                      </div>
                    </div>
                    {/* <hr className="divide-line" /> */}
                    <div className="cate-section">
                      <div className="emotion-block">
                        <p className="emotion-title">
                          2. 본 것에 대한 나의 emotion
                        </p>
                        <div className="cate-block">
                          <p className="cate-title">본 것을 입력하세요 : </p>
                          <input type="text" className="cate-input" />
                        </div>
                        <div className="emotion-cate">
                          {emotionView.map((emotion, num) => (
                            <div key={`emotionFood${Number(num)}`}>
                              {emotion.map((el, eatIndex) => (
                                <button
                                  className="emotion-cate_btn"
                                  type="button"
                                  key={Number(eatIndex)}
                                >
                                  {el}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="cs-block">
                          <p className="cs-block_title">직접 입력 : </p>
                          <input type="text" className="cs-block_input" />
                        </div>
                      </div>
                    </div>
                    {/* <hr className="divide-line" /> */}
                    <div className="cate-section">
                      <div className="emotion-block">
                        <p className="emotion-title">
                          3. 구입한 것에 대한 나의 emotion
                        </p>
                        <div className="cate-block">
                          <p className="cate-title">
                            구입한 것을 입력하세요 :{' '}
                          </p>
                          <input type="text" className="cate-input" />
                        </div>
                        <div className="emotion-cate">
                          {emotionGoods.map((emotion, num) => (
                            <div key={`emotionFood${Number(num)}`}>
                              {emotion.map((el, eatIndex) => (
                                <button
                                  className="emotion-cate_btn"
                                  type="button"
                                  key={Number(eatIndex)}
                                >
                                  {el}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="cs-block">
                          <p className="cs-block_title">직접 입력 : </p>
                          <input type="text" className="cs-block_input" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="divide-line" />
            </>
          ))}
      </div>
    </div>
  );
};

export default Content;
