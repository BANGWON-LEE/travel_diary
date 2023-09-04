import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { emotionAtom, tripAtom } from '../../recoil/Atoms';

interface EmotionChoiceType {
  emotionObject: string[][];
  title: string;
  text: string;
  text2: string;
}

const EmotionChoice = (props: EmotionChoiceType) => {
  const { emotionObject, title, text, text2 } = props;

  const [selectedFile, setSelectedFile] = useState<any>();

  const handleFileInputChange = (e: any) => {
    const file = e.target?.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // 선택한 파일을 서버로 업로드하는 로직을 이곳에 추가할 수 있습니다.
    if (selectedFile) {
      console.log('Uploading file:', selectedFile.name);
      // 여기에서 파일을 업로드하거나 필요한 처리를 수행합니다.
    }
  };

  const [emotionArrState, setEmotionArrState] =
    useRecoilState<any>(emotionAtom);

  console.log('emotionArrState', emotionArrState);

  const [myTripState, setMyTripSate] = useRecoilState<any>(tripAtom);

  console.log('myTrip', myTripState.food);

  return (
    <div className="cate-section">
      <div className="emotion-block">
        <p className="emotion-title">{text}</p>
        <div className="cate-block">
          <p className="cate-title">{text2} : </p>
          <input
            type="text"
            className="cate-input"
            // value={myTripState}
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
                  key={Number(eatIndex)}
                  onClick={() =>
                    setEmotionArrState((prevState: any) => {
                      if (title === 'food') {
                        return {
                          ...prevState,
                          food: emotionArrState.food.concat(el),
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
            <input type="text" className="cs-section_input" />
            <button type="button" className="cs-section_btn">
              등록
            </button>
          </div>
        </div>
        <div className="cs-block">
          <div className="cs-block_title">사진을 올려주세요 :</div>
          <div>
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
        </div>
      </div>
    </div>
  );
};

export default EmotionChoice;
