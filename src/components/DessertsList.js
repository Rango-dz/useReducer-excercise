import {useState} from 'react'

const DessertsList = () => {

 const [username, setUsername] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 console.log(username, email, password);
 const form = [];

 const handleUsername = ((e) => {
  e.preventDefault();
  setUsername(e.target.value)
 })
 const handleEmail = ((e) => {
  e.preventDefault();
  setEmail(e.target.value)

 })
 const handlePassword = ((e) => {
  e.preventDefault();
  setPassword(e.target.value)

 })

 const handleForm = (e) => {
  e.preventDefault();
  form.push(username, email, password);
  console.log(form);
 }


  return (

    <>
    <form action="/" onSubmit={handleForm}>

      <label htmlFor="usernameOne">Username </label>
      <input value={username}
       onChange={handleUsername} 
       type="text" id="usernameOne" name="usernameOne" />
       <br />

      <label htmlFor="emailOne">Email </label>
      <input value={email}
       onChange={handleEmail} 
       type="email" id="emailOne" name="emailOne" />
       <br />

      <label htmlFor="passwordOne">Password </label>
      <input value={password}
      onChange={handlePassword}   
       type="password" id="passwordOne" name="passwordOne" />
        <br />

       <button type='submit'>Submit</button>
      </form>
</>
  )
}

export default DessertsList;