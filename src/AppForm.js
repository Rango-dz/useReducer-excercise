// Create context api for this files
import React, { useState } from "react";
import { validateEmail } from "./components/utils";
import { Infouser } from "./components/UserContext";


const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};


function AppForm(props) {
  const isItloggedIn = Infouser();

  console.log(isItloggedIn);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [role, setRole] = useState("role");
  const [userInfo, setUserInfo] = useState([]);

  const handleFirstname = (e) => setFirstName(e.target.value);
  const handleLastname = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword({ ...password, value: e.target.value });
  const handleRoles = (e) => setRole(e.target.value);

/**
 * Check if the form is valid.
 * 
 * @returns {boolean} True if the form is valid, false otherwise.
 */
const getIsFormValid = () => {
  // Check if the first name is not empty
  const isFirstNameValid = firstName.length > 0;

  // Check if the email is valid
  const isEmailValid = validateEmail(email) !== null;

  // Check if the password value length is greater than or equal to 8
  const isPasswordValid = password.value.length >= 8;

  // Check if the role is not 'role'
  const isRoleValid = role !== 'role';

  // Return true if all validations pass, false otherwise
  return isFirstNameValid && isEmailValid && isPasswordValid && isRoleValid;
};

/**
 * Clears the form fields.
 */
const clearForm = () => {
  // Clear first name field
  setFirstName("");

  // Clear last name field
  setLastName("");

  // Clear email field
  setEmail("");

  // Clear password field
  setPassword({ value: "", isTouched: false });

  // Clear role field
  setRole("role");
};

/**
 * Handles form submission.
 * @param {Event} e - The form submission event.
 */
const handleSubmit = (e) => {
  e.preventDefault(); // Prevents the default form submission behavior.
  if (getIsFormValid()) { // Checks if the form is valid.
    setUserInfo([...userInfo, { firstName, lastName, email, password, role }]);
    props.onAdd(userInfo);
    clearForm(); // Clears the form fields.
  }
};

  return (

    <>
    {!isItloggedIn && 

    <div className="App ">
      <form onSubmit={handleSubmit} className="flex justify-center w-1/2 m-auto align-middle">
        <fieldset className="">
          <h2>Sign Up</h2>
          <div className="flex flex-col justify-between mb-4">
            <label htmlFor="Firstname">
              First name <sup className="text-red-600">*</sup>
            </label>
            <input
              type="text"
              onChange={handleFirstname}
              id="Firstname"
              name="Firstname"
              value={firstName}
              placeholder="First name"
            />
          </div>
          <div className="flex flex-col justify-between mb-4">
            <label htmlFor="Lastname">Last name <sup className="text-red-600">*</sup>
            </label>
            <input
              type="text"
              onChange={handleLastname}
              id="Lastname"
              name="Lastname"
              value={lastName}
              placeholder="Last name"
            />
          </div>
          <div className="flex flex-col justify-between mb-4">
            <label htmlFor="email">
              Email address <sup className="text-red-600">*</sup>
            </label>
            <input
              type="email"
              onChange={handleEmail}
              id="email"
              name="email"
              value={email}
              placeholder="Email address"
            />
          </div>
          <div className="flex flex-col justify-between mb-4">
            <label htmlFor="password">
              Password <sup className="text-red-600">*</sup>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlePassword}
              value={password.value}
              placeholder="Password"
              onBlur={(e) => setPassword({ ...password, isTouched: true })}
            />
            {password.value.length < 8 && password.isTouched && <PasswordErrorMessage />}
          </div>
          <div className="flex flex-col justify-between mb-4">
            <label htmlFor="roles">
              Role <sup className="text-red-600">*</sup>
            </label>
            <select
              id="roles"
              name="roles"
              onChange={handleRoles}
              value={role}
            >
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <input className="Button shaddow-md bg-white border rounded p-2 my-2 w-full hover:bg-slate-50  hover:cursor-pointer hover:shadow" type="submit" value="Create Account" />
        </fieldset>
      </form>
    </div>
    }
</>
  );
}

export default AppForm;
