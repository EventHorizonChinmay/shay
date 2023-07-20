import styles from './Loader.module.scss'
import loaderImg from '../../assets/loader.gif'
import  ReactDOM from "react-dom"


const Loader = () => {
    return ReactDOM.createPortal (
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={loaderImg} alt='loading...' />
        </div>
    </div>,
    document.getElementById('loader')
  )
}

//Attaching the div of styles.wrapper to the document element with id="loader"

export default Loader