import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import PlanetOutputItem from "./PlanetOutputItem";
import styles from "./PlanetOutput.module.scss";

type PlanetOutputProps = {
  output: any[];
}

const PlanetOutput = ({ output }: PlanetOutputProps) => {
  return (
    <div>
      {output.map((o, i) => (
        <div key={i} className={styles.wrapper}>
          <ComponentWrapper title={o.time} defaultOpen={i === 0}>
            <PlanetOutputItem output={o} />
          </ComponentWrapper>
        </div>
      ))}
    </div>
  )
}

export default PlanetOutput;