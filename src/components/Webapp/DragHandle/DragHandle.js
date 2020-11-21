import React from "react";
import { sortableHandle } from "react-sortable-hoc";
import Icon from "../../DS/Icon/Icon";

const DragHandle = sortableHandle(() => {
  return <Icon icon="dragHandle" />;
});
export default DragHandle;
