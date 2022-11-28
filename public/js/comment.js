const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#commnent').value();
  console.log(comment);
}

const response = await fetch('api/post/:id', {
    method: 'POST',
    body: JSON.stringify({
        comment,
    }),
    headers: {'Content-Type': 'application/json'},
});
console.log(response)
  
document.querySelector('form').addEventListener('submit', loginFormHandler);