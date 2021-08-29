import { useState } from "react";
import { useParams } from "react-router-dom";
import { Login } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";

function RegisterForm() {
  const { user, features } = useStore();
  const { id } = useParams<{ id: string }>();

  const [validate, setValidate] = useState({
    name: false,
    password: false,
  });
  const [registerData, setRegisterData] = useState<Login>({
    email: "",
    password: "",
  });

  function handleFormSubmit(e: any) {
    e.preventDefault();
    user.getUser(registerData);
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  return (
    <div className="login_form_container">
      <div className="content box-shadow ">
        <div className="img_container">
          <img
            src="https://www.teahub.io/photos/full/1-18488_iphone-6-background-black-and-white.jpg"
            alt="story"
          />
        </div>

        <div className="form_wrapper">
          <div className="signup">
            <h1>Sign in</h1>
            <p>welcome back</p>
          </div>
          <form className="register_form" onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email address</label>
            <input
              value={registerData.email}
              onChange={handleChange}
              minLength={10}
              name="email"
              type="text"
              placeholder="Write your email"
            />
            <label htmlFor="password">Password</label>
            <input
              value={registerData.password}
              onChange={handleChange}
              minLength={8}
              type="password"
              name="password"
              placeholder="Your password"
            />
            <button type="submit" onClick={handleFormSubmit}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
