// import { findAllByDisplayValue } from '@testing-library/dom';
import React, { MouseEvent, RefObject, useState, useEffect } from "react";
// import { useHistory } from 'react-router';
import styled from "styled-components";
import Title from "./Title";

export interface Tab {
  id: string | number;
  title: string;
  icon?: string;
  iconActive?: string;
  imgStyle?: React.CSSProperties;
  link?: string;
}

export type TabSwitcherLayoutStyle = "header" | "header-bottom" | "scroll";
export type TabSwitcherVisualStyle = "button" | "text-vertical-padding";

export interface TabSwitcherProps {
  tabs: Tab[];
  onSwitch?: Function;
  style?: React.CSSProperties;
  layoutStyle?: TabSwitcherLayoutStyle;
  visualStyle?: TabSwitcherVisualStyle;
  activeTabStyle?: React.CSSProperties;
  tabClassName?: string;
  flex?: string;
  currentTab?: string | number;
  borderIndicatior?: boolean;
  showTitleOnlyWhenActive?: boolean;
  withScroll?: boolean;
  fontWeight?: string;
  fontSize?: string;
  containerClassName?: string;
  width?: string;
  containerRef?: RefObject<HTMLDivElement>;
  customTab?: (args: {
    active: boolean;
    onClick: (event: MouseEvent) => void;
    tab: Tab;
  }) => JSX.Element;
  mb?: string;
}

export interface TabSwitcherHook {
  tabSwitcherProps: TabSwitcherProps;
  currentTab: string | number;
  setTab: Function;
}

type TabSwitcherHookArgs = TabSwitcherProps;

export default function TabSwitcher(props: TabSwitcherProps): JSX.Element {
  const {
    fontSize,
    fontWeight,
    borderIndicatior,
    showTitleOnlyWhenActive,
    layoutStyle,
    visualStyle,
    withScroll,
    customTab,
    width,
    mb,
  } = props;

  const handleTabClick = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    props.onSwitch && props.onSwitch(target.id);
  };

  return (
    <StyledTabSwitcher
      withScroll={props.withScroll}
      ref={props.containerRef}
      flex={props.flex}
      width={width}
      // style={props.style} className={props.containerClassName || ''}
      layoutStyle={layoutStyle}
      visualStyle={visualStyle}
    >
      {props.tabs?.map((tab) =>
        customTab ? (
          customTab({
            active: props.currentTab === tab.id,
            onClick: handleTabClick,
            tab: tab,
          })
        ) : (
          <StyledTab
            // style={{...props.tabStyle, ...(props.currentTab === tab.id ? props.activeTabStyle : {})}}
            // className={props.tabClassName || ''}
            key={tab.id}
            id={tab.id + ""}
            borderIndicatior={props.borderIndicatior}
            onClick={handleTabClick}
            layoutStyle={layoutStyle}
            visualStyle={visualStyle}
            active={props.currentTab === tab.id}
            withScroll={withScroll}
          >
            {tab.icon && props.currentTab !== tab.id && (
              <img
                style={tab.imgStyle}
                src={tab.icon}
                alt={tab.title}
                id={tab.id + ""}
              />
            )}
            {tab.iconActive && props.currentTab === tab.id && (
              <img
                style={tab.imgStyle}
                src={tab.iconActive}
                alt={tab.title}
                id={tab.id + ""}
              />
            )}
            {
              <StyledTitle
                id={tab.id + ""}
                size={fontSize || "1rem"}
                weight={fontWeight || "bold"}
                color={"#B0B0B0"}
                active={props.currentTab === tab.id}
                borderIndicatior={borderIndicatior}
                showTitleOnlyWhenActive={showTitleOnlyWhenActive}
                layoutStyle={layoutStyle}
                visualStyle={visualStyle}
                mb={mb}
              >
                {tab.title}
              </StyledTitle>
            }
          </StyledTab>
        )
      )}
    </StyledTabSwitcher>
  );
}

