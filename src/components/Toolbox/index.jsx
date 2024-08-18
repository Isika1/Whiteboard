import React, { useContext } from "react";
import classes from "./index.module.css";
import {
  fillToolTypes,
  sizeToolTypes,
  strokeToolTypes,
  toolboxColors,
} from "../../constants/constants";
import cx from "classnames";
import boardContext from "../../store/board-context";
import toolboxContext from "../../store/toolbox-context";

const Toolbox = () => {
  const { selectedToolbarItem } = useContext(boardContext);
  const {
    toolboxState,
    onClickStroke,
    onClickFill,
    onChangeSize,
    // onClickCheckbox,
    // checkbox,
  } = useContext(toolboxContext); //Using provider by calling use context
  const strokeColor = toolboxState[selectedToolbarItem].stroke;
  const fillColor = toolboxState[selectedToolbarItem].fill;
  const size = toolboxState[selectedToolbarItem].size;

  return (
    <div className={classes.container}>
      {/* Stroke */}
      {strokeToolTypes.includes(selectedToolbarItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Stroke Color</div>
          {/*Object = instance , values = func*/}
          {Object.values(toolboxColors).map((color) => {
            return (
              <div
                key={color}
                className={cx(classes.colorBox, {
                  [classes.activeColorBox]: strokeColor === color,
                })}
                style={{ backgroundColor: color }}
                onClick={() => onClickStroke(selectedToolbarItem, color)}
              />
            );
          })}
        </div>
      )}

      {/* Fill  */}
      {fillToolTypes.includes(selectedToolbarItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Fill Color</div>
          {/*Object = instance , values = func*/}
          {Object.values(toolboxColors).map((color) => {
            return (
              <div
                key={color}
                className={cx(classes.colorBox, {
                  [classes.activeColorBox]: fillColor === color,
                })}
                style={{ backgroundColor: color }}
                onClick={() => onClickFill(selectedToolbarItem, color)}
              />
            );
          })}
        </div>
      )}

      {/* Size  */}
      {sizeToolTypes.includes(selectedToolbarItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Stroke Width</div>
          <input
            min={1}
            max={10}
            type="range"
            value={size}
            step={1}
            onChange={(event) =>
              onChangeSize(selectedToolbarItem, event.target.value)
            }
          />
        </div>
      )}

      {/* Step 1  - send data */}
      {/* <input
        type="checkbox"
        value={checkbox}
        onChange={() => onClickCheckbox()}
      /> */}
    </div>
  );
};

export default Toolbox;
