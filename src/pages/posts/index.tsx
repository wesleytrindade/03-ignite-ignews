import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';

import styles from './styles.module.scss';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>10 de Novembro de 1985</time>
                        <strong>Marty Mc Fly viaja no tempo</strong>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea quasi eius asperiores voluptatibus optio assumenda ullam, minima quos fugit accusamus labore consectetur officia quae odio, quisquam nemo dicta quas quidem!</p>
                    </a>
                </div>


            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.predicates.at('document.type','post')
    ],{
        fetch:['publications.title','publications.content'],
        pageSize:100
    });

    console.log(response);

    return{
        props:{

        }
    }

}