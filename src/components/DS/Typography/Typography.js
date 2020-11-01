import React from "react";
import styles from "./Typography.module.scss";
import { cn } from "../../../lib/helpers";

const withTypographyProps = (Component) => (props) => {
  const { className, align } = props;
  return (
    <Component
      {...props}
      className={
        className && align ? cn(className, `align-${align}`) : className
      }
    />
  );
};

const Heading1 = withTypographyProps((props) => (
  <h1 {...props} className={cn(styles.Heading1, props.className)}>
    {props.children}
  </h1>
));
const Heading2 = withTypographyProps((props) => (
  <h2 {...props} className={cn(styles.Heading2, props.className)}>
    {props.children}
  </h2>
));
const Heading3 = withTypographyProps((props) => (
  <h3 {...props} className={cn(styles.Heading3, props.className)}>
    {props.children}
  </h3>
));
const Heading4 = withTypographyProps((props) => (
  <h4 {...props} className={cn(styles.Heading4, props.className)}>
    {props.children}
  </h4>
));
const Subtitle1 = withTypographyProps((props) => (
  <h5 {...props} className={cn(styles.Subtitle1, props.className)}>
    {props.children}
  </h5>
));
const Subtitle2 = withTypographyProps((props) => (
  <h6 {...props} className={cn(styles.Subtitle2, props.className)}>
    {props.children}
  </h6>
));
const Body1 = withTypographyProps((props) => (
  <p {...props} className={cn(styles.Body1, props.className)}>
    {props.children}
  </p>
));
const Body2 = withTypographyProps((props) => (
  <p {...props} className={cn(styles.Body2, props.className)}>
    {props.children}
  </p>
));
const Caption = withTypographyProps((props) => (
  <p {...props} className={cn(styles.Caption, props.className)}>
    {props.children}
  </p>
));

export {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Subtitle1,
  Subtitle2,
  Body1,
  Body2,
  Caption,
};
