import React from "react";

function Modal({ showModal, title, children, maxWidth }) {
  const style = {
    height: "400px",
    overflowY: "scroll",
    display: "block",
  };
  return (
    <div className="container">
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={style}>
          <div
            className="modal-dialog "
            role="document"
            style={{
              maxWidth: maxWidth ? maxWidth : "100%",
              padding: "0 20px",
            }}
          >
            <div className="modal-content  mb-5">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
              </div>
              <div className="modal-body">{children}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
