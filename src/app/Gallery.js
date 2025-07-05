import styles from "./Maulick.module.css";

export function Profile() {
    return (
        <img className={styles.img}
            src = "Maulick.jpeg"
            alt = "Maulick"
        />
    )
}

export default function Gallery() {
    return (
        <>
            <Profile/><Profile/><Profile/>
        </>
    )
}