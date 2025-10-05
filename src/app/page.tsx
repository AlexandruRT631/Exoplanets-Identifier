"use client"
import ComponentsWrapper from "@/components/ComponentWrapper/ComponentWrapper";
import PlanetInput from "@/components/PlanetInput/PlanetInput";
import { getDefaultInputProps, InputProps, toInputProps } from "@/utils/input-utils";
import { useState } from "react";
import { parseCsv, pickCsvFile } from "@/utils/csv-utils";
import axios from 'axios';
import PlanetOutput from "@/components/PlanetOutput/PlanetOutput";

const Home = () => {
  const [input, setInput] = useState<InputProps>(getDefaultInputProps());
  const [output, setOutput] = useState<any[]>([]);
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
  const [isOutputOpen, setIsOutputOpen] = useState<boolean>(true);

  const sendCSV = async () => {
    const file = await pickCsvFile();
    if (!file) return;

    const rows = await parseCsv(file);
    const objects: InputProps[] = rows.map(toInputProps);

    await axios.post('http://127.0.0.1:8000/predict', objects)
      .then((response) => {
        const currentTime = new Date().toLocaleString("en-GB", {
          timeZone: "Europe/Bucharest",
          dateStyle: "medium",
          timeStyle: "medium",
        });
        const resultWithTime = response.data.map((r: any, i: number) => ({ ...r, title: `${currentTime} - #${i}`, originalInput: objects?.[0] }));
        setOutput(prev => [...resultWithTime, ...prev]);
        console.log(resultWithTime);
      });

    // const result = JSON.parse(`[{"label_order":["CANDIDATE","CONFIRMED","FALSE POSITIVE"],"probs":[0.01582806371152401,0.9691080451011658,0.015063843689858913],"top_features":[{"abs_attr":0.01565004512667656,"feature":"dur_hr","signed_attr":-0.01565004512667656},{"abs_attr":0.00873872172087431,"feature":"multi_ct","signed_attr":0.00873872172087431},{"abs_attr":0.008201565593481064,"feature":"prad_re","signed_attr":0.008201565593481064},{"abs_attr":0.0072887856513261795,"feature":"met_dex","signed_attr":0.0072887856513261795},{"abs_attr":0.006308966316282749,"feature":"teff_k","signed_attr":0.006308966316282749}],"voi":[{"delta_entropy":0.023426100611686707,"feature":"teq_model_from_aor_k"},{"delta_entropy":0.013259217143058777,"feature":"rho_resid_cgs"},{"delta_entropy":0.011982426047325134,"feature":"star_ct"}]},{"label_order":["CANDIDATE","CONFIRMED","FALSE POSITIVE"],"probs":[0.01582806371152401,0.9691080451011658,0.015063843689858913],"top_features":[{"abs_attr":0.01565004512667656,"feature":"dur_hr","signed_attr":-0.01565004512667656},{"abs_attr":0.00873872172087431,"feature":"multi_ct","signed_attr":0.00873872172087431},{"abs_attr":0.008201565593481064,"feature":"prad_re","signed_attr":0.008201565593481064},{"abs_attr":0.0072887856513261795,"feature":"met_dex","signed_attr":0.0072887856513261795},{"abs_attr":0.006308966316282749,"feature":"teff_k","signed_attr":0.006308966316282749}],"voi":[{"delta_entropy":0.023426100611686707,"feature":"teq_model_from_aor_k"},{"delta_entropy":0.013259217143058777,"feature":"rho_resid_cgs"},{"delta_entropy":0.011982426047325134,"feature":"star_ct"}]}]`);
    // const currentTime = new Date().toLocaleString("en-GB", {
    //   timeZone: "Europe/Bucharest",
    //   dateStyle: "medium",
    //   timeStyle: "medium",
    // });
    // const resultWithTime = result.map((r: any, i: number) => ({ ...r, title: `${currentTime} - #${i}`, originalInput: objects?.[0] }));
    // setOutput(prev => [...resultWithTime, ...prev]);

    setInput(objects[0] ?? getDefaultInputProps());
    setIsInputOpen(false);
    setIsOutputOpen(true);
  };

  const sendInput = async () => {
    await axios.post('http://127.0.0.1:8000/predict', [
      input
    ]).then((response) => {
      const currentTime = new Date().toLocaleString("en-GB", {
        timeZone: "Europe/Bucharest",
        dateStyle: "medium",
        timeStyle: "medium",
      });
      const result = response.data.map((r: any) => ({ ...r, title: currentTime, originalInput: input }));
      setOutput(prev => [...result, ...prev]);
      console.log(result);
    });

    // setOutput(prev => [...JSON.parse(`[{"label_order":["CANDIDATE","CONFIRMED","FALSE POSITIVE"],"probs":[0.01582806371152401,0.9691080451011658,0.015063843689858913],"top_features":[{"abs_attr":0.01565004512667656,"feature":"dur_hr","signed_attr":-0.01565004512667656},{"abs_attr":0.00873872172087431,"feature":"multi_ct","signed_attr":0.00873872172087431},{"abs_attr":0.008201565593481064,"feature":"prad_re","signed_attr":0.008201565593481064},{"abs_attr":0.0072887856513261795,"feature":"met_dex","signed_attr":0.0072887856513261795},{"abs_attr":0.006308966316282749,"feature":"teff_k","signed_attr":0.006308966316282749}],"voi":[{"delta_entropy":0.023426100611686707,"feature":"teq_model_from_aor_k"},{"delta_entropy":0.013259217143058777,"feature":"rho_resid_cgs"},{"delta_entropy":0.011982426047325134,"feature":"star_ct"}]}]`), ...prev]);

    setInput(getDefaultInputProps());
    setIsInputOpen(false);
    setIsOutputOpen(true);
  }

  console.log(output);

  return (
    <div style={{
      padding: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}>
      <ComponentsWrapper title="Input" open={isInputOpen} onOpenChange={setIsInputOpen}>
        <PlanetInput
          input={input}
          setInput={setInput}
          sendCsv={sendCSV}
          sendInput={sendInput}
        />
      </ComponentsWrapper>
      <ComponentsWrapper title="Output" open={isOutputOpen} onOpenChange={setIsOutputOpen}>
        <PlanetOutput output={output} />
      </ComponentsWrapper>
    </div>
  )
}

export default Home;