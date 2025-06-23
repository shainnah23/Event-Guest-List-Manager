const form = document.getElementById('guest-form');
const guestList = document.getElementById('guest-list');
const guestNameInput = document.getElementById('guest-name');
const emptyMessage = document.getElementById('empty-message');
let guests = [];

form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (guests.length >= 10) {
    alert('Guest list limit reached (10 guests max).');
    return;
  }

  const name = guestNameInput.value.trim();
  if (name === '') return;

  const guest = {
    name,
    attending: true,
    addedAt: new Date()
  };
  guests.push(guest);
  renderGuests();
  guestNameInput.value = '';
});

function renderGuests() {
  guestList.innerHTML = '';
  if (guests.length === 0) {
    emptyMessage.style.display = 'block';
    return;
  } else {
    emptyMessage.style.display = 'none';
  }
  guests.forEach((guest, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${guest.name}</span>
      <small style="margin-left:8px;color:#888;">${guest.addedAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
      <button class="toggle" aria-pressed="${guest.attending}">
        ${guest.attending ? 'Attending' : 'Not Attending'}
      </button>
      <button class="remove" aria-label="Remove ${guest.name}">Remove</button>
    `;
    li.querySelector('.remove').onclick = () => {
      guests.splice(index, 1);
      renderGuests();
    };
    li.querySelector('.toggle').onclick = () => {
      guest.attending = !guest.attending;
      renderGuests();
    };
    guestList.appendChild(li);
  });
}

// Initial render for empty state
renderGuests();