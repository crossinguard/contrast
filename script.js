let isDragging = false;
let activeCount = 0;
let inactiveCount = 0;

// Function to create the grid
function createGrid() {
  const gridContainer = document.getElementById('grid-container');
  for (let i = 0; i < 10; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 10; j++) {
      const box = document.createElement('div');
      box.classList.add('grid-item', 'active');
      box.addEventListener('mousedown', handleMouseDown);
      box.addEventListener('mouseover', handleMouseOver);
      row.appendChild(box);
      activeCount++; // Initialize activeCount for all boxes as active
    }
    gridContainer.appendChild(row);
  }

  updateCounter(); // Call this function to initially update the counters
}

// Function to toggle the box state between active and inactive
function toggleBoxState(event) {
  const box = event.target;
  box.classList.toggle('active');
  box.classList.toggle('inactive');
  if (box.classList.contains('active')) {
    activeCount++;
    inactiveCount--;
  } else {
    activeCount--;
    inactiveCount++;
  }
  updateCounter(); // Call this function to update the counters
}

// Function to update the counter values
function updateCounter() {
  document.getElementById('active-count').textContent = activeCount;
  document.getElementById('inactive-count').textContent = inactiveCount;
}

function handleMouseDown(event) {
  isDragging = true;
  toggleBoxState(event);
}

function handleMouseOver(event) {
  if (isDragging) {
    toggleBoxState(event);
  }
}

function handleMouseUp() {
  isDragging = false;
}

// Function to reset all boxes to active (red)
function resetGrid() {
  const boxes = document.querySelectorAll('.grid-item');
  boxes.forEach((box) => {
    box.classList.remove('inactive');
    box.classList.add('active');
  });
  activeCount = 100; // Reset activeCount
  inactiveCount = 0; // Reset inactiveCount
  updateCounter(); // Update the counters
}

// Function to make all boxes inactive (blue)
function makeInactive() {
  const boxes = document.querySelectorAll('.grid-item');
  boxes.forEach((box) => {
    box.classList.remove('active');
    box.classList.add('inactive');
  });
  activeCount = 0; // Reset activeCount
  inactiveCount = 100; // Reset inactiveCount
  updateCounter(); // Update the counters
}

// Initialize the grid
createGrid();

// Add event listeners to the buttons
document.getElementById('reset-button').addEventListener('click', resetGrid);
document.getElementById('inactive-button').addEventListener('click', makeInactive);

// Add event listener for mouseup to stop dragging
document.addEventListener('mouseup', handleMouseUp);
