import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { emotionAtom, tripAtom } from '../../recoil/Atoms';

interface EmotionChoiceType {
  emotionObject: string[][];
  title: string;
  text: string;
  text2: string;
}

interface SetMyTripState {
  (prevState: typeof tripAtom): void;
}
interface SetEmotionArrState {
  (prevState: typeof emotionAtom): void;
}

const EmotionChoice = (props: EmotionChoiceType) => {
  const { emotionObject, title, text, text2 } = props;

  interface EmotionArrStateType {
    food: string[];
    view: string[];
    goods: string[];
  }

  const [emotionArrState, setEmotionArrState]: [
    typeof emotionAtom,
    SetEmotionArrState,
  ] = useRecoilState<EmotionArrStateType>(emotionAtom);

  const [myTripState, setMyTripState]: [typeof tripAtom, SetMyTripState] =
    useRecoilState(tripAtom);
  const [customState, setCustomState] = useState<string>('');

  const myTripInput = (name: string) => {
    if (name === 'food') {
      return myTripState.food;
    }
    if (name === 'view') {
      return myTripState.view;
    }
    return myTripState.goods;
  };

  const insertCustomTextState = (custom: string) => {
    if (customState === '') {
      alert('감정을 넣어주세요');
      return;
    }

    setEmotionArrState((prevState: EmotionArrStateType) => {
      if (title === 'food') {
        // console.log('el', el);
        return {
          ...prevState,
          food: emotionArrState.food?.concat(custom),
        };
      }
      if (title === 'view') {
        return {
          ...prevState,
          view: emotionArrState.view.concat(custom),
        };
      }
      return {
        ...prevState,
        goods: emotionArrState.goods.concat(custom),
      };
    });
  };

  // console.log('title', title);
  interface MyTripOnType {
    food: string;
    view: string;
    goods: string;
  }

  return (
    <div className="cate-section">
      <div className="emotion-block">
        <p className="emotion-title">{text}</p>
        <div className="cate-block">
          <p className="cate-title">{text2} : </p>
          <input
            type="text"
            className="cate-input"
            value={myTripInput(title)}
            onChange={(event) => {
              setMyTripState((prevState: MyTripOnType) => {
                if (title === 'food') {
                  return { ...prevState, food: event.currentTarget.value };
                }
                if (title === 'view') {
                  return { ...prevState, view: event.currentTarget.value };
                }
                return { ...prevState, goods: event.currentTarget.value };
              });
            }}
          />
        </div>
        <div className="emotion-cate">
          {emotionObject.map((emotion: string[], num) => (
            <div key={`emotionFood${Number(num)}`}>
              {emotion.map((el: string, eatIndex: Number) => (
                <button
                  className="emotion-cate_btn"
                  type="button"
                  key={`emotionEl${Number(eatIndex)}`}
                  onClick={() =>
                    setEmotionArrState((prevState: EmotionArrStateType) => {
                      if (title === 'food') {
                        return {
                          ...prevState,
                          food: emotionArrState.food?.concat(el),
                        };
                      }
                      if (title === 'view') {
                        return {
                          ...prevState,
                          view: emotionArrState.view.concat(el),
                        };
                      }
                      return {
                        ...prevState,
                        goods: emotionArrState.goods.concat(el),
                      };
                    })
                  }
                >
                  {el}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="cs-block">
          <p className="cs-block_title">직접 입력 : </p>
          <div className="cs-section">
            <input
              type="text"
              className="cs-section_input"
              onChange={(event) => setCustomState(event.currentTarget.value)}
            />
            <button
              type="button"
              className="cs-section_btn"
              onClick={() => insertCustomTextState(customState)}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionChoice;
