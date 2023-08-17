import 'react-calendar/dist/Calendar.css'; // css import

import { Box, Modal } from '@mui/material';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useRecoilState } from 'recoil';

import { calendarDateAtom } from '../../recoil/Atoms';

interface CalendarPopType {
  openCalendarState: boolean;
  setOpenCalendarState: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarPop = (props: CalendarPopType) => {
  const { openCalendarState, setOpenCalendarState } = props;

  // type ValuePiece = Date | null;

  // type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [choiceDate, setChoiceDate] = useRecoilState<any>(calendarDateAtom);

  const popUpStyle = {
    position: 'absolute',
    top: '25%',
    left: '25%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    width: 780,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  };

  return (
    <Modal open={openCalendarState} onClose={setOpenCalendarState}>
      <Box sx={popUpStyle}>
        <Calendar onChange={setChoiceDate} value={choiceDate} />
      </Box>
    </Modal>
  );
};

export default CalendarPop;
