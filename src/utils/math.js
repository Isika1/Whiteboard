import { ELEMENT_ERASE_THRESHOLDS } from "../constants/constants";

export const isNearPoint = (x, y, x1, y1) => {
  return Math.sbs(x - x1) < 5 && Math.abs(y - y1) < 5;
};

export const isPointCloseToLine = (x1, y1, x2, y2, pointX, pointY) => {
  const distToStart = distanceBetweenPoints(x1, y1, pointX, pointY);
  const distToEnd = distanceBetweenPoints(x2, y2, pointX, pointY);
  const distLine = distanceBetweenPoints(x1, y1, x2, y2);
  return (
    Math.abs(distToStart + distToEnd - distLine) < ELEMENT_ERASE_THRESHOLDS
  );
};

export const getArrowHeadsCoordinates = (x1, y1, x2, y2, arrowLength = 20) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);

  const x3 = x2 - arrowLength * Math.cos(angle - Math.PI / 6);
  const y3 = y2 - arrowLength * Math.sin(angle - Math.PI / 6);

  const x4 = x2 - arrowLength * Math.cos(angle + Math.PI / 6);
  const y4 = y2 - arrowLength * Math.sin(angle + Math.PI / 6);

  return {
    x3,
    y3,
    x4,
    y4,
  };
};

const distanceBetweenPoints = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};
