// import React from "react";
import { Divider } from 'antd';
import styled, { css } from 'styled-components';

export const TextGrayStyle10 = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--gray-color-10);
`;

export const TextGrayStyle9 = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--gray-color-9);
`;

export const TextGrayStyle8 = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--gray-color-8);
`;

export const TextGrayStyle7 = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--gray-color-7);

  /* @media only screen and (max-width: 350px) {
    font-size: ${props =>
    props.size
      ? `calc(${props.size} - 2px)`
      : 'calc(var(--base-font-size) - 2px)'};
  } */
`;

export const TextGrayStyle6 = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--gray-color-6);
`;

export const TextGrayStyle5 = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--gray-color-5);
`;

export const TextGrayStyle4 = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--gray-color-4);
`;

export const TextGrayStyle3 = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--gray-color-3);
`;

export const TextGrayStyle2 = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--gray-color-2);
`;

export const TextGrayStyle1 = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--gray-color-1);
`;

export const TextPrimaryStyle = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--primary-color);
`;

export const TextLinkStyle = styled.a<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--link-color);

  @media only screen and (max-width: 350px) {
    font-size: ${props =>
      props.size
        ? `calc(${props.size} - 2px)`
        : 'calc(var(--base-font-size) - 2px)'};
  }
`;

export const TextSuccessStyle = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--success-color);
`;

export const TextErrorStyle = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--error-color);
`;

export const TextActiveStyle = styled.span<{ size?: string; weight?: number }>`
  font-size: ${props => (props.size ? props.size : 'var(--base-font-size)')};
  font-weight: ${props => (props.weight ? props.weight : 400)};
  color: var(--active-color);
`;

export const BoxStyle = styled.div`
  background-color: var(--gray-color-1);
  box-shadow: var(--base-box-shadow);
  border-radius: var(--base-border-radius);
  padding: 20px;
`;

export const AlignCenterStyle = styled.div`
  text-align: center;
`;

export const IconCenterStyle = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const HrStyle = styled.hr`
  border-width: 0px;
  border-top: 1px solid var(--gray-color-4);
`;

export const VlStyle = styled(Divider)<{ height?: string }>`
  border-width: 0px;
  border-left: 1px solid var(--gray-color-4);

  margin: 0;

  ${props =>
    props.height
      ? css`
          height: ${props.height};
        `
      : css``};
`;
