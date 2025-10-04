import React, { ReactNode } from "react";
import styles from "./ComponentWrapper.module.scss";

const ComponentWrapper = ({
  children,
  title,
  defaultOpen = true
}: React.PropsWithChildren<{ title: ReactNode, defaultOpen?: boolean }>) => {
  return React.Children.map(children, (child) => (
    <div className={styles.wrapper}>
      <details open={defaultOpen}>
        <summary>{title}</summary>
        <div>{child}</div>
      </details>
    </div>
  ));
};

export default ComponentWrapper;
