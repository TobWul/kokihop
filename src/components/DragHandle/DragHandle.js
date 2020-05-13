import React from "react";
import { sortableHandle } from "react-sortable-hoc";
import Icon from "../Icon/Icon";
import styles from "./DragHandle.module.scss";
import { useState } from "react";
import { cn } from "../../lib/helpers";

const DragHandle = sortableHandle(() => {
  return <Icon icon="dragHandle" />;
});
export default DragHandle;
