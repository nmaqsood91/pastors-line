import React from "react";

function Button(props) {
  const { children, onClick, className } = props;
  //using styling this way because it rendered faster then the css file
  const style = {
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
  };
  return (
    <button  type="button" style={style} className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
