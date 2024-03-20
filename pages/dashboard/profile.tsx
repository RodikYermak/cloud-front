import { NextPage } from 'next';
import { User } from '@/api/dto/auth.dto';
import styles from '@/styles/Profile.module.scss';
import { Button } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { checkAuth } from '@/utils/checkAuth';
import * as Api from '@/api';
import { Layout } from '@/layouts/Layout';

interface Props {
    userData: User;
}

const DashboardProfilePage: NextPage<Props> = ({ userData }) => {
    const onClickLogout = () => {
        if (window.confirm('Вы уверены что хотите выйти?')) {
            Api.auth.logout();
            location.href = '/';
        }
    };

    return (
        <main>
            <div className={styles.root}>
                <h1>Мой профиль</h1>
                <br />
                <p>
                    ID: <b>{userData.id}</b>
                </p>
                <p>
                    Полное имя: <b>{userData.fullName}</b>
                </p>
                <p>
                    E-Mail: <b>{userData.email}</b>
                </p>
                <br />
                <Button onClick={onClickLogout} type="primary" danger>
                    Выйти
                </Button>
            </div>
        </main>
    );
};

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
    return <Layout title="Dashboard / Профиль">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx);

    if ('redirect' in authProps) {
        return authProps;
    }

    const userData = await Api.auth.getMe();

    return {
        props: {
            userData,
        },
    };
};

export default DashboardProfilePage;
