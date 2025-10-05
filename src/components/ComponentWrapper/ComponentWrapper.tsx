import React, { CSSProperties, ReactNode } from "react";
import styles from "./ComponentWrapper.module.scss";

type Props = React.PropsWithChildren<{
  title: ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  style?: CSSProperties;
}>;

const ComponentWrapper = ({ children, title, open, onOpenChange, style }: Props) => {
  return React.Children.map(children, (child) => (
    <div className={styles.wrapper} style={style}>
      <details open={open}>
        <summary
          onClick={(e) => {
            if (onOpenChange) {
              e.preventDefault();
              onOpenChange(!open);
            }
          }}
        >
          {title}
        </summary>
        <div>{child}</div>
      </details>
    </div>
  ));
};

export default ComponentWrapper;
