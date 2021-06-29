import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.span<TitleProps>`
    font-size: ${p => p.size || '1.3rem'};
    color: black;
    font-family: Poppins, sans-serif;
    font-style: normal;
    font-weight: ${p => p.weight || 'bold'};
    text-decoration: none;
    ${p => p.center ? `
        text-align: center;
    ` : ''}
    ${p => p.color ? `
        color: ${p.color};
    ` : ''}
    ${p => p.clickable ? `
        cursor: pointer;
    ` : ''}
    ${p => p.noWrap ? `
        white-space: nowrap;
    ` : ''}
    ${p => p.mb ? `
        margin-bottom: ${p.mb};
    ` : ''}
    ${p => p.pb ? `
        padding-bottom: ${p.pb};
    ` : ''}
    ${p => p.mr ? `
        margin-right: ${p.mr};
    ` : ''}
    ${p => p.mt ? `
        margin-top: ${p.mt};
    ` : ''}
    ${p => p.lh ? `
        line-height: ${p.lh};
    ` : ''}
`

export interface TitleProps {
    children?: React.ReactNode;
    center?: boolean;
    style?: React.CSSProperties;
    color?: string;
    size?: string;
    weight?: string;
    clickable?: boolean;
    onClick?: React.MouseEventHandler<HTMLSpanElement>;
    noWrap?: boolean,
    id?: string,
    mb?: string,
    pb?: string,
    mr?: string,
    mt?: string,
    lh?: string
}

export default function Title(props: TitleProps): JSX.Element {

    const { children } = props;

    return <StyledTitle {...props}>
        {children}
    </StyledTitle>
}
