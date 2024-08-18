import React, { useRef, useLayoutEffect, useContext } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import toolboxContext from "../../store/toolbox-context";
import { toolTypes } from "../../constants/constants";

const Board = () => {
  const canvasRef = useRef();
  const { onMouseMove, onMouseDown, onMouseUp, elements, selectedToolbarItem } =
    useContext(boardContext);
  const { toolboxState } = useContext(toolboxContext);

  const strokeColor = toolboxState[selectedToolbarItem].stroke;
  const fillColor = toolboxState[selectedToolbarItem].fill;
  const size = toolboxState[selectedToolbarItem].size;

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();
    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      switch (element.toolType) {
        case toolTypes.LINE:
        case toolTypes.RECTANGLE:
        case toolTypes.CIRCLE:
        case toolTypes.ARROW:
          roughCanvas.draw(element.roughEle);
          break;

        case toolTypes.BRUSH:
          context.fillStyle = element.strokeColor;
          context.strokeWidth = element.size;
          context.fill(element.path);
          context.restore();
          break;

        default:
          break;
      }
    });
    //is for listening to unmounting
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  const handleOnMouseDown = (event) => {
    onMouseDown(event, strokeColor, fillColor, size);
  };

  const handleOnMouseMove = (event) => {
    onMouseMove(event, strokeColor, fillColor, size);
  };

  return (
    <canvas
      ref={canvasRef}
      height={window.innerHeight}
      width={window.innerWidth}
      id={"canvas"}
      onMouseDown={handleOnMouseDown}
      onMouseMove={handleOnMouseMove}
      onMouseUp={onMouseUp}
    />
  );
};

export default Board;
