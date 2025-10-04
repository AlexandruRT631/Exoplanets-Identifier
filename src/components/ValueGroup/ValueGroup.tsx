import { fieldsNameDictionary, InputProps } from "@/utils/input-utils";
import ValueInput from "../ValueInput/ValueInput";

export type ValueGroupProps = {
  groupTitle: string;
  keys: (keyof InputProps)[];
  input: InputProps;
  setInput: React.Dispatch<React.SetStateAction<InputProps>>;
}

const ValueGroup = ({
  groupTitle,
  keys,
  input,
  setInput,
}: ValueGroupProps) => {
  const changeValue = (field: keyof InputProps, newValue: number | undefined) => {
    setInput(prev => ({
      ...prev,
      [field]: newValue,
    }));
  }

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      margin: "12px",
    }}>
      <label style={{ fontSize: "18px", fontWeight: 600, lineHeight: 1.2 }}>{groupTitle}</label>
      <div style={{ flexBasis: "100%", height: 0 }} />
      {keys.map(fieldKey => (
        <ValueInput
          key={String(fieldKey)}
          fieldName={fieldsNameDictionary[fieldKey] ?? String(fieldKey)}
          value={input[fieldKey]}
          setValue={e => changeValue(fieldKey, e)}
        />))}
      <div style={{ flexBasis: "100%", height: 0 }} />
    </div>
  );
};

export default ValueGroup;