import styles from "../Logo/Logo.module.css";
import {memo} from "react";

function Logo({image}) {
    return (
        <>
            <img className={styles.logo}
                 src={image} alt='логотип журнала'/>
        </>
    )
}

export default memo(Logo);