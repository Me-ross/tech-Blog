const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.getElementById('comment').value;
  console.log(comment);
  const postId = window.location.href.split('/')[4]
  console.log(postId);
  const response = await fetch('/api/posts/comment', {
    method: 'POST',
    body: JSON.stringify({
        comment, postId
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response)
  // if (responok refresh page
  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to update post');
  }
};
  
document.querySelector('form').addEventListener('submit', commentFormHandler);