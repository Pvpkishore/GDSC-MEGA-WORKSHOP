function addTask() {
  const taskInput = document.getElementById('task');
  const durationInput = document.getElementById('duration');
  const tasksList = document.getElementById('tasks');

  const taskValue = taskInput.value;
  const durationValue = parseInt(durationInput.value);

  if (!taskValue || !durationValue || durationValue <= 0) {
    alert('Please enter a valid task and duration.');
    return;
  }

  const timestamp = new Date().toLocaleString();

  const taskItem = document.createElement('li');
  taskItem.classList.add('flex', 'justify-between', 'items-center', 'bg-gray-100', 'p-4', 'rounded-lg', 'shadow-md');
  taskItem.style.opacity = 0;  // Initially hidden for GSAP animation

  taskItem.innerHTML = 
    <span class="task flex-grow text-gray-800">${taskValue}</span>
    <span class="timestamp text-gray-500 ml-4">${timestamp}</span>
    <span class="countdown text-red-500 ml-4">${formatTime(durationValue * 60)}</span>
    <button class="gradient-button success-btn text-white mx-3 px-3 py-1 rounded" onclick="completeTask(this)">Success</button>
    <button class="red-gradient-button text-white px-3 py-1 ml-2 rounded" onclick="deleteTask(this)">Delete</button>
  ;

  tasksList.appendChild(taskItem);

  // GSAP animation for adding task
  gsap.to(taskItem, { opacity: 1, duration: 0.5, y: -10 });

  // Start countdown
  startCountdown(taskItem.querySelector('.countdown'), durationValue * 60);

  taskInput.value = '';
  durationInput.value = '';
}

function deleteTask(button) {
  const taskItem = button.parentElement;
  
  // GSAP animation for deleting task
  gsap.to(taskItem, {
    opacity: 0, 
    duration: 0.5, 
    y: 10, 
    onComplete: () => {
      taskItem.remove();
    }
  });
}

function completeTask(button) {
  const taskItem = button.parentElement;
  taskItem.style.textDecoration = 'line-through';
  
  // GSAP animation for task completion
  gsap.to(taskItem, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });
  
  button.remove();
}

// Function to format time in MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return ${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')};
}

// Function to start countdown
function startCountdown(element, duration) {
  let timeRemaining = duration;

  const interval = setInterval(() => {
    timeRemaining--;

    if (timeRemaining < 0) {
      clearInterval(interval);
      alert('Time is up!');
      element.parentElement.style.color = 'red'; // Highlight expired tasks
    } else {
      element.textContent = formatTime(timeRemaining);
    }
  }, 1000); // Update every second
}
