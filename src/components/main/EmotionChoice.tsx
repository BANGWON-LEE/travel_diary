import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { emotionAtom, emotionStateAtom, tripAtom } from '../../recoil/Atoms';

interface EmotionChoiceType {
  emotionObject: string[][];
  title: string;
  text: string;
  text2: string;
}

const EmotionChoice = (props: EmotionChoiceType) => {
  const { emotionObject, title, text, text2 } = props;

  const [emotionArrState, setEmotionArrState] =
    useRecoilState<any>(emotionAtom);

  // console.log('emotionArrState', emotionArrState);

  const [myTripState, setMyTripSate] = useRecoilState<any>(tripAtom);
  const [customState, setCustomState] = useState<string>('');

  // console.log('myTrip', myTripState.food);

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
    console.log('커스텀', custom);

    if (customState === '') {
      alert('감정을 넣어주세요');
      return;
    }

    setEmotionArrState((prevState: any) => {
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
              setMyTripSate((prevState: any) => {
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
          {/* <button type="button" className="cate-btn">
            등록
          </button> */}
        </div>
        <div className="emotion-cate">
          {emotionObject.map((emotion: any, num) => (
            <div key={`emotionFood${Number(num)}`}>
              {emotion.map((el: string, eatIndex: Number) => (
                <button
                  className="emotion-cate_btn"
                  type="button"
                  key={`emotionEl${Number(eatIndex)}`}
                  onClick={() =>
                    setEmotionArrState((prevState: any) => {
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
        {/* <div className="cs-block">
          <div className="cs-block_title">사진을 올려주세요 :</div>
          <div className="cs-section">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileInputChange(e.target.value)}
              className="cs-section_input"
            />
            <button
              className="cs-section_btn"
              type="button"
              onClick={() => handleUpload()}
            >
              업로드
            </button>
          </div>
          {selectedFile && <p>선택한 파일: {selectedFile.name}</p>}
        </div> */}
      </div>
    </div>
  );
};

export default EmotionChoice;
