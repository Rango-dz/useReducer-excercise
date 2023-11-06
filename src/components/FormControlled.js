import { useState } from "react";
import { validateEmail } from "./utils";
import { createContext, useContext } from "react";

const FormContext = createContext(undefined);

export function useForm() {
  return useContext(FormContext);
}

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

function FormContrlled({Children}) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    value: '',
    isTouched: false,
  });
  const [role, setRole] = useState("role");
  const [userInfo, setUserInfo] = useState([]);

  const handleFirstname = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastname = (e) => {
    setLastName(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }  
  const handlePassword = (e) => {
    setPassword({
      ...password, 
      value: e.target.value,
    })
  }   
  const handleRoles = (e) => {
    setRole(e.target.value)
  } 

  const getIsFormValid = () => {
    // Implement this function
    if (firstName.length === 0 || validateEmail(email) == null || password.value.length < 8 || role === 'role') {
      return false
    } 
    return true;
  };

  const clearForm = (e) => {
    // Implement this function
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setRole('Role');
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserInfo([firstName, lastName, email, password.value ])
    // userInfo.push(firstName, lastName, email, password)
    console.log(userInfo);
    // clearForm(e);
  };

  return (
    <>
    
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label htmlFor="Firstname">
              First name <sup>*</sup>
            </label>
            <input 
            type='text' 
            onChange={handleFirstname} 
            id="Firstname"
            name="Firstname"
            value={firstName} 
            placeholder="First name" />
          </div>
          <div className="Field">
            <label htmlFor="Lastname">Last name</label>
            <input 
            type='text' 
            onChange={handleLastname} 
            id="Lastname"
            name="Lastname"
            value={lastName} 
            placeholder="Last name" />
          </div>
          <div className="Field">
            <label htmlFor="email">
              Email address <sup>*</sup>
            </label>
            <input 
            type='email' 
            onChange={handleEmail} 
            id="email"
            name="email"
            value={email} 
            placeholder="Email address" />
          </div>
          <div className="Field">
            <label htmlFor="password">
              Password <sup>*</sup>
            </label>
            <input 
            type='password'
            id="password"
            name="password" 
            onChange={handlePassword} 
            value={password.value} 
            placeholder="Password" 
            onBlur={() => setPassword({...password, isTouched : true})}
          />
          {(password.value.length < 8 && password.isTouched) ? <PasswordErrorMessage/> : null}
          </div>
          <div className="Field">
            <label htmlFor="roles">
              Role <sup>*</sup>
            </label>
            <select 
            id="roles"
            name="roles"
            onChange={handleRoles} value={role}>
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <button type="submit" disabled={!getIsFormValid()} >
            Create account
          </button>
        </fieldset>
      </form>
    </div>
    <FormContext.Provider value={userInfo}>
            {Children}
    </FormContext.Provider>
    </>
  );
}

export default FormContrlled;
