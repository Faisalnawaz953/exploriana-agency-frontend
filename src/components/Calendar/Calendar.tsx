import React, { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../Tabs/Title";
import arrow_img from "./circle-arrow.svg";
import useWindowSize from "./useWindowSize";

export interface CalendarProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  weekMode?: boolean;
  onDateSelect?: (date: Date) => void;
  hideToday?: boolean;
}

const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getThisWeekDays = (startDate: Date, days: number = 7) => {
  const date = new Date(startDate);
  const currentWeekDay = date.getDay() ? date.getDay() - 1 : 6;
  date.setDate(date.getDate() - currentWeekDay);
  return Array(days)
    .fill(0)
    .map((el) => {
      const resDate = new Date(date);
      date.setDate(date.getDate() + 1);
      return resDate.getTime();
    });
};

const getMonthDayCount = (startDate: Date) => {
  const date = new Date(startDate);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date.getDate();
};

const isToday = (date: Date) => {
  if (!date) return;
  return (
    new Date(date).getDate() === new Date().getDate() &&
    new Date(date).getMonth() === new Date().getMonth() &&
    new Date(date).getFullYear() === new Date().getFullYear()
  );
};

export default function Calendar(props: CalendarProps): JSX.Element {
  const { style, weekMode, onDateSelect, hideToday } = props;

  const [currentStartDate, setCurrentStartDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null | number>(null);
  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    // Sets current month's start date
    if (!weekMode) {
      const newStartDate = new Date();
      newStartDate.setDate(1);
      setCurrentStartDate(newStartDate);
    } else {
      const newStartDate = new Date();
      const currentWeekDay = newStartDate.getDay()
        ? newStartDate.getDay() - 1
        : 6;
      newStartDate.setDate(newStartDate.getDate() - currentWeekDay);
      setCurrentStartDate(newStartDate);
    }
  }, [weekMode]);

  const hangleArrowClick: MouseEventHandler<HTMLImageElement> = (event) => {
    const target = event.target as HTMLImageElement;

    if (weekMode) {
      if (target.id === "left") {
        changeWeek(-1);
      } else if (target.id === "right") {
        changeWeek(1);
      }
    } else {
      if (target.id === "left") {
        changeMonth(-1);
      } else if (target.id === "right") {
        changeMonth(1);
      }
    }
  };

  const changeMonth = (number: number) => {
    const newStartDate = new Date(currentStartDate);
    newStartDate.setMonth(newStartDate.getMonth() + number);
    setCurrentStartDate(newStartDate);
  };

  const changeWeek = (number: number) => {
    const newStartDate = new Date(currentStartDate);
    newStartDate.setDate(newStartDate.getDate() + number * 7);
    setCurrentStartDate(newStartDate);
  };

  const goToday = () => {
    setCurrentStartDate(new Date());
  };

  const handleDateSelect = (date: Date) => {
    const resDate = new Date(date);
    resDate.setHours(0, 0, 0, 0);
    onDateSelect && onDateSelect(resDate);
    setSelectedDate(resDate);
  };

  const startShift = currentStartDate.getDay()
    ? currentStartDate.getDay() - 1
    : 6;
  let calendarElements;
  if (weekMode) {
    calendarElements = getThisWeekDays(
      currentStartDate,
      windowWidth > 1200 ? 10 : 7
    );
  } else {
    calendarElements = [
      ...Array(startShift).fill(null),
      ...Array(getMonthDayCount(currentStartDate))
        .fill(currentStartDate)
        .map((el, i) => new Date(el).setDate(i + 1)),
    ];
  }

  return (
    <StyledCalendar style={style}>
      <CalendarHeader>
        <Title style={{ flex: 1 }} weight={"500"}>
          {months[currentStartDate.getMonth()]} {currentStartDate.getFullYear()}
        </Title>
        <ArrowContainer>
          {!hideToday && (
            <CutstomButton onClick={goToday}>
              <Title size={".8rem"}>Today</Title>
            </CutstomButton>
          )}
          <Arrow
            src={arrow_img}
            alt="arrow"
            id="left"
            onClick={hangleArrowClick}
          />
          <Arrow
            src={arrow_img}
            alt="arrow"
            id="right"
            onClick={hangleArrowClick}
            right
          />
        </ArrowContainer>
      </CalendarHeader>
      <CalendarGrid weekMode={weekMode}>
        {!weekMode &&
          daysOfWeek.map((day) => (
            <Title
              center
              color="#B0B0B0"
              weight={"500"}
              style={{ minHeight: "3rem" }}
            >
              {day}
            </Title>
          ))}
        {!weekMode &&
          calendarElements.map((date, i) => (
            <CalendarDay
              selected={
                new Date(selectedDate || 0).setHours(0, 0, 0, 0) ===
                  new Date(date).setHours(0, 0, 0, 0) && date !== null
              }
              selectable={date !== null}
              key={i}
              today={isToday(date)}
              onClick={() => date && handleDateSelect(date)}
            >
              <Title center weight={"400"} mb={"1rem"}>
                {date !== null ? new Date(date).getDate() : ""}
              </Title>
            </CalendarDay>
          ))}
        {weekMode &&
          calendarElements.map((date, i) => (
            <CalendarDay
              selected={
                new Date(selectedDate || 0).setHours(0, 0, 0, 0) ===
                  new Date(date).setHours(0, 0, 0, 0) && date !== null
              }
              selectable={date !== null}
              key={i}
              today={isToday(date)}
              onClick={() => date && handleDateSelect(date)}
              weekDay
            >
              <Title color="#B0B0B0" center weight={"500"} mb={".5rem"}>
                {daysOfWeek[i % 7]}
              </Title>
              <Title center weight={"400"} mb={"1rem"}>
                {date !== null ? new Date(date).getDate() : ""}
              </Title>
            </CalendarDay>
          ))}
      </CalendarGrid>
    </StyledCalendar>
  );
}

