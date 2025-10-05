import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./PlanetOutputItem.module.scss";

type PlanetOutput = {
  label_order: string[];
  probs: number[]; // 0–1 or 0–100
};

type PlanetOutputItemProps = {
  output: PlanetOutput;
};

const toPercent = (p: number) => (p <= 1 ? p * 100 : p);

const PlanetOutputItem = ({ output }: PlanetOutputItemProps) => {
  const formattedOutput = output?.label_order?.map((l: string, i: number) => ({ label: l, prob: toPercent(output?.probs?.[i] ?? 0) }))
    .sort((a, b) => b.prob - a.prob);
  const finalOutput = [formattedOutput?.[1], formattedOutput?.[0], formattedOutput?.[2]];

  return (
    <div className={styles.wrapper}>
      <div className={styles.circles}>
        {finalOutput.map(o => (
          <div key={o.label}>
            <CircularProgressbar
              value={o.prob}
              text={o.label}
            />
            <label style={{ alignSelf: "center" }}>{o.prob.toFixed(2)} %</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanetOutputItem;
