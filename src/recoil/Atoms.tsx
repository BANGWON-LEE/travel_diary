import { atom } from 'recoil';

export const placeAtom: any = atom({
  key: 'places',
  default: [],
});

export const modalAtom = atom({
  key: 'modalOpen',
  default: true,
});

export const calendarDateAtom = atom<Date>({
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

export const resultAtom: any = atom({
  key: 'apiResult',
  default: '',
});

export const projectTitleAtom: any = atom({
  key: 'projectTitleState',
  default: '',
});

export const emotionStateAtom: any = atom({
  key: 'emotionState',
  default: '',
});
