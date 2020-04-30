import React from 'react'

const Home = () => {
  return (
    <div className='col-md-6 offset-md-3 text-center'>
      <br/>
      <p></p>
      <h1 className="p-5">MERN STACK AUTH APPLICATION v1.0</h1>
      <h2> React.js / Node.js / MongoDB</h2>
      <hr />
      <p className="lead">
        MERN Stack Auth application makes use of React with Hooks for front end framework.
        It uses context API with
        reducer hook for global state management.
        <p></p>
        Backend API is in Express.js and it uses NoSQL database MongoDB with Mongoose ODM for data storage.
        SendGrid used as an SMTP service for email notifications.
        <hr/>
        <h3>App Features - </h3>
        <ul>
          <li>User Sign Up with Account Activation</li>
          <li>JWT Authentication </li>
          <li>User Sign In </li>
          <li>User Sign Out </li>
          <li>User Role Based Authorization </li>
          <li>Private and Admin Routes </li>
          <li>User Profile and Admin Profile Pages</li>
          <li>Update Profile</li>
          <li>Forgot Password</li>
          <li>Reset Password </li>
        </ul>





      </p>

    </div>
  )
}

export default Home
