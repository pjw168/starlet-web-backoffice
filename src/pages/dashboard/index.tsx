import IApplication from '@components/IApplication';
import AppLayout from '@components/layout/AppLayout';
import { PAGE_CODE } from '@constants/pageCode';
import { CustomStaticPageProps } from 'interfaces/common';
import { GetStaticProps } from 'next';

export default function Dashboard() {
  return (
    <AppLayout title='Dashboard'>
      <IApplication name='Dashboard'></IApplication>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const props: CustomStaticPageProps = {
    protected: true,
    code: PAGE_CODE.DASHBOARD,
    roles: ['ADMIN'],
  };
  return {
    props: props,
  };
};
