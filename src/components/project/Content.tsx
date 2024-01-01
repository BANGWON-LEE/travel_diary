import 'react-calendar/dist/Calendar.css'; // css import

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { OpenAi } from '../../lib/OpenAi';
import {
  calendarDateAtom,
  emotionAtom,
  modalAtom,
  placeAtom,
  projectTitleAtom,
  resultAtom,
  tripAtom,
} from '../../recoil/Atoms';
import EmotionChoice from '../main/EmotionChoice';
import CalendarPop from './CalendarPop';

const emotionFood = [
  ['존맛', '별로', '황홀', '축복이 끝이없다'],
  ['최악', '그저 그런', '돈이 아까운'],
];

const emotionView = [
  ['존멋', '별로', '천국인 듯', '미쳤다', '끝장난다'],
  ['최악', '그저 그런', '생각보다 별로', '헬이다'],
];

const emotionGoods = [
  ['예뻐서', '멋있어서', '필수라서'],
  ['어쩔 수 없이', '선물하려고', '돈이 남아서', '강매 당해서'],
];

interface CalendarBtnDomType {
  place: {
    id: string;
  };
  openCalendarState: boolean;
  setOpenCalendarState: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarBtnDom = (props: CalendarBtnDomType) => {
  const { place, openCalendarState, setOpenCalendarState } = props;

  const openPopBtnRef = useRef<HTMLButtonElement | null>(null);

  interface ElRefType {
    current: HTMLButtonElement | null;
  }

  const openCalendarPop = (elRef: ElRefType, placeId: string) => {
    const btn = elRef?.current;
    const popNum = btn?.getAttribute('data-index');

    if (popNum === placeId) {
      setOpenCalendarState(true);
    }
  };

  interface EventType {
    target: HTMLElement | null;
  }

  // 팝업 닫는 코드
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const typedEvent = event as EventType;
      if (
        openCalendarState &&
        openPopBtnRef.current &&
        !openPopBtnRef.current!.contains(typedEvent.target as Node) &&
        typedEvent.target!.className.includes('MuiBackdrop-root') &&
        typedEvent.target !== openPopBtnRef.current
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

const Content = () => {
  const [placeStore] = useRecoilState<any[]>(placeAtom);
  const [modalState, setModalState] = useRecoilState<boolean>(modalAtom);
  const [projectTitleState, setProjectTitleState] =
    useRecoilState<string>(projectTitleAtom);

  // 달력 팝업을 불러오기 위한 state
  const [openCalendarState, setOpenCalendarState] = useState<boolean>(false);

  // 달력 팝업을 불러오는 버튼 정보를 가져오는 ref
  // const calendarBlockRef = useRef<HTMLDivElement | null>(null);

  const [choiceDate] = useRecoilState<any>(calendarDateAtom);
  // const [customState] = useRecoilState<string>(emotionStateAtom);

  const editCalendar = (editDate: Date) => {
    const year = editDate.getFullYear();
    const month = editDate.getMonth() + 1;
    const date = editDate.getDate();

    return `${year}년 ${month}월 ${date}일`;
  };

  const [emotionArrState, setEmotionArrState] =
    useRecoilState<any>(emotionAtom);
  // console.log('emotionAtom', emotionAtom);

  interface MyTripType {
    food: '';
    view: '';
    goods: '';
  }

  const [myTripState, setMyTripSate] = useRecoilState<MyTripType>(tripAtom);

  const inputObject = {
    food: [],
    view: [],
    goods: [],
  };

  interface HistoryListType {
    food: string[];
    view: string[];
    goods: string[];
  }

  const [historyList, setHistoryList] = useState<HistoryListType>(inputObject);

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

    if (form.feel === undefined || form.what === undefined) {
      alert('여행 정보를 작성해주세요');
      return;
    }

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
  const navigation = useNavigate();

  const [, setResultState] = useRecoilState<any>(resultAtom);
  const [loadingState, setLoadingState] = useState<string>('');
  const [count, setCount] = useState<number>(40); // 시작 숫자 설정
  const [isRunning, setIsRunning] = useState<boolean>(false); // 타이머가 실행 중인지 여부
  const [waitMessage, setWaitMessage] =
    useState<string>('당신의 여행을 정리 중이에요');

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning) {
      timer = setTimeout(() => {
        if (count > 0) {
          setCount(count - 1);
        } else {
          setIsRunning(false);
        }
      }, 1000); // 1초마다 갱신
    }

    if (count === 30) {
      setWaitMessage('이제 한 문단 썼어요 ');
    } else if (count === 20) {
      setWaitMessage('조금만 더 기다려주세요');
    } else if (count === 10) {
      setWaitMessage('시간이 좀... 걸리내요 뿌앵~');
    } else if (count === 3) {
      setWaitMessage('이제 곧 나옵니다 진짜로!!! ');
    } else if (count === 0) {
      setWaitMessage('조금만 더!!! 기다려주세요 ㅠㅠ');
    }

    return () => {
      // 컴포넌트 언마운트 시 타이머 정리
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [count, isRunning]);

  // 여행 경험 data를 api로 요청하기 위한 함수
  const submitMyTrip = () => {
    if (
      historyList.food.length === 0 &&
      historyList.view.length === 0 &&
      historyList.goods.length === 0
    ) {
      alert('경험을 나눠주세요');
      return;
    }

    if (projectTitleState === '') {
      alert('제목을 입력해주세요');
      return;
    }
    setIsRunning(true);

    setLoadingState('잠시만 기다려주세요');
    const result: any = OpenAi(JSON.stringify(historyList));

    result
      .then((res: any) => {
        setResultState(res);

        navigation('/result');
      })
      .catch((err: any) => {
        console.log('에러', err);
      });
  };

  // 선택한 감정을 제거하는 함수
  const removeEmotion = (category: string, emo: string) => {
    setEmotionArrState((prevState: any) => {
      const newState = { ...prevState };
      const categoryArr = newState[category];

      if (categoryArr) {
        const updatedCategoryArr = categoryArr.filter(
          (el: string) => el !== emo,
        );
        newState[category] = updatedCategoryArr;
      }
      return newState; // Return the updated state
    });
  };

  return (
    <div className="project_bottom">
      {loadingState === '잠시만 기다려주세요' ? (
        <div className="result-block">
          <div className="result-message">{waitMessage}</div>
          <div className="result-count">{count}</div>
        </div>
      ) : (
        <>
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
                            openCalendarState={openCalendarState}
                            setOpenCalendarState={setOpenCalendarState}
                          />
                          <div className="date-block">
                            <div className="date-block_value">
                              {editCalendar(choiceDate)}
                            </div>
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
                                    내가 느낀 감정 :{' '}
                                    <strong>{`${el.feel}`}</strong>
                                  </p>
                                </div>
                              ),
                            )}
                            <p className="project-section_title">
                              {myTripState?.food !== undefined &&
                                myTripState?.food}
                            </p>
                            <div>
                              {emotionArrState.food?.map(
                                (el: any, emoIndex: Number) => (
                                  <button
                                    key={`third${Number(emoIndex)}`}
                                    className="project-section_btn"
                                    type="button"
                                    onClick={() => removeEmotion('food', el)}
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
                                    본 거 : <strong>{`${el.what}`}</strong>{' '}
                                  </p>
                                  <p className="project-emotion-text">
                                    내가 느낀 감정 :{' '}
                                    <strong>{`${el.feel}`}</strong>
                                  </p>
                                </div>
                              ),
                            )}
                            <p className="project-section_title">
                              {myTripState?.view !== undefined &&
                                myTripState?.view}
                            </p>
                            <div>
                              {emotionArrState?.view?.map(
                                (el: string, emoIndex: Number) => (
                                  <button
                                    key={`firstEmo${Number(emoIndex)}`}
                                    className="project-section_btn"
                                    type="button"
                                    onClick={() => removeEmotion('view', el)}
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
                                    구입한 거 : <strong>{`${el.what}`}</strong>{' '}
                                  </p>
                                  <p className="project-emotion-text">
                                    내가 느낀 감정 :{' '}
                                    <strong>{`${el.feel}`}</strong>
                                  </p>
                                </div>
                              ),
                            )}
                            <p className="project-section_title">
                              {myTripState?.goods !== undefined &&
                                myTripState?.goods}
                            </p>
                            <div>
                              {emotionArrState.goods?.map(
                                (el: string, emoIndex: Number) => (
                                  <button
                                    key={`secondEmo${Number(emoIndex)}`}
                                    className="project-section_btn"
                                    type="button"
                                    onClick={() => removeEmotion('goods', el)}
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
        </>
      )}
    </div>
  );
};

export default Content;
