import getStroke from "perfect-freehand";
import {
  mouseTypes,
  toolActionType,
  toolTypes,
} from "../../constants/constants";

import {
  createRoughElement,
  getSvgPathFromStroke,
  isPointNearElement,
} from "../../utils/elements";

export const boardReducer = (state, action) => {
  //*state and action of reducer

  switch (action.type) {
    case mouseTypes.CHANGE_TOOL: {
      return {
        ...state, // spread operator = merges previous state
        selectedToolbarItem: action.payload,
      };
    }

    case mouseTypes.DRAW_DOWN: {
      const { clientX, clientY, strokeColor, fillColor, size } = action.payload;
      const newItem = createRoughElement(
        state.elements.length - 1,
        clientX,
        clientY,
        clientX,
        clientY,
        { toolType: state.selectedToolbarItem, strokeColor, fillColor, size }
      );

      return {
        ...state,
        elements: [...state.elements, newItem], //... => spread operator is used for merging
        toolActionType: toolActionType.DRAWING,
      };
    }

    case mouseTypes.DRAW_MOVE: {
      const { clientX, clientY, strokeColor, fillColor, size } = action.payload;

      const currentIndex = state.elements.length - 1;

      if (currentIndex >= 0) {
        const existingElements = [...state.elements];
        const currentElement = { ...existingElements[currentIndex] }; //same as bel but in 2 steps

        switch (currentElement.toolType) {
          case toolTypes.BRUSH: {
            const points = { x: clientX, y: clientY };
            currentElement.points = [...currentElement.points, points];
            const strokes = getStroke(currentElement.points);
            const path = getSvgPathFromStroke(strokes);
            currentElement.path = new Path2D(path);
            existingElements[currentIndex] = currentElement;
            return { ...state, elements: existingElements };
          }

          case toolTypes.LINE:
          case toolTypes.ARROW:
          case toolTypes.CIRCLE:
          case toolTypes.RECTANGLE: {
            const newElement = createRoughElement(
              currentIndex,
              currentElement.x1,
              currentElement.y1,
              clientX,
              clientY,
              {
                toolType: state.selectedToolbarItem,
                strokeColor,
                fillColor,
                size,
              }
            );
            existingElements[currentIndex] = newElement;
            return {
              ...state,
              elements: existingElements,
            };
          }

          default:
            break;
        }
      }
      return state;
    }

    case mouseTypes.CHANGE_TOOL_ACTION_TYPE: {
      return {
        ...state,
        toolActionType: action.payload, //payload - > parameter of reducer
      };
    }

    case mouseTypes.ERASING: {
      const { clientX, clientY } = action.payload;
      const copiedElements = [...state.elements];
      const filteredElements = copiedElements.filter((elements) => {
        return !isPointNearElement(elements, {
          pointX: clientX,
          pointY: clientY,
        });
      });
      return { ...state, elements: filteredElements };
    }
    default:
      return state;
  }
};

export const initialReducerState = {
  selectedToolbarItem: toolTypes.LINE,
  elements: [],
  toolActionType: toolActionType.NONE,
};
