import { ChangeEvent } from "react";
import styles from "./ValueInput.module.scss";

type ValueInputProps = {
  fieldName: string;
  value: number | undefined;
  setValue: (e: number | undefined) => void;
};

const ValueInput = ({ fieldName, value, setValue }: ValueInputProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setValue(raw === "" ? undefined : Number(raw));
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{fieldName}</label>
      <input
        className={styles.input}
        type="number"
        value={value ?? ""}
        onChange={onChange}
        onWheel={e => e.currentTarget.blur()}
        onKeyDown={e => { if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault() }}
      />
    </div>
  );
};

export default ValueInput;
