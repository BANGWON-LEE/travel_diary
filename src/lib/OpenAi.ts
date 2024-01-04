import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

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
  try {
    const systemMessage = {
      role: 'system',
      content: '이전 대화를 초기화합니다.',
    };

    const myMessage = {
      role: 'user',
      content: `${JSON.stringify(
        message,
      )}위의 객체 데이터를 참조해서  글을 작성해줘 따로 소제목을 달지말고 한 글로 이어서 글을 작성하듯 작성해주고 이에 어울리는 유명 인물(스포츠 스타 또는 예술가, 역사적 영웅)과 음악을 한 곡 소개시켜줘 그리고 그 음악의 영상의 유튜브 주소를 적어줘, 마지막에 선택한 이유도 알려줘

      `,
    };

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, myMessage],
      temperature: 0.8,
    };

    const response = await axios.post('/chat/completions', data, config);

    // API 응답 처리

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
  }
}
