import React, { CSSProperties, ReactNode } from "react";
import styles from "./ComponentWrapper.module.scss";

const ComponentWrapper = ({
  children,
  title,
  defaultOpen = true,
  style,
}: React.PropsWithChildren<{ title: ReactNode, defaultOpen?: boolean, style?: CSSProperties }>) => {
  return React.Children.map(children, (child) => (
    <div className={styles.wrapper} style={style}>
      <details open={defaultOpen}>
        <summary>{title}</summary>
        <div>{child}</div>
      </details>
    </div>
  ));
};

export default ComponentWrapper;
