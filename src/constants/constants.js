import { LuRectangleHorizontal } from "react-icons/lu";
import {
  FaSlash,
  FaRegCircle,
  FaLongArrowAltRight,
  FaEraser,
} from "react-icons/fa";
import { GiPaintBrush } from "react-icons/gi";

export const toolTypes = {
  LINE: "LINE",
  RECTANGLE: "RECTANGLE",
  CIRCLE: "CIRCLE",
  ARROW: "ARROW",
  BRUSH: "BRUSH",
  ERASER: "ERASER",
};

export const mouseTypes = {
  CHANGE_TOOL: "CHANGE_TOOL",
  DRAW_DOWN: "DRAW_DOWN",
  DRAW_MOVE: "DRAW_MOVE",
  DRAW_UP: "DRAW_UP", //TODO clear later
  CHANGE_TOOL_ACTION_TYPE: "CHANGE_TOOL_ACTION_TYPE",
  ERASING: "ERASING",
};

export const toolbarItems = [
  { id: 1, name: toolTypes.LINE, icon: <FaSlash /> },
  { id: 2, name: toolTypes.RECTANGLE, icon: <LuRectangleHorizontal /> },
  { id: 3, name: toolTypes.CIRCLE, icon: <FaRegCircle /> },
  { id: 4, name: toolTypes.ARROW, icon: <FaLongArrowAltRight /> },
  { id: 5, name: toolTypes.BRUSH, icon: <GiPaintBrush /> },
  { id: 6, name: toolTypes.ERASER, icon: <FaEraser /> },
];

export const toolboxColors = {
  BLACK: "#000000",
  RED: "#ff0000",
  GREEN: "#00ff00",
  BLUE: "#0000ff",
  ORANGE: "#ffa500",
  YELLOW: "#ffff00",
  WHITE: "#ffffff",
};

export const toolboxTypes = {
  CHANGE_STROKE: "CHANGE_STROKE",
  CHANGE_FILL: "CHANGE_FILL",
  CHANGE_SIZE: "CHANGE_SIZE",
};

export const fillToolTypes = [toolTypes.RECTANGLE, toolTypes.CIRCLE];

export const strokeToolTypes = [
  toolTypes.ARROW,
  toolTypes.RECTANGLE,
  toolTypes.CIRCLE,
  toolTypes.LINE,
  toolTypes.BRUSH,
];

export const sizeToolTypes = [
  toolTypes.ARROW,
  toolTypes.RECTANGLE,
  toolTypes.CIRCLE,
  toolTypes.LINE,
];

export const toolActionType = {
  NONE: "NONE",
  DRAWING: "DRAWING",
};

export const ELEMENT_ERASE_THRESHOLDS = 0.1;
