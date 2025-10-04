"use client"
import ComponentsWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import PlanetInput from "@/components/PlanetInput/PlanetInput";
import { getDefaultInputProps, InputProps, toInputProps } from "@/utils/input-utils";
import { useState } from "react";
import { parseCsv, pickCsvFile } from "@/utils/csv-utils";

const Home = () => {
  const [input, setInput] = useState<InputProps>(getDefaultInputProps());

  const sendCSV = async () => {
    const file = await pickCsvFile();
    if (!file) return;

    const rows = await parseCsv(file);
    const objects: InputProps[] = rows.map(toInputProps);

    console.log("CSV → InputProps[]:", objects);
    setInput(objects[0] ?? getDefaultInputProps());
  };

  const sendInput = async () => {
    console.log("SENDING INPUT");
    console.log(input);

    setInput(getDefaultInputProps());
  }

  return (
    <div style={{
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}>
      <ComponentsWrapper title="Input" defaultOpen={false}>
        <PlanetInput
          input={input}
          setInput={setInput}
          sendCsv={sendCSV}
          sendInput={sendInput}
        />
      </ComponentsWrapper>
      <ComponentsWrapper title="Output">
        <div>WIP</div>
      </ComponentsWrapper>
    </div>
  )
}

export default Home;