import 'react-calendar/dist/Calendar.css'; // css import

import { Box, Modal } from '@mui/material';
import type { MouseEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import { useRecoilState } from 'recoil';

import closeBtn from '../../asset/close-button.png';
import { calendarDateAtom } from '../../recoil/Atoms';
import type { CalendarPopType } from '../../type/common';

const CalendarPop = (props: CalendarPopType) => {
  const { openCalendarState, setOpenCalendarState } = props;

  // type ValuePiece = Date | null;

  // type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [choiceDate, setChoiceDate] = useRecoilState<Date>(calendarDateAtom);

  const popUpStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    width: 350,
    height: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <Modal open={openCalendarState} onClose={setOpenCalendarState}>
      <Box sx={popUpStyle}>
        <Calendar
          onChange={(value) => setChoiceDate(value as Date)}
          value={choiceDate}
        />
      </Box>
    </Modal>
  );
};

export default CalendarPop;
