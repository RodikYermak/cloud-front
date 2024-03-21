import { GetServerSidePropsContext, NextPage } from 'next';
import { checkAuth } from '@/utils/checkAuth';
import { Layout } from '@/layouts/Layout';
import React from 'react';
import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Files } from '@/modules/Files';

interface Props {
    items: FileItem[];
}

const DashboardPage: NextPage<Props> = ({ items }) => {
    return (
        <DashboardLayout>
            <Files items={items} withActions />
        </DashboardLayout>
    );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
    return <Layout title="Dashboard / Фотография ">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx);

    if ('redirect' in authProps) {
        return authProps;
    }

    try {
        const items = await Api.files.getAll('photos');

        return {
            props: {
                items,
            },
        };
    } catch (err) {
        console.log(err);
        return {
            props: { items: [] },
        };
    }
};

export default DashboardPage;
