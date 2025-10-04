import styles from "./ButtonInput.module.scss";

type ButtonInputProps = {
  action: () => (void);
  title: string
}

const ButtonInput = ({ action, title }: ButtonInputProps) => {
  return (
    <button className={styles.button} onClick={action}>
      {title}
    </button>
  )
}

export default ButtonInput;