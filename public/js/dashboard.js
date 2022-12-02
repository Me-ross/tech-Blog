// Creating new post
const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    console.log(title, content)
    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log(response)
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };

// Deleting Posts
const delButtonHandler = async (id) => {
    console.log(id) 
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
  console.log(response)
    if (response.ok) {
      document.location.replace('/dashboard');
    // } else {
    //   alert('Failed to delete post');
    }
};

// Update Post
const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('post-id')) {
    const id = event.target.getAttribute('post-id');
    const title = document.querySelector('.updateTitle').value;
    const content = document.querySelector('#updateContent').value;

    console.log( id, title, content )

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
};

document
  .querySelector('form')
  .addEventListener('submit', newPostHandler);


document
  .querySelector('#update')
  .addEventListener('click', updateButtonHandler);

// eventlistener call happens before elements are dynamically created. So have to access buttons this way
document.addEventListener("click", function(e){
  const target = e.target.closest("#delete");
    if(target){
      const id = e.target.getAttribute('post-id');
    delButtonHandler(id);
  }
});