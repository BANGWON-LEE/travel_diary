import { atom } from 'recoil';

export const placeAtom: any = atom({
  key: 'places',
  default: [],
});

export const modalAtom = atom({
  key: 'modalOpen',
  default: true,
});

export const calendarDateAtom = atom({
  key: 'date',
  default: new Date(),
});

export const emotionAtom: any = atom({
  key: 'emotionObject',
  default: {
    food: [],
    view: [],
    goods: [],
  },
});

export const tripAtom: any = atom({
  key: 'object',
  default: {
    food: '',
    view: '',
    goods: '',
  },
});
// event.currentTarget.value

export const resultAtom: any = atom({
  key: 'apiResult',
  default: null,
});
