import { HTMLInputTypeAttribute } from "react";
import styles from "./ButtonInput.module.scss";

type ButtonInputProps = {
  action: () => (void);
  title: string
  buttonType?: HTMLInputTypeAttribute
}

const ButtonInput = ({ action, title, buttonType = "button" }: ButtonInputProps) => {
  return (
    <input defaultValue={title} className={styles.button} onClick={action} type={buttonType} />
  )
}

export default ButtonInput;