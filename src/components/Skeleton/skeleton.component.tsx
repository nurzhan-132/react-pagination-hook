import React from "react";
import styles from "./skeleton.module.scss";

interface SkeletonProps {
  width?: string;
  height?: string;
  count?: number;
  gap?: number;
  flexDirection?: "row" | "column";
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "auto",
  count = 1,
  gap = 16,
  flexDirection = "column",
}) => {
  const skeletonStyle = {
    width,
    height,
  };

  if (count === 1) {
    return <div className={styles.skeleton} style={skeletonStyle}></div>;
  }

  return (
    <div
      className={styles["skeleton-list"]}
      style={{ gap: `${gap}px`, flexDirection }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          className={styles.skeleton}
          style={skeletonStyle}
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default Skeleton;
