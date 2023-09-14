import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import React from 'react';
import { useSetRecoilState } from 'recoil';

// import env from '../env';
import { resultAtom } from '../recoil/Atoms';

// API 요청 설정
const config: AxiosRequestConfig = {
  baseURL: 'https://api.openai.com/v1', // API 엔드포인트
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_JAVASCRIPT_KEY}`,
  },
};

// ChatGPT에 메시지 보내기
export async function OpenAi(message: string) {
  // const [, setResponseState] = useRecoilState<any>(resultAtom);

  try {
    const systemMessage = {
      role: 'system',
      content: '이전 대화를 초기화합니다.',
    };

    const myMessage = {
      role: 'user',
      content: `${JSON.stringify(
        message,
      )}위의 객체 데이터를 참조해서 여행기를 작성해줘 따로 소제목을 달지말고 한 글로 이어서 일기 작성하듯 작성해줘 그리고 그 일기와 어울리는 시 한 편과, 소설 한 권을 함께 추천해줘, 형식은 예를 들어, 소설은, 제목 / 작가 그리고 시 또한, 제목 / 작가 이렇게 작성해주고 글씨 색을 검정색이 아닌 다른 색으로 해줘 추천이유도 얘기해주고, 이것들은 실제로 판매하는 책과 소설이어야 해 `,
    };

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, myMessage],
      temperature: 0.6,
    };

    const response = await axios.post('/chat/completions', data, config);

    // API 응답 처리
    // console.log('결과를 알려줘', response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
  }
}
