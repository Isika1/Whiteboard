import React, { useContext } from "react";
import classes from "./index.module.css";
import cx from "classnames";
import boardContext from "../../store/board-context";


const Toolbar = () => {
  const { toolbarElements, handleOnClickToolbarItem, selectedToolbarItem } =
    useContext(boardContext);

  return (
    <div className={classes.container}>
      {toolbarElements.map((items) => {
        return (
          <div
            key={items.id}
            className={cx(classes.toolItem, {
              [classes.active]: selectedToolbarItem === items.name,
            })}
            onClick={() => handleOnClickToolbarItem(items.name)}
          >
            {items.icon}
          </div>
        );
      })}
    </div>
  );
};

export default Toolbar;
