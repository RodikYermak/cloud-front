import { GetServerSidePropsContext, NextPage } from 'next';
import { checkAuth } from '@/utils/checkAuth';
import { Layout } from '@/layouts/Layout';
import React from 'react';
import styles from '@/styles/Home.module.scss';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import { FileOutlined, FileImageOutlined, DeleteOutlined } from '@ant-design/icons';
import { UploadButton } from '@/components/UploadButton';

const DashboardPage: NextPage = () => {
    const router = useRouter();
    const selectedMenu = router.pathname;

    return (
        <main className={styles.dashboardContainer}>
            <div className={styles.sidebar}>
                <UploadButton />
                <Menu
                    className={styles.menu}
                    mode="inline"
                    selectedKeys={[selectedMenu]}
                    items={[
                        {
                            key: '/dashboard',
                            icon: <FileOutlined />,
                            label: 'Файлы',
                            onClick: () => router.push('/dashboard'),
                        },
                        {
                            key: '/dashboard/photos',
                            icon: <FileImageOutlined />,
                            label: 'Фото',
                            onClick: () => router.push('/dashboard/photos'),
                        },
                        {
                            key: '/dashboard/trash',
                            icon: <DeleteOutlined />,
                            label: 'Корзина',
                            onClick: () => router.push('/dashboard/trash'),
                        },
                    ]}
                />
            </div>

            <div className="container">
                <h1>Files</h1>
            </div>
        </main>
    );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
    return <Layout title="Dashboard / Главная">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx);

    if ('redirect' in authProps) {
        return authProps;
    }

    return {
        props: {},
    };
};

export default DashboardPage;
