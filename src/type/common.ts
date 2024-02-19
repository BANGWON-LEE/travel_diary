import type { emotionAtom, tripAtom } from '../recoil/Atoms';

export interface EmotionChoiceType {
  emotionObject: string[][];
  title: string;
  text: string;
  text2: string;
}

export interface EmotionArrStateType {
  food: string[];
  view: string[];
  goods: string[];
}

export interface SetMyTripState {
  (prevState: typeof tripAtom): void;
}

export interface MyTripOnType {
  food: string;
  view: string;
  goods: string;
}

export interface SetEmotionArrState {
  (prevState: typeof emotionAtom): void;
}

export interface PlaceType {
  place_name: string;
}

export interface PlaceStoreType {
  place_name: string[];
}

export interface PlaceBtnType {
  [el: string]: string;
}

export interface CalendarPopType {
  openCalendarState: boolean;
  setOpenCalendarState: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CalendarBtnDomType {
  place: {
    id: string;
  };
  openCalendarState: boolean;
  setOpenCalendarState: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ElRefType {
  current: HTMLButtonElement | null;
}

export interface EventType {
  target: HTMLElement | null;
}

export interface MyTripType {
  food: '';
  view: '';
  goods: '';
}

export interface HistoryListType {
  food: string[];
  view: string[];
  goods: string[];
}
