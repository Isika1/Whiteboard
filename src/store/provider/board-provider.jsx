import React, { useReducer } from "react";
import boardContext from "../board-context";
import { boardReducer, initialReducerState } from "../reducer/board-reducer";
import {
  mouseTypes,
  toolActionType,
  toolbarItems,
  toolTypes,
} from "../../constants/constants";

const BoardProvider = ({ children }) => {
  //   const [selectedToolbarItem, setSelectedToolbarItem] = useState("Line");
  const [boardState, dispatchBoardStateActions] = useReducer(
    //state action of reducer
    boardReducer,
    initialReducerState
  );

  const handleOnClickToolbarItem = (toolItem) => {
    // console.log(toolItem);
    // setSelectedToolbarItem(toolItem);
    dispatchBoardStateActions({
      type: mouseTypes.CHANGE_TOOL,
      payload: toolItem,
    });
  };

  const onMouseDown = (event, strokeColor, fillColor, size) => {
    const { clientX, clientY } = event;

    if (boardState.selectedToolbarItem === toolTypes.ERASER) {
      dispatchBoardStateActions({
        type: mouseTypes.CHANGE_TOOL_ACTION_TYPE,
        payload: mouseTypes.ERASING,
      });
      return;
    }
    dispatchBoardStateActions({
      type: mouseTypes.DRAW_DOWN,
      payload: { clientX, clientY, strokeColor, fillColor, size },
    });
  };

  const onMouseMove = (event, strokeColor, fillColor, size) => {
    const { clientX, clientY } = event;

    if (boardState.toolActionType === toolActionType.DRAWING) {
      dispatchBoardStateActions({
        type: mouseTypes.DRAW_MOVE,
        payload: { clientX, clientY, strokeColor, fillColor, size },
      });
    } else if (boardState.toolActionType === mouseTypes.ERASING) {
      dispatchBoardStateActions({
        type: mouseTypes.ERASING,
        payload: { clientX, clientY },
      });
    }
  };

  const onMouseUp = (event) => {
    dispatchBoardStateActions({
      type: mouseTypes.CHANGE_TOOL_ACTION_TYPE,
      payload: toolActionType.NONE,
    });
  };

  const initialState = {
    toolbarElements: toolbarItems,
    selectedToolbarItem: boardState.selectedToolbarItem,
    elements: boardState.elements,
    toolActionType: boardState.toolActionType,
    handleOnClickToolbarItem,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };

  return (
    <boardContext.Provider value={initialState}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardProvider;
