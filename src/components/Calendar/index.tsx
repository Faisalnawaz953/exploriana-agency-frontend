import React from "react";
import Calendar from "./Calendar";
import { TabSwitcher, useTabSwitcher, Title } from "../Tabs";
import styled from "styled-components";

export default function DisplayCalendar() {
  const calendarTypeSwitcher = useTabSwitcher({
    tabs: [
      {
        id: "week",
        title: "Week",
      },
      {
        id: "month",
        title: "Month",
      },
    ],
  });
  return (
    <>
      <OptionsContainer>
        <TabSwitcher
          {...calendarTypeSwitcher.tabSwitcherProps}
          width={"unset"}
          customTab={({ tab, active, onClick }) => (
            <TabSwticherCustomTab
              key={tab.id}
              id={tab.id + ""}
              onClick={onClick}
              active={active}
            >
              <Title
                id={tab.id + ""}
                color={active ? "#429FBA" : ""}
                size={"1rem"}
                weight={"600"}
              >
                {tab.title}
              </Title>
            </TabSwticherCustomTab>
          )}
        />
      </OptionsContainer>
      <Calendar
        weekMode={calendarTypeSwitcher.currentTab === "week"}
        style={{ margin: "1.5rem" }}
      />
    </>
  );
}

const StyledBook = styled.div<{ mobilePadding?: boolean }>`
  margin-bottom: 8rem;
  ${(p) =>
    p.mobilePadding
      ? `
        padding: 0 1rem;
    `
      : ""}
  @media screen and (min-width: 600px) and (max-width: 900px) {
    padding: 1.5rem 10vw;
    max-width: 80vw;
  }

  @media screen and (min-width: 900px) and (max-width: 1200px) {
    padding: 1.5rem 20vw;
    max-width: 60vw;
  }

  @media screen and (min-width: 1200px) {
    padding: 1.5rem 25vw;
    max-width: 50vw;
  }

  @media screen and (min-width: 1600px) {
    padding: 1.5rem 30vw;
    max-width: 40vw;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  /* align-items: center; */
  margin-left: 1rem;
  padding-top: 1rem;
`;

const TabSwticherCustomTab = styled.div<{ active?: boolean }>`
  padding: 0.5rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 5rem;
  cursor: pointer;
  display: flex;

  & > img {
    vertical-align: middle;
    margin-right: 0.5rem;
    padding-bottom: 2px;
  }

  ${(p) =>
    p.active
      ? `
      
        background: rgba(48, 143, 171, 0.1);
    `
      : `
        background: #F8F8F8;
    `}
`;
