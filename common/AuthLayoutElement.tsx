import React from "react";

const AuthLayoutElement = ({ children }) => {
  return (
    <div
      data-simplebar="init"
      className="main-auth-scrollbar"
      style={{
        background: 'url("/images/bg2.png") center no-repeat',
        backgroundSize: "cover"
      }}
    >
      <div className="simplebar-wrapper">
        <div className="simplebar-mask">
          <div className="simplebar-offset">
            <div
              className="simplebar-content-wrapper"
              aria-label="scrollable content"
              style={{ height: "auto", overflow: "hidden" }}
            >
              <div className="ant-layout-content main-content-view">
                <div className={"login-style"}>
                  <div className="auth-wrap">
                    <div className="ant-card ant-card-bordered auth-card">
                      <div className="ant-card-body">{children}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="simplebar-placeholder"
        style={{ width: "auto", height: 961 }}
      ></div>
    </div>
  );
};

export default AuthLayoutElement;
