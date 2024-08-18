import React, { useReducer, useState } from "react";
import toolboxContext from "../toolbox-context";
import {
  initialReducerState,
  toolboxReducer,
} from "../reducer/toolbox-reducer";
import { toolboxTypes } from "../../constants/constants";

const ToolboxProvider = ({ children }) => {
  const [toolboxState, dispatchToolboxActions] = useReducer(
    toolboxReducer,
    initialReducerState
  );
  const [checkbox, setCheckbox] = useState(false);

  const onClickStroke = (tool, stroke) => {
    dispatchToolboxActions({
      type: toolboxTypes.CHANGE_STROKE,
      payload: { tool, stroke },
    });
  };

  const onClickFill = (tool, fill) => {
    dispatchToolboxActions({
      type: toolboxTypes.CHANGE_FILL,
      payload: { tool, fill },
    });
  };

  const onChangeSize = (tool, size) => {
    dispatchToolboxActions({
      type: toolboxTypes.CHANGE_SIZE,
      payload: { tool, size },
    });
  };

  const onClickCheckbox = () => {
    setCheckbox(!checkbox);
  };

  const initialState = {
    toolboxState,
    onClickStroke,
    onClickFill,
    onChangeSize,
    onClickCheckbox,
    checkbox
  };

  return (
    <toolboxContext.Provider value={initialState}>
      {children}
    </toolboxContext.Provider>
  );
};

export default ToolboxProvider;
