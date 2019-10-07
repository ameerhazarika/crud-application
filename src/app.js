import {http} from './http'
import {ui}  from './ui'


// GET posts on DOM load
document.addEventListener("DOMContentLoaded",getPosts);

// Listen for adding a post
document.querySelector('.post-submit').addEventListener('click',submitPost);

// Listen for deleting a post
document.querySelector('#posts').addEventListener('click',deletePost)

// Listen for edit state
document.querySelector('#posts').addEventListener('click',enableEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click',cancelEdit);

// Get posts
function getPosts()
  {
    const response = http.get('http://localhost:3000/posts').then(data=>ui.showPosts(data)).catch(err=>console.log(err));
  }

// Submit post
function submitPost()
  {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    const data = {
      title,
      body
    }

    // validation
    if(title === '' || body === '')
      {
        ui.showAlert('Please fill all fields','alert alert-danger');
      }
      else
      {
        // check if ID exists to figure out whether to add post or update
        if(id ==='')
          {
               // Create a post
                http.post('http://localhost:3000/posts',data)
                .then(data => {
                  ui.showAlert('Post has been added','alert alert-success');
                  ui.clearFields();
                  getPosts();})
                .catch(err=> console.log(err))

          }
          else
          {
                // Update a post
                http.put(`http://localhost:3000/posts/${id}`,data)
                .then(data => {
                  ui.showAlert('Post has been updated','alert alert-success');
                  ui.changeFormState('add');
                  getPosts();})
                .catch(err=> console.log(err))

          }
       
    
       
      }

    
  }

//Delete a post
function deletePost(e)
  {
    e.preventDefault();
    if(e.target.parentElement.classList.contains('delete'))
      {
        // get post id or which post to delete
        const id = e.target.parentElement.dataset.id;
        
        if (confirm('Are you sure ?'))
          {
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data =>{
              ui.showAlert('Post has been deleted','alert alert-success');
              getPosts();
            })
            .catch(err=> console.log(err));
          }

      }
  }

// Enable edit function
function enableEdit(e)
  {
    if(e.target.parentElement.classList.contains('edit'))
      {
        const id = e.target.parentElement.dataset.id;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

        const data = {
          id,
          body,
          title
        }

        // fill form with current post
        ui.fillForm(data);
        
      }


    e.preventDefault();
  }

  // Cancel edit function
  function cancelEdit(e)
    {
      if(e.target.classList.contains('post-cancel'))
        {
          ui.changeFormState('add');
        }
      e.preventDefault();
    }