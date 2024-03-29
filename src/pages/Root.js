import { Outlet } from 'react-router-dom';
import Navigation from '../Components/Navigate';
import classes from './Root.module.css';

const Root = () => {
    return (
        <>
            <Navigation />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Root;