const StyledCalendar = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;

  && img {
    height: 2.5rem;
  }
`;
const Arrow = styled.img<{ right?: boolean }>`
  cursor: pointer;
  ${(p) =>
    p.right
      ? `
        transform: rotate(180deg);
    `
      : `
        padding-right: 1rem;
    `}
`;
const CalendarGrid = styled.div<{ weekMode?: boolean }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* grid-template-rows: repeat(7, 1fr); */
  margin: 1rem;
  ${(p) =>
    !p.weekMode
      ? `
        grid-column-gap: .8rem;
    `
      : `
        display: flex;
        justify-content: space-between;
        width: 100%;
        justify-items: center;
    `}
`;

const CalendarDay = styled.div<{
  selectable?: boolean;
  today?: boolean;
  weekDay?: boolean;
  selected?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  && > span {
    width: 3rem;
    height: 3rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${(p) =>
    p.selectable && p.weekDay
      ? `
        max-width: 3rem;

        &&:hover {
            background: linear-gradient(122.49deg, rgba(66, 159, 186, 0.1) 0%, rgba(33, 126, 154, 0.1) 100%);
            border-radius: 2rem;
            
        }
        && > span {
            height: 2rem;
        }
    `
      : ""}

  ${(p) =>
    p.selectable && !p.weekDay
      ? `
        && > span:hover {
            background: linear-gradient(122.49deg, rgba(66, 159, 186, 0.1) 0%, rgba(33, 126, 154, 0.1) 100%);
        } 
       
    `
      : ""}

    ${(p) =>
    p.selected && p.weekDay
      ? `
        background: linear-gradient(122.49deg, rgba(66, 159, 186, 0.1) 0%, rgba(33, 126, 154, 0.1) 100%);
        border-radius: 2rem;
        &&::after {
            display: none;
        }
          && > span {
  color:#429FBA

  }
    `
      : ""}

    ${(p) =>
    p.selected && !p.weekDay
      ? `
        && > span {
         
            background: linear-gradient(122.49deg, rgba(66, 159, 186, 0.1) 0%, rgba(33, 126, 154, 0.1) 100%); 
             color:#429FBA;
        }
        &&::after {
            display: none;
        }
    `
      : ""}

    ${(p) =>
    p.today
      ? `
        position: relative;
        &&::after {
            content: '';
            width: .5rem;
            height: .5rem;
            background-color: #B0B0B0;
            border-radius: 1rem;
            position: absolute;
            bottom: ${p.weekDay ? "0" : ".5rem"};
        }
        &&:hover::after {
            display: none;
        }
    `
      : ""}
`;

const CutstomButton = styled.button`
  padding: 0.5rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 5rem;
  cursor: pointer;
  /* background: rgba(48, 143, 171, 0.2); */
  background: #f8f8f8;
  margin-right: 1rem;
  border: 0;
  user-select: none;
  outline: none;
`;
