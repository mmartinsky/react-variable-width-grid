import React, { useRef } from "react";
import { determineNumColumns } from "./utils";
import useResizeObserver from "use-resize-observer";

export type VariableWidthGridProps = {
  children: React.ReactNode;
  columnGap?: number;
  style?: React.CSSProperties
};

export function VariableWidthGrid(props: VariableWidthGridProps) {
  const { children, columnGap = 10, style, ...otherProps } = props;
  const ref = useRef<any>(null);
  const {width} = useResizeObserver({ref})
  const [sizes, setSizes] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (ref.current) {
      const childrenArray = Array.from(ref.current.children) as HTMLElement[];
      const childSizes = childrenArray.map((c: HTMLElement) => c.offsetWidth);
      setSizes(childSizes);
    }
  }, [children]);

  const numColumns = React.useMemo(() => determineNumColumns(width, sizes, columnGap), [width, sizes]);

  return (
    <div
      data-rvwg="rvwg"
      ref={ref}
      style={{
        width: '100%',
        display: "grid",
        gridTemplateColumns: `repeat(${numColumns || React.Children.count(children)}, max-content)`,
        gridColumnGap: `${columnGap}px`,
        ...style
      }}
      {...otherProps}
    >
      {children}
    </div>
  );
}