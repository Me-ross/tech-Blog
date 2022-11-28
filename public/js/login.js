const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  console.log(username, password);

// once you have the username & password you need to packge it as an object and send it to the server - we do a fetch - since the fetch is an async await function you need to add async before the event on line1
// fetching to a route (convention says to fetch to an api something that has to do with the user and it is a login) make sure you match in your controller the exact same route.

const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({ 
      username,
      password,
    }),
    headers: {'Content-Type': 'application/json'},
  });
console.log("line20, login.js", response)

if (response.ok) {
// if response ok go to homepage change to dashboard ('/dashboard)
document.location.replace('/dashboard');
} else {
   alert('Incorrect username or password, please try again');
}
};

document.querySelector('form').addEventListener('submit', loginFormHandler);