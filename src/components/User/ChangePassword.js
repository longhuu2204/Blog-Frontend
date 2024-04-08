import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, userSelector } from "../../reducers/User/loginForm";
import { changePassword } from "../../utils/callerAPI";
import { toastError, toastSuccess } from "../../Toast/Toast";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [new_password, setNewPassword] = useState("");
  const [old_password, setOldPassword] = useState("");
  const [new_password_confirm, setNewPasswordConfirm] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    dispatch(loadUser);
  }, [dispatch]);

  const onSubmitChangePassword = async (event) => {
    event.preventDefault();
    try {
      let data = {
        id_account: user.id_account,
        old_password: old_password,
        new_password: new_password,
      };
      const changePass = await changePassword(data);
      if (old_password === "") {
        toastError("Vui lòng nhập mật khẩu cũ!");
        return;
      }
      if (new_password === "") {
        toastError("Mật khẩu mới không được bỏ trống!");
        return;
      }
      if (new_password_confirm === "") {
        toastError("Vui lòng xác nhận mật khẩu!");
        return;
      }
      if (new_password !== new_password_confirm) {
        toastError("Mật khẩu mới và xác nhận mật khẩu không khớp nhau!");
        return;
      }

      if (changePass.status === 200) toastSuccess(changePass.message);
      else toastError(changePass.message);
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };
  return (
    <>
      <div className="wapper">
        <div className="content">
          <Link to="/">
            {" "}
            <header className="img-logo"></header>
          </Link>
          <div className="login-content">
            <div className="bia-login" />
            <form
              className="box-update-info open"
              onSubmit={onSubmitChangePassword}
            >
              <h2
                className="letter"
                style={{
                  fontSize: "40px",
                  fontWeight: "700",
                  marginTop: "80px",
                }}
              >
                Thay đổi mật khẩu
              </h2>

              <div id="input1-changePass">
                <label htmlFor="updateInfo-input1" className="item-lable">
                  <i className="fas fa-lock">&nbsp;&nbsp;</i>
                </label>
                <input
                  type="password"
                  className="item-input"
                  id="updateInfo-input1"
                  placeholder="Vui lòng nhập mật khẩu cũ"
                  name="old_password"
                  require="true"
                  value={old_password}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div id="input2-changePass">
                <label htmlFor="updateInfo-input2" className="item-lable">
                  <i className="fas fa-lock">&nbsp;&nbsp;</i>
                </label>
                <input
                  type="password"
                  className="item-input"
                  id="updateInfo-input2"
                  placeholder="Vui lòng nhập mật khẩu mới"
                  name="new_password"
                  require="true"
                  value={new_password}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div id="input3-changePass">
                <label htmlFor="updateInfo-input3" className="item-lable">
                  <i className="fas fa-lock">&nbsp;&nbsp;</i>
                </label>
                <input
                  type="password"
                  className="item-input"
                  id="updateInfo-input3"
                  placeholder="Vui lòng lặp lại mật khẩu mới vừa nhập"
                  name="new_password_confirm"
                  require="true"
                  value={new_password_confirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />
              </div>

              <button id="sign-in-changePass" type="submit">
                Đổi mật khẩu
              </button>
            </form>
            {/* <div className="box-retrieval-pass open">
                            <h2 style={{ marginBottom: "40px" }}>
                                Đổi mật khẩu
                            </h2>
                            <Form onSubmit={onSubmitChangePassword}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <label className="modal-lable">
                                        <i className="fas fa-user-tie fa-lg"></i>
                                    </label>
                                    <input
                                        type="password"
                                        className="modal-input"
                                        id="input-name-login1"
                                        placeholder="Nhập password mới"
                                        name="new_password"
                                        require="true"
                                        value={new_password}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <button className="retrieval-pass" type="submit" >
                                    Đổi mật khẩu
                                </button>
                            </Form>
                        </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
