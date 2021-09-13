import styles from '../SubscribeButton/styles.module.scss';

export function SubscribeButton(){
    return(
        <button 
        type="button"
        className= {styles.subscribeButton}>
            Subscribe now
        </button>
    );
}