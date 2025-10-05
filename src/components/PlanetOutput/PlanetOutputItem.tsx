import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./PlanetOutputItem.module.scss";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import { fieldsNameDictionary, InputProps } from "@/utils/input-utils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const toPercent = (p: number) => (p <= 1 ? p * 100 : p);

const PlanetOutputItem = ({ output }: { output: any }) => {
  const formattedOutput = output?.label_order?.map((l: string, i: number) => ({ label: l, prob: toPercent(output?.probs?.[i] ?? 0) }))
    .sort((a: any, b: any) => b.prob - a.prob);
  const finalOutput = [formattedOutput?.[1], formattedOutput?.[0], formattedOutput?.[2]];

  const featuresData =
    (output?.top_features ?? [])
      .map((f: { feature: keyof InputProps | string; abs_attr: number }) => ({
        name: fieldsNameDictionary?.[f.feature as keyof InputProps] ?? String(f.feature),
        value: Number(f.abs_attr) || 0,
      }))
      .sort((a: any, b: any) => b.value - a.value);

  const voiData =
    (output?.voi ?? [])
      .map((v: { feature: keyof InputProps | string; delta_entropy: number }) => ({
        name: fieldsNameDictionary?.[v.feature as keyof InputProps] ?? String(v.feature),
        value: Number(v.delta_entropy) || 0,
      }))
      .sort((a: any, b: any) => b.value - a.value);

  return (
    <div className={styles.wrapper}>
      <div className={styles.circles}>
        {finalOutput.map(o => (
          <div key={o?.label}>
            <CircularProgressbar
              value={o?.prob}
              text={o?.label}
            />
            <label style={{ alignSelf: "center" }}>{o?.prob?.toFixed(2)} %</label>
          </div>
        ))}
      </div>
      <div className={styles.data}>
        <ComponentWrapper defaultOpen={true} title={"TOP FEATURES"}>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart
                data={featuresData}
                layout="vertical"
                margin={{ top: 8, right: 16, left: 16, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis type="number" />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={220}
                  fill="#eaeaea"
                />
                <Tooltip />
                <Bar dataKey="value" fill="#79B6EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ComponentWrapper>

        <ComponentWrapper defaultOpen={true} title={"Helpful future readings"}>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart
                data={voiData}
                layout="vertical"
                margin={{ top: 8, right: 16, left: 16, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis type="number" />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={220}
                  fill="#eaeaea"
                />
                <Tooltip />
                <Bar dataKey="value" fill="#79B6EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ComponentWrapper>

        <ComponentWrapper defaultOpen={false} title={"Original Input"}>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {Object.entries((output?.originalInput ?? {}) as Partial<Record<keyof InputProps, number | undefined>>)
              .map(([key, val]) => (
                <li key={key} style={{ marginBottom: 6 }}>
                  <span style={{ color: "#afafaf" }}>
                    {fieldsNameDictionary[key as keyof InputProps] ?? key}:
                  </span>{" "}
                  <span>{val}</span>
                </li>
              ))}
          </ul>
        </ComponentWrapper>

      </div>
    </div>
  );
};

export default PlanetOutputItem;
