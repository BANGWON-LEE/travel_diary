import { atom } from 'recoil';

export const placeAtom: any = atom({
  key: 'places',
  default: [],
});

export const modalAtom = atom({
  key: 'modalOpen',
  default: true,
});
