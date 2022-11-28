const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#user-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    console.log(username, password);
  
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
  document.location.replace('/')
  } else {
     alert('Incorrect username or password, please try again');
  }
  };
  
  document.querySelector('signup-form').addEventListener('submit', signupFormHandler);