import React from 'react';

interface EmotionChoiceType {
  emotionObject: string[][];
  text: string;
}

const EmotionChoice = (props: EmotionChoiceType) => {
  const { emotionObject, text } = props;

  return (
    <div className="cate-section">
      <div className="emotion-block">
        <p className="emotion-title">{text}</p>
        <div className="cate-block">
          <p className="cate-title">먹은 것을 입력하세요 : </p>
          <input type="text" className="cate-input" />
        </div>
        <div className="emotion-cate">
          {emotionObject.map((emotion: any, num) => (
            <div key={`emotionFood${Number(num)}`}>
              {emotion.map((el: string, eatIndex: Number) => (
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
          <div className="cs-section">
            <input type="text" className="cs-section_input" />
            <button type="button" className="cs-section_btn">
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionChoice;
