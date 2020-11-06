import React from "react";
import iconLibrary from "./iconlibrary";
import PropTypes from "prop-types";

function whichIcon(icon) {
  if (Object.getOwnPropertyNames(iconLibrary).includes(icon)) {
    return iconLibrary[icon];
  }
}

function Icon({ icon, strokeWidth, size, color, returnAsString }) {
  const iconStyle = {
    width: size,
    height: size,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      shapeRendering="geometricPrecision"
      size={size}
      fill="none"
      style={iconStyle}
    >
      <g
        stroke={color}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {whichIcon(icon)}
      </g>
    </svg>
  );
}

Icon.defaultProps = {
  strokeWidth: 2,
  size: "24px",
  color: "currentColor",
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default Icon;
