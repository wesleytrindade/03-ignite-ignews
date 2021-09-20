import styles from '../Header/styles.module.scss';
import { SignInButton } from '../SignInButton';
import Link from 'next/link';
import { ActiveLink } from '../ActiveLink';

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <ActiveLink href = '/' activeClassName = {styles.active}>
                        <a className={styles.active}>Home</a>
                    </ActiveLink>

                    <ActiveLink href = '/posts' activeClassName={styles.active}>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}