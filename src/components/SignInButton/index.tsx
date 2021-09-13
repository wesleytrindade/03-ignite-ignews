import styles from '../SignInButton/styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import {FiX} from 'react-icons/fi';

export function SignInButton() {

    const isUserLoggedIn = false;

    return isUserLoggedIn ? (
        <button
            type="button"
            className={styles.signInButton}
        >
            <FaGithub color="#04b361" />
            Wesley Trindade Guarnieri
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button
            type="button"
            className={styles.signInButton}
        >
            <FaGithub color="#eba417" />
            Sign in with Github
        </button>
    );
}