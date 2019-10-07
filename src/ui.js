class UI {

    constructor()
        {
          this.post = document.querySelector('#posts');
          this.inputTitle = document.querySelector('#title');
          this.inputBody = document.querySelector('#body');
          this.inputId = document.querySelector('#id');
          this.submitPost = document.querySelector('.post-submit');
          this.formState ='add'; 
        }
    //Show posts    
    showPosts(posts)
        {
          let output='';
          posts.forEach((post)=>{
            output+=`
            <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>

            <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
          </div>
        </div>
            `;

          });
          this.post.innerHTML=output;
        }

    // Show alert message
    showAlert(message,className)
        {
           this.clearAlert();
           
           // create DIV for alert
           const div = document.createElement('div');
           // add classes
           div.className = className;
           // add text
           div.appendChild(document.createTextNode(message));
           // get parent
           const container = document.querySelector('.postsContainer');
           // get posts
           const posts = document.querySelector('#posts');
           // Insert the alert
           container.insertBefore(div,posts);

           // alert disappears after 3 secs
           setTimeout(()=>this.clearAlert(),3000);

        }
    
    // Clear alert message    
    clearAlert()
        {
          // check for current alerts
          const currentAlert = document.querySelector('.alert');
          if(currentAlert)
           {
             currentAlert.remove();
           }
        }
    
    // Clear all input fields
    clearFields()
        {
          this.inputTitle.value = '';
          this.inputBody.value = '';
        }

    // fill form to edit
    fillForm(data)
        {
          this.inputTitle.value = data.title;
          this.inputBody.value = data.body;
          this.inputId.value = data.id;

          this.changeFormState('edit');

        }
    
    // clear id from hidden field
    clearIdInput()
        {
          this.inputId.value = '';
        }

    // change form state
    changeFormState(type)
        {
          if(type === 'edit')
            {
              this.submitPost.textContent = "Update Post";
              this.submitPost.className = "post-submit btn btn-warning btn-block";

              // create cancel button
              const btn = document.createElement('button');
              btn.className = "post-cancel btn btn-light btn-block";
              btn.appendChild(document.createTextNode('Cancel Edit'));
              // get parent
              const cardForm = document.querySelector('.card-form');
              // get element to insert before
              const span = document.querySelector('.form-end');
              // insert the button
              cardForm.insertBefore(btn,span);
            }
            else
            {
              this.submitPost.textContent = "Post";
              this.submitPost.className = "post-submit btn btn-primary btn-block";

              // remove cancel button if it is there
              if(document.querySelector('.post-cancel'))
                {
                  document.querySelector('.post-cancel').remove();
                }
              // clear id from hidden field
              this.clearIdInput();
              // clear text
              this.clearFields();
               

            }
        }
}
export const ui = new UI();