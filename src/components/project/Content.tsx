// import { Content } from 'leaflet';
import 'react-calendar/dist/Calendar.css'; // css import

import { title } from 'process';
// import console from 'console';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { OpenAi } from '../../lib/OpenAi';
import {
  calendarDateAtom,
  emotionAtom,
  modalAtom,
  placeAtom,
  tripAtom,
} from '../../recoil/Atoms';
import EmotionChoice from '../main/EmotionChoice';
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
    // console.log('rere', popNum, placeId);

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

  // const choiceHour = () => {
  //   const times = [];

  //   for (let i = 0; i <= 23; i += 1) {
  //     const timeForm = i < 10 ? `0${i}` : `${i}`;
  //     times.push(timeForm);
  //   }
  //   return times;
  // };

  // const choiceMin = () => {
  //   const times = [];

  //   for (let i = 0; i <= 60; i += 1) {
  //     const timeForm = i < 10 ? `0${i}` : `${i}`;
  //     times.push(timeForm);
  //   }
  //   return times;
  // };

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

  const [emotionArrState, setEmotionArrState] =
    useRecoilState<any>(emotionAtom);
  // console.log('emotionAtom', emotionAtom);

  const [myTripState, setMyTripSate] = useRecoilState<any>(tripAtom);

  const inputObject = {
    food: [],
    view: [],
    goods: [],
  };

  const [historyList, setHistoryList] = useState<any>(inputObject);

  const submitList = (
    date: string,
    where: string,
    what: string,
    el: string,
    emotion: string,
  ) => {
    const form = {
      when: date,
      place: where,
      what: el,
      feel: emotion[0],
    };

    // console.log('form', form);
    setHistoryList((prevState: any) => {
      const newState = { ...prevState }; // 이전 상태의 복사본 생성

      if (what === 'food') {
        newState.food = [...prevState.food, form]; // food 배열에 새 항목 추가
      } else if (what === 'view') {
        newState.view = [...prevState.view, form]; // view 배열에 새 항목 추가
      } else {
        newState.goods = [...prevState.goods, form]; // goods 배열에 새 항목 추가
      }

      return newState; // 업데이트된 상태 반환
    });

    setMyTripSate((prevState: any) => {
      if (what === 'food') {
        return { ...prevState, food: '' };
      }
      if (what === 'view') {
        return { ...prevState, view: '' };
      }
      return { ...prevState, goods: '' };
    });

    setEmotionArrState((prevState: any) => {
      if (what === 'food') {
        return { ...prevState, food: [] };
      }
      if (what === 'view') {
        return { ...prevState, view: [] };
      }
      return { ...prevState, goods: [] };
    });
  };

  const submitMyTrip = () => {
    console.log('result1', historyList);
    if (
      historyList.food.length === 0 &&
      historyList.view.length === 0 &&
      historyList.goods.length === 0
    ) {
      alert('경험을 나눠주세요');
      return;
    }

    OpenAi(historyList);
  };

  return (
    <div className="project_bottom">
      <CalendarPop
        openCalendarState={openCalendarState}
        setOpenCalendarState={setOpenCalendarState}
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
            <div key={`places${Number(index)}`}>
              <div className="project-block">
                <div className="project-block_content">
                  <div className="project-layout">
                    <div className="project-block_title">
                      <p className="project-block_title_place">
                        {place.place_name}
                      </p>
                      <p className="project-block_title_address">
                        {place.address_name}
                      </p>
                    </div>
                    <div className="project-block_content_time">
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
                        {/* <div className="date-block_inner">
                          <div className="date-block_time">
                            <select className="time-select">
                              {choiceHour().map((hour, hourIndex) => (
                                <option key={`hour${Number(hourIndex)}`}>
                                  {hour}
                                </option>
                              ))}
                            </select>
                          </div>
                          <span className="date-block_time"> : </span>
                          <div className="date-block_time">
                            <select className="time-select">
                              {choiceMin().map((min, minIndex) => (
                                <option key={`min${Number(minIndex)}`}>
                                  {min}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="content-block">
                    <div className="content-container">
                      <EmotionChoice
                        emotionObject={emotionFood}
                        title="food"
                        text="1. 먹은 것에 대한 나의 emotion"
                        text2="1. 먹은 것을 입력하세요"
                      />
                      <div className="project-section">
                        {historyList.food?.map(
                          (el: any, recordIndex: number) => (
                            <div
                              key={`record${Number(recordIndex)}`}
                              className="project-section_title"
                            >
                              <p className="project-eat-text">
                                먹은 거 : <strong>{`${el.what}`}</strong>{' '}
                              </p>
                              <p className="project-emotion-text">
                                내가 느낀 감정 : <strong>{`${el.feel}`}</strong>
                              </p>
                            </div>
                          ),
                        )}
                        <p className="project-section_title">
                          {myTripState?.food !== undefined && myTripState?.food}
                        </p>
                        <div>
                          {emotionArrState.food?.map(
                            (el: any, emoIndex: Number) => (
                              <button
                                key={`third${Number(emoIndex)}`}
                                className="project-section_btn"
                                type="button"
                              >
                                {el}
                              </button>
                            ),
                          )}
                        </div>
                        <button
                          className="submit-btn"
                          type="button"
                          onClick={() =>
                            submitList(
                              editCalendar(choiceDate),
                              place.place_name,
                              'food',
                              myTripState?.food,
                              emotionArrState.food,
                            )
                          }
                        >
                          등록
                        </button>
                      </div>
                    </div>
                    <div className="content-container">
                      <EmotionChoice
                        emotionObject={emotionView}
                        title="view"
                        text="2. 본 것에 대한 나의 emotion"
                        text2="2. 본 것을 입력하세요"
                      />
                      <div className="project-section">
                        {historyList.view?.map(
                          (el: any, recordIndex: number) => (
                            <div
                              key={`record${Number(recordIndex)}`}
                              className="project-section_title"
                            >
                              <p className="project-eat-text">
                                먹은 거 : <strong>{`${el.what}`}</strong>{' '}
                              </p>
                              <p className="project-emotion-text">
                                내가 느낀 감정 : <strong>{`${el.feel}`}</strong>
                              </p>
                            </div>
                          ),
                        )}
                        <p className="project-section_title">
                          {myTripState?.view !== undefined && myTripState?.view}
                        </p>
                        {emotionArrState?.view?.map(
                          (el: string, emoIndex: Number) => (
                            <button
                              key={`firstEmo${Number(emoIndex)}`}
                              className="project-section_btn"
                              type="button"
                            >
                              {el}
                            </button>
                          ),
                        )}
                        <button
                          className="submit-btn"
                          type="button"
                          onClick={() =>
                            submitList(
                              editCalendar(choiceDate),
                              place.place_name,
                              'view',
                              myTripState?.view,
                              emotionArrState.view,
                            )
                          }
                        >
                          등록
                        </button>
                      </div>
                    </div>
                    <div className="content-container">
                      <EmotionChoice
                        emotionObject={emotionGoods}
                        title="goods"
                        text="3. 구입한 것에 대한 나의 emotion"
                        text2="3. 구입한 것을 입력하세요"
                      />
                      <div className="project-section">
                        {historyList.goods?.map(
                          (el: any, recordIndex: number) => (
                            <div
                              key={`record${Number(recordIndex)}`}
                              className="project-section_title"
                            >
                              <p className="project-eat-text">
                                먹은 거 : <strong>{`${el.what}`}</strong>{' '}
                              </p>
                              <p className="project-emotion-text">
                                내가 느낀 감정 : <strong>{`${el.feel}`}</strong>
                              </p>
                            </div>
                          ),
                        )}
                        <p className="project-section_title">
                          {myTripState?.goods !== undefined &&
                            myTripState?.goods}
                        </p>
                        {emotionArrState.goods?.map(
                          (el: string, emoIndex: Number) => (
                            <button
                              key={`secondEmo${Number(emoIndex)}`}
                              className="project-section_btn"
                              type="button"
                            >
                              {el}
                            </button>
                          ),
                        )}
                        <button
                          className="submit-btn"
                          type="button"
                          onClick={() =>
                            submitList(
                              editCalendar(choiceDate),
                              place.place_name,
                              'goods',
                              myTripState?.goods,
                              emotionArrState.goods,
                            )
                          }
                        >
                          등록
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="divide-line" />
            </div>
          ))}
        <div className="project-container">
          <button
            onClick={() => submitMyTrip()}
            className="project-container_submit"
            type="button"
          >
            전송하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
