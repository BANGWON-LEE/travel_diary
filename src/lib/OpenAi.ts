// // import type { AxiosRequestConfig } from 'axios';
// // import axios from 'axios';
// // // import console from 'console';
// // import openai from 'openai';

// // import env from '../env';

// // // OpenAI API 키
// // // const apiKey = 'YOUR_API_KEY_HERE'; // 본인의 API 키로 바꿔주세요.

// // // API 요청 설정
// // const config: AxiosRequestConfig = {
// //   baseURL: 'https://api.openai.com/v1', // API 엔드포인트
// //   headers: {
// //     'Content-Type': 'application/json',
// //     Authorization: `Bearer ${env.openApiKey}`,
// //   },
// // };

// // // ChatGPT에 메시지 보내기
// // export async function OpenAi(message: string) {
// //   try {
// //     console.log('message', message);
// //     const editMessage = `나의 기쁨위의 객체 데이터를 참조해서 여행기를 작성해줘 따로 소제목을 달지말고 한 글로 이어서 일기 작성하듯 작성해줘 그리고 그 일기와 어울리는 시 한 편과, 소설 한편을 제목과 지은이까지 함께 소개해줘`;
// //     // const editMessage = `나는 아름다워 위의 객체 데이터를 참조해서 여행기를 작성해줘 따로 소제목을 달지말고 한 글로 이어서 일기 작성하듯 작성해줘 그리고 그 일기와 어울리는 시 한 편과, 소설 한편을 제목과 지은이까지 함께 소개해줘`;

// //     const data = {
// //       model: 'gpt-3.5-turbo',
// //       temperature: 0.5,
// //       n: 1,
// //       messages: editMessage,
// //     };

// //     const response = await axios.post(
// //       '/chat/completions',
// //       {
// //         data: JSON.stringify(data),
// //         max_tokens: 50, // 원하는 최대 토큰 수
// //       },
// //       config,
// //     );

// //     // API 응답 처리
// //     console.log('결과를 알려줘', response.data.choices[0].text);
// //   } catch (error) {
// //     console.error('API 요청 중 오류 발생:', error);
// //   }
// // }

// import type { AxiosRequestConfig } from 'axios';
// import axios from 'axios';
// import { json } from 'react-router-dom';

// import env from '../env';

// // API 요청 설정
// const config: AxiosRequestConfig = {
//   baseURL: 'https://api.openai.com/v1', // API 엔드포인트
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${env.openApiKey}`,
//   },
// };

// // ChatGPT에 메시지 보내기
// export async function OpenAi(message: string) {
//   try {
//     console.log('message', message);
//     // const  = message;
//     const systemMessage = {
//       role: 'system',
//       content: '이전 대화를 초기화합니다.',
//     };
//     const myMessage = {
//       role: 'user',
//       content: `${JSON.stringify(
//         message,
//       )}나의 기쁨위의 객체 데이터를 참조해서 여행기를 작성해줘 따로 소제목을 달지말고 한 글로 이어서 일기 작성하듯 작성해줘 그리고 그 일기와 어울리는 시 한 편과, 소설 한편을 제목과 지은이까지 함께 소개해줘`,
//     };

//     // const messages = editMessage;

//     const data = {
//       model: 'gpt-3.5-turbo',
//       messages: [systemMessage, myMessage],
//     };

//     const response = await axios.post('/chat/completions', data, config);

//     // API 응답 처리
//     console.log('결과를 알려줘', response.data.choices[0].message.content);
//   } catch (error) {
//     console.error('API 요청 중 오류 발생:', error);
//   }
// }

import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import env from '../env';

// API 요청 설정
const config: AxiosRequestConfig = {
  baseURL: 'https://api.openai.com/v1', // API 엔드포인트
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${env.openApiKey}`,
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
      )}나의 기쁨위의 객체 데이터를 참조해서 여행기를 작성해줘 따로 소제목을 달지말고 한 글로 이어서 일기 작성하듯 작성해줘 그리고 그 일기와 어울리는 시 한 편과, 소설 한편을 제목과 지은이까지 함께 소개해줘`,
    };

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, myMessage],
      temperature: 0.3,
    };

    const response = await axios.post('/chat/completions', data, config);

    // API 응답 처리
    console.log('결과를 알려줘', response.data.choices[0].message.content);
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
  }
}
