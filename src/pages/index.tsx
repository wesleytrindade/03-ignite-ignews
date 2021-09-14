import {GetStaticProps} from 'next';

import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from '../styles/home.module.scss';

interface HomeProps{
  product:{
    priceId:string,
    amount:number;
  }
}
export default function Home(props:HomeProps) {
  console.log(props);
  return (

    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome!</span>
          <h1>News about the <span> React</span> world</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {new Intl.NumberFormat('en-US',{
              style:'currency',
              currency:'USD'}).format(
              props.product.amount)} month</span>
          </p>
          <SubscribeButton priceId={props.product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding"/>
      </main>
    </>

  )

}

export const getStaticProps:GetStaticProps = async()=>{
  const price = await stripe.prices.retrieve("price_1JZOa4EN4FcPTypd2Sscip03");

  const product = {
    priceId:price.id,
    amount:(price.unit_amount /100),
  }
  
  return {
    props:{
      product
    },
    revalidate: 60 * 60 * 24, //24 horas
  }

}
