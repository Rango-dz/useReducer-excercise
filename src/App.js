import React, { useEffect, useReducer } from 'react'

export const App = () => {




  
    const paused  = () => {
      let disablebutton = document.querySelectorAll('button:not(#pauseButton)');
      disablebutton.forEach(button => button.disabled ? button.disabled = false : button.disabled = true)
    }
  
    const handleSubmit = (e) => {
      console.log(e)
      e.preventDefault();
      let targetH1 = document.querySelector('h1')
      let elementUL = document.createElement('ul');
      let elementLI = document.createElement('li');
      let deleteButton = document.createElement('button')
      deleteButton.setAttribute('id', 'delete');
      deleteButton.setAttribute('class', 'p-1 m-1 bg-red-500 text-white rounded-lg');
      deleteButton.innerText = 'Delete';
      elementLI.innerText = state.comments;
      targetH1.appendChild(elementUL);
      elementUL.appendChild(elementLI);
      elementLI.appendChild(deleteButton);
      console.log('comments',state.comments)
      deleteButton.addEventListener('click', (e) => {
        console.log('ok');
        elementLI.remove();
      });
      e.target.value = '';
    }

  let initialState = {
    counter: 0,
    likes: 0,
    paused: null,
    comments: ''
  }

 const reducer =  (state, action) => {
  switch (action.type) {
    case 'increment':
      return {
      ...state,
      counter: state.counter + 1
      }
    case 'decrement':
      return {
      ...state,
      counter: state.counter - 1
      }
    case 'likes':
      return {
      ...state,
        likes: state.likes + 1
      }
    case 'paused':
      return {
        ...state,
          paused: action.payload
        }
    case 'comments':
      return {
      ...state,
        comments: action.payload
      }
    default:
      return state
  }

 }

  const [state, dispatcher] = useReducer(reducer, initialState);

  useEffect(() => {
    const everySecond = setInterval(() => {
      dispatcher({type: 'increment'})
    }, 1000) 
    console.log(state.counter)
    
    return () => clearInterval(everySecond);
  }, [])

  return (
    <>
      <div className="flex flex-col justify-center align-middle w-1/2 m-auto">
      <div>{state.counter}</div><br />


     <div className="flex">
     <button className='disabled:bg-slate-200 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer border shadow bg-white p-1 rounded-sm m-1 hover:bg-slate-100 hover:shadow-md' 
     onClick={() => dispatcher({type: 'increment'})}>+1</button><br />
      <button className='disabled:bg-slate-200 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer border shadow bg-white p-1 rounded-sm m-1 hover:bg-slate-100 hover:shadow-md' 
      onClick={() => dispatcher({type: 'decrement'})}>-1</button><br />
      <button className='disabled:bg-slate-200 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer border shadow bg-white p-1 rounded-sm m-1 hover:bg-slate-100 hover:shadow-md' 
      onClick={() => dispatcher({type: 'likes'})}>❤</button><br />
      <button id='pauseButton' className='disabled:bg-slate-200 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer border shadow bg-white p-1 rounded-sm m-1 hover:bg-slate-100 hover:shadow-md' 
      onClick={() => dispatcher({type: 'paused', payload: paused()})}>⏸</button><br />
     </div>

      <div className="likearea"></div>

      <hr />

      <h1>Comments</h1>
      <form onSubmit={handleSubmit}>
      <input value={state.comments} onChange={e => {
      dispatcher({type: 'comments', payload: e.target.value})
      } }
      type="text" name="comment" id="comment" required/>
       <button 
       className='disabled:bg-slate-200 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer border shadow bg-white p-2 rounded-sm m-1 ml-0 hover:bg-slate-100 hover:shadow-md' 
       type="submit" 
       value='submit'>submit</button> 
      </form>
      </div>
    </>
  )
}

export default App;

// import React from "react";

// function App() {
//   const [user, setUser] = React.useState([]);

//   const fetchData = () => {
//     fetch('https://randomuser.me/api/')
//       .then((response) => {
//         if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//         return response.json();
//       })
//       .then((data) => {
//         setUser(data.results);
//       })

//   };

//   React.useEffect(() => {
//     fetchData();
//   }, []);

//   return Object.keys(user).length > 0 ? (
//     <div style={{padding: "40px"}}>
//       {
//     user.map((data) => {
//       return <span key={data.phone}>{data.name.first}</span>
//       })}
//       <h1>Customer data</h1>
//       <img src={user[0].picture.large} alt={user[0].name.first}></img>
//       <h2>First name: {user[0].name.first}</h2>
//       <h2>Last name: {user[0].name.last}</h2>

//       <h2>Email: {user[0].email}</h2>
//       <h2>Phone: {user[0].phone}</h2>
//     </div>
//   ) : (
//     <h1>Data pending...</h1>
//   );
// }

// export default App;


// import { useEffect, useState } from "react";


// const ChildComponent  = (props) => {
//     const [clicked, setClicked] = useState(false);
// useEffect(() => {
//   console.log(props.click);
// })
//   const handleClick = () => {
//     setClicked(!clicked);
//     props.click(clicked);
//   };
  
//   return (
//     <>
//     <br />
//       <button onClick={handleClick}>
//         {clicked? "Clicked" : "Click Me"}
//       </button>
//     </>
//   )
// }

// export default function App() {
  
//   const [giftCard, setGiftCard] = useState(
//     {
//         firstName: "Jennifer",
//         lastName: "Smith",
//         text: "Free dinner for 4 guests",
//         valid: true,
//         instructions: "To use your coupon, click the button below.",
//     }
//   );

//   useEffect(() => {
//     console.log(giftCard.valid);
//   },[giftCard])

//   function spendGiftCard() {
//     setGiftCard({...giftCard, valid:false, text:"Your coupon has been used", instructions:"Please visit our restaurant to renew your gift card"})
//   }

//   function clicker(isclicked) {
//     setGiftCard({...giftCard, valid:isclicked});
//   }

//   useEffect(() => {
//     document.title = giftCard.valid ? "Your coupon has been used" :  "Please visit our restaurant to renew your gift card";
//   },[giftCard.valid])

//   return (
//     <div style={{padding: '40px'}}>
//       <h1>
//         Gift Card Page
//       </h1>
//       <h2>
//         Customer: {giftCard.firstName} {giftCard.lastName}
//       </h2>
//       <h3>
//         {giftCard.text}
//       </h3>
//       <p>
//         {giftCard.instructions}
//       </p>
//       {/* {
//         giftCard.valid && (
//           <button onClick={spendGiftCard}>
//             Spend Gift Card
//           </button>
//         )
//       } */}

//       <ChildComponent click={clicker}/>
//     </div>
//   );
// }



// import { useState } from "react";
// import "./App.css";
// import AppForm from "./AppForm";
// import UserContext from "./components/UserContext";
// import UserProfile from "./components/UserProfile";


// const App = () => {
//   const [data, setData] = useState([]);
//   function userData(infodata) {setData([...data, infodata])}

//   return (
//     <>
//     <UserContext>
//       <AppForm onAdd={userData}/>
//       <UserProfile data={data}/>
//     </UserContext>
//     </>
//   );
// }

// export default App;