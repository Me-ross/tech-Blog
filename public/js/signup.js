const signupFormHandler = async (event) => {
    event.preventDefault();
  console.log('arrived at signup function')
    const username = document.querySelector('#user-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    console.log("#7 singup.js", username, password);
  
  const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ 
        username,
        password,
      }),
      headers: {'Content-Type': 'application/json'},
    });
  console.log(response)
  
  if (response.ok) {
  // if response ok go to homepage change to dashboard ('/dashboard)
  document.location.replace('/dashboard')
  } else {
     alert('Incorrect username or password, please try again');
  }
  };
  
  document.querySelector('form').addEventListener('submit', signupFormHandler);
