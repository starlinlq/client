import * as Yup from "yup";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Register } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import { history } from "../../";

function RegisterForm() {
  const { user } = useStore();
  const { id } = useParams<{ id: string }>();
  console.log(id);

  function handlFormSubmit(data: Register) {
    user.registerUser(data).then(() => {
      if (id) {
        history.push(`/story/${id}`);
      } else history.push("/");
    });
  }

  return (
    <div>
      <form className="register_form"></form>
    </div>
  );
}

export default RegisterForm;
