import 'react-calendar/dist/Calendar.css'; // css import

import { Box, Modal } from '@mui/material';
import type { MouseEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import { useRecoilState } from 'recoil';

import closeBtn from '../../asset/close-button.png';
import { calendarDateAtom } from '../../recoil/Atoms';

interface CalendarPopType {
  openCalendarState: boolean;
  setOpenCalendarState: React.Dispatch<React.SetStateAction<boolean>>;
  // calendarBlockRef: React.RefObject<HTMLDivElement | null>;
}

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

  // 달력 팝업을 불러오고 닫는 역할을 하는 useEffect
  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     if (
  //       openCalendarState &&
  //       calendarRef.current &&
  //       !calendarRef.current!.contains(event.target as Node) &&
  //       event.target !== calendarBlockRef.current
  //     ) {
  //       setOpenCalendarState(false);
  //     }
  //   };

  //   document.addEventListener('click', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, [openCalendarState]);

  return (
    <Modal open={openCalendarState} onClose={setOpenCalendarState}>
      <Box sx={popUpStyle}>
        {/* <div className="modal_background_top_block">
          <button
            type="button"
            className="modal_background_top_block_btn"
            onClick={() => setOpenCalendarState(false)}
          >
            <img src={closeBtn} alt="close" />
          </button>
        </div> */}
        <Calendar
          onChange={(value) => setChoiceDate(value as Date)}
          value={choiceDate}
        />
      </Box>
    </Modal>
  );
};

export default CalendarPop;
