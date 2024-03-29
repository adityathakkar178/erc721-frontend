import { Link } from 'react-router-dom';
import classes from './Navigation.module.css';

const Navigation = () => {
    return (
        <header className={classes.header}>
            <nav className={classes.navbar}>
                <ul className={classes.list}>
                    <li>
                        <Link
                            to="/contracts"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                            Contract
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/nfts"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            NFT{' '}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navigation;
