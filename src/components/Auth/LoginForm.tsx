import React from "react";
import Link from "next/link";

const LoginForm = () => {
  return (
    <>
      <div className="my-account-area ptb-120">
        <div className="container">
          <div className="my-account-form">
            <div className="text-center mb-4">
              <h3>로그인</h3>
              <p>
                아직 회원이 아니신가요? <Link href="/register">회원가입</Link>
              </p>
            </div>

            <form>
              <div className="currency-input position-relative z-1">
                <label className="label">아이디</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="아이디를 입력해주세요."
                />
              </div>
              <div className="currency-input position-relative z-1">
                <label className="label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="비밀번호를 입력해주세요.."
                />
              </div>
              <button type="submit" className="btn btn-secondary w-100 mt-4">
                로그인
              </button>
            </form>

            <Link
              href="/forgot-password"
              className="text-decoration-none my-4 d-block text-center"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
