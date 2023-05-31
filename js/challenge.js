document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('counter');
    const minusBtn = document.getElementById('minus');
    const plusBtn = document.getElementById('plus');
    const heartBtn = document.getElementById('heart');
    const pauseBtn = document.getElementById('pause');
    const likesList = document.querySelector('.likes');
    const commentsList = document.querySelector('#list');
    const commentForm = document.querySelector('#comment-form');
    const commentInput = document.getElementById('comment-input');
    let counter = 0;
    let timer;
    let isPaused = false;
    
    function startCounter() {
        timer = setInterval(incrementCounter, 1000);
      }
   startCounter();
   

   function incrementCounter() {
      counter++;
      counterElement.textContent = counter;
    }
  
    function decrementCounter() {
      counter--;
      counterElement.textContent = counter;
    }
  
    function likeNumber() {
      const likedNumber = counter;
      const existingLike = document.querySelector(`li[data-number="${likedNumber}"]`);
      if (existingLike) {
        const likeCount = parseInt(existingLike.dataset.count);
        existingLike.dataset.count = likeCount + 1;
        existingLike.textContent = `${likedNumber} has been liked ${likeCount + 1} times`;
      } else {
        const likeItem = document.createElement('li');
        likeItem.textContent = `${likedNumber} has been liked 1 time`;
        likeItem.dataset.number = likedNumber;
        likeItem.dataset.count = 1;
        likesList.appendChild(likeItem);
      }
    }
  
    function pauseCounter() {
      clearInterval(timer);
      minusBtn.disabled = true;
      plusBtn.disabled = true;
      heartBtn.disabled = true;
      pauseBtn.textContent = 'Resume';
      isPaused = true;
    }
  
    function resumeCounter() {
      minusBtn.disabled = false;
      plusBtn.disabled = false;
      heartBtn.disabled = false;
      pauseBtn.textContent = 'Pause';
      isPaused = false;
      startCounter();
    }
  
    function restartCounter() {
      counter = 0;
      counterElement.textContent = counter;
      likesList.innerHTML = '';
      commentsList.innerHTML = '';
      resumeCounter();
    }

    function addComment(event) {
      event.preventDefault();
      console.log(event)
      console.log(commentInput.value)
      const comment = commentInput.value;
      const commentItem = document.createElement('p');
      commentItem.textContent = comment;
      commentsList.append(commentItem);
      commentInput.value = '';
    }
  
    minusBtn.addEventListener('click', decrementCounter);
    plusBtn.addEventListener('click', incrementCounter);
    heartBtn.addEventListener('click', likeNumber);
    pauseBtn.addEventListener('click', () => {
      if (isPaused) {
        resumeCounter();
      } else {
        pauseCounter();
      }
    });
    commentForm.addEventListener('submit', addComment);
  
   

  });
