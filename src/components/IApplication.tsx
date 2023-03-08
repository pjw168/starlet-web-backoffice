import PageHeader from '@components/PageHeader';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  name: string;
  extra?: JSX.Element[];
};
export default function IApplication(props: Props) {
  const { children, name, extra } = props;
  return (
    <div>
      <PageHeader
        title={name} // className='site-page-header'
        extra={extra}
        // onBack={onBack}
        // backIcon={<LeftOutlined color='var(--primary-color)' />}
        // title={title}
        // breadcrumb={breadcrumb}
        // style={{ backgroundColor: 'transparent' }}
        // extra={extra}
      />

      <br />
      {children}
    </div>
  );
}

// const PageHeader = styled.div`
//   padding-top: 0;
//   padding-left: 0;
//   padding-right: 0;

//   .ant-page-header-heading-title {
//     font-size: 32px;
//     font-weight: 500;
//     height: 50px;
//   }
// `;
