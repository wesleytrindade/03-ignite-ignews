import { useSession, signIn} from 'next-auth/client';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from '../SubscribeButton/styles.module.scss';

interface SubscribeButtonProps{
    priceId:string;
}

export function SubscribeButton(props:SubscribeButtonProps){

    const [session] = useSession();

    async function handleSubscribe(){
        if(!session){
            signIn('github');
            return;
        }

        try{
            const response = await api.post('/subscribe');
            const {sessionId} = response.data;

            const stripe = await getStripeJs();
            stripe.redirectToCheckout({sessionId});
        }

        catch (err){
            toast.error(err.message);
        }
    }
    return(
        <button 
        type="button"
        onClick={handleSubscribe}
        className= {styles.subscribeButton}>
            Subscribe now
        </button>
    );
}