export function useTabSwitcher(
  tabSwitcherArgs: TabSwitcherHookArgs
): TabSwitcherHook {
  const {
    tabs,
    visualStyle,
    layoutStyle,
    withScroll,
    borderIndicatior,
    showTitleOnlyWhenActive,
    fontWeight,
    fontSize,
  } = tabSwitcherArgs;

  const [currentTab, setTab] = useState<string | number>(
    tabs ? tabs[0]?.id : ""
  );
  // const history = useHistory()

  useEffect(() => {
    if (!currentTab || !tabs.find((tab) => tab.id === currentTab)) {
      setTab(tabs[0]?.id);
    }

    // console.log(currentTab)
  }, [tabs, currentTab]);

  // if (!tabs || !tabs[0]) {
  //     return {
  //         tabSwitcherProps: {
  //             tabs: []
  //         },
  //         currentTab: '',
  //         setTab
  //     };
  // }

  function onTabSwitch(id: string | number) {
    setTab(id);
    tabSwitcherArgs.onSwitch && tabSwitcherArgs.onSwitch(id);
  }

  const tabSwitcherProps = {
    tabs: tabs,
    currentTab: currentTab,
    onSwitch: onTabSwitch,
    visualStyle: visualStyle,
    layoutStyle: layoutStyle,
    withScroll,
    borderIndicatior,
    showTitleOnlyWhenActive,
    fontWeight,
    fontSize,
  };

  return {
    tabSwitcherProps,
    currentTab,
    setTab,
  };
}

const StyledTabSwitcher = styled.div<{
  flex?: string;
  withScroll?: boolean;
  layoutStyle?: TabSwitcherLayoutStyle;
  visualStyle?: TabSwitcherVisualStyle;
  width?: string;
}>`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* margin-bottom: 1rem; */

  ${(p) =>
    p.withScroll
      ? `
        // overflow-x: scroll;
        justify-content: flex-start;

        &::-webkit-scrollbar {
            display: none;
        }
    `
      : ""}

  ${(p) =>
    p.flex
      ? `
        flex: ${p.flex};
    `
      : ""}

    ${(p) =>
    p.width
      ? `
        width: ${p.width};
    `
      : ""}

    ${(p) =>
    p.layoutStyle === "header-bottom"
      ? `
        justify-content: flex-start;
        align-items: center;
        height: 100%;
    `
      : ""}

    ${(p) =>
    p.layoutStyle === "header"
      ? `
        @media screen and (max-width: 1000px) {
            & {
                justify-content: space-evenly;
            }
        }
        @media screen and (max-width: 800px) {
            & {
                display: none;
            }
        }
    `
      : ""}
`;

const StyledTab = styled.div<{
  borderIndicatior?: boolean;
  fontSize?: string;
  fontWeight?: string;
  layoutStyle?: TabSwitcherLayoutStyle;
  visualStyle?: TabSwitcherVisualStyle;
  active?: boolean;
  withScroll?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  ${(p) =>
    p.visualStyle === "button"
      ? `
        margin: 0 0.5rem;
        background: #F8F8F8;
        border-radius: 2rem;
        padding: 0.5rem 1rem;
        color: black;
        font-size: 0.9rem;
    `
      : ""}

  ${(p) =>
    p.visualStyle === "button" && p.active
      ? `
        background: rgba(48, 143, 171, 0.2);
    `
      : ""}

    ${(p) =>
    p.layoutStyle === "header"
      ? `
        @media screen and (max-height: 1000px) {
            & {
                margin: 0 1rem;
            }
        }
    `
      : ""}

    ${(p) =>
    p.withScroll
      ? `
        margin: 0 1.5rem;
    `
      : ""}
`;

const StyledTitle = styled(Title)<{
  active?: boolean;
  borderIndicatior?: boolean;
  showTitleOnlyWhenActive?: boolean;
  id?: string;
  layoutStyle?: TabSwitcherLayoutStyle;
  visualStyle?: TabSwitcherVisualStyle;
}>`
  ${(p) =>
    p.visualStyle === "text-vertical-padding" &&
    `
        padding: 0.5rem 0;
        margin-right: 2rem;
        min-width: 3.5rem;
        text-align: center;
    `}

  ${(p) =>
    p.borderIndicatior &&
    `
        border-bottom: 3px solid rgba(0,0,0,0);
    `}

    ${(p) =>
    p.active &&
    `
        border-color: #217E9A;
        color: #217E9A;
    `}

    ${(p) =>
    p.showTitleOnlyWhenActive && !p.active
      ? `
        opacity: 0;
    `
      : ""}
`;
