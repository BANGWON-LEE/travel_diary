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
      )}위의 객체 데이터를 참조해서 여행기를 작성해줘 따로 소제목을 달지말고 한 글로 이어서 일기 작성하듯 작성해주고 이에 어울리는 음악을 k-pop 한 곡 그리고 클래식와 뉴에이지 중, 한 곡을 알려줘 `,
    };

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, myMessage],
      temperature: 0.8,
    };

    const response = await axios.post('/chat/completions', data, config);

    // API 응답 처리
    // console.log('결과를 알려줘', response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
  }
}
