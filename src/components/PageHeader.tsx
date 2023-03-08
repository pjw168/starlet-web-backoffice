import styled from 'styled-components';

type Props = {
  title: string;
  extra?: JSX.Element[];
};
export default function PageHeader(props: Props) {
  const { title, extra } = props;

  return (
    <Wrapper>
      <Title>{title}</Title>
      {extra && extra.map(e => e)}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
`;
