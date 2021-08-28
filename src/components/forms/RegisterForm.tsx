import * as Yup from "yup";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Register } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import { history } from "../../";
import Upload from "../../features/upload/Upload";
import { features } from "../../app/api/agent";

function RegisterForm() {
  const { user, features } = useStore();
  const { id } = useParams<{ id: string }>();
  const [visited, setVisited] = useState(false);
  const [validate, setValidate] = useState({
    name: false,
    password: false,
    email: false,
    picture: false,
    about: false,
    city: false,
  });
  const [registerData, setRegisterData] = useState<Register>({
    name: "",
    email: "",
    password: "",
    about: "",
    photo_url: "",
    city: "",
  });
  const [step, setStep] = useState<number>(1);

  async function handleFormSubmit(e: any) {
    e.preventDefault();
    if (features.url.length > 1) {
      let data = { ...registerData, photo_url: features.url };

      user.registerUser(data).then(() => {
        if (id) {
          history.push(`/story/${id}`);
        } else history.push("/");
      });
    }
    console.log("hey");
  }

  const handleStep = (number: number) => {
    setStep(step + number);
    setVisited(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  return (
    <div className="register_form_container">
      <div className="content box-shadow ">
        <div className="img_container">
          <img
            src="https://i.pinimg.com/originals/1c/0e/46/1c0e46168ee3c4264d2fbcf7a21da044.jpg"
            alt="story"
          />
        </div>

        <div className="form_wrapper">
          {step > 1 && (
            <BsArrowLeft className="back" onClick={() => handleStep(-1)} />
          )}
          {visited && step === 1 && (
            <BsArrowRight className="next" onClick={() => handleStep(1)} />
          )}
          {step === 1 && (
            <div className="signup">
              <h1>Sign up</h1>
              <a href="/login">Already have an account?</a>
            </div>
          )}
          <form className="register_form" onSubmit={handleFormSubmit}>
            {step === 1 && (
              <>
                {" "}
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
                  placeholder="Minimun 8 characters"
                />
                <button type="button" onClick={() => handleStep(1)}>
                  Next
                </button>{" "}
              </>
            )}
            {step === 2 && (
              <div className="step_2">
                <Upload user={true} />
                <label htmlFor="city">Your name</label>
                <input
                  value={registerData.name}
                  onChange={handleChange}
                  minLength={1}
                  name="name"
                  type="text"
                  placeholder="your name"
                />
                <label htmlFor="city">Where you live</label>
                <input
                  value={registerData.city}
                  onChange={handleChange}
                  minLength={1}
                  name="city"
                  type="text"
                  placeholder="Write your city"
                />
                <label htmlFor="about">About you</label>
                <textarea
                  minLength={20}
                  value={registerData.about}
                  onChange={handleChange}
                  name="about"
                  id=""
                  cols={5}
                  rows={5}
                  placeholder="Minimun 20 characters"
                />
                <button type="submit">Register</button>{" "}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
