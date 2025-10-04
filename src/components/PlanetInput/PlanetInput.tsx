import { fieldsNameGroupsDictionary, InputProps } from "@/utils/input-utils";
import ButtonInput from "../ButtonInput/ButtonInput";
import ValueGroup from "../ValueGroup/ValueGroup";
import { useState } from "react";
import ActionStatus from "../ActionStatus/ActionStatus";

type PlanetInputProps = {
  input: InputProps;
  setInput: React.Dispatch<React.SetStateAction<InputProps>>;
  sendCsv: () => (void);
  sendInput: () => (void);
};

const PlanetInput = ({
  input,
  setInput,
  sendCsv,
  sendInput,
}: PlanetInputProps) => {
  const [isCsvLoading, setIsCsvLoading] = useState<boolean>(false);
  const [csvSuccess, setCsvSuccess] = useState<string>("");
  const [csvError, setCsvError] = useState<string>("");
  const [isInputLoading, setIsInputLoading] = useState<boolean>(false);
  const [inputSuccess, setInputSuccess] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  const sendCsvAction = async () => {
    try {
      setCsvSuccess("");
      setCsvError("");
      setIsCsvLoading(true);

      await sendCsv();

      setIsCsvLoading(false);
      setCsvSuccess("CSV send successfully!");
    } catch (err) {
      setIsCsvLoading(false);
      setCsvError(`CSV error: ${err}`);
    }
  }

  const sendInputAction = async () => {
    try {
      setInputSuccess("");
      setInputError("");
      setIsInputLoading(true);

      await sendInput();

      setIsInputLoading(false);
      setInputSuccess("Input send successfully!");
    } catch (err) {
      setIsInputLoading(false);
      setInputError(`Input error: ${err}`);
    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      gap: 12,
      alignItems: "flex-start",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
        }}>
          <ButtonInput action={sendCsvAction} title={"Send from CSV"} />
          <label style={{
            margin: "20px",
            color: "#afafaf",
          }}>
            {'('}Sending individual data can be done with the button at the end{')'}
          </label>
        </div>
        <ActionStatus
          successMessage={csvSuccess}
          errorMessage={csvError}
          isLoading={isCsvLoading}
        />
      </div>
      {(Object.entries(fieldsNameGroupsDictionary) as [string, (keyof InputProps)[]][])
        .map(([groupTitle, keys]) => (
          <ValueGroup
            key={groupTitle}
            groupTitle={groupTitle}
            keys={keys}
            input={input}
            setInput={setInput}
          />
        ))}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}>
        <ButtonInput action={sendInputAction} title={"Send Input"} />
        <ActionStatus
          successMessage={inputSuccess}
          errorMessage={inputError}
          isLoading={isInputLoading}
        />
      </div>
    </div>
  )
}

export default PlanetInput;