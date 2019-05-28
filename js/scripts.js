$(document).ready(function() {
  // Fetch function
  const fetchUsers = url => {
    const $gallery = $('#gallery');
    const $loading = $(`<h1>Retrieving employees, please wait..<h1>`);
    $gallery.append($loading);

    fetch(url)
      .then(res => res.json())
      .then(data => generateCards(data.results))
      .catch(err => {
        console.log('Something went wrong when fetching: ', err);
      })
      .finally(() => $loading.remove());
  };

  const generateCards = data => {
    const $gallery = $('#gallery');
    const $body = $('body');

    let html = '';

    // Mapping over API results to create card elements.
    data.map(data => {
      html += `
      <div class="card">
        <div class="card-img-container">
          <img src="${
            data.picture.large
          }" class="card-img" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${data.name.first} ${
        data.name.last
      }</h3>
          <p class="card-text">${data.email}</p>
          <p class="card-text cap">${data.location.city}, ${
        data.location.state
      }</p>
        </div>
      </div>
      `;
    });
    $gallery.append(html);

    // Opening modals when clicking on a profile.
    openModal(data);
  };

  // Click handler for opening modals.
  const openModal = data => {
    $('.card').click(function() {
      generateModal(data, $(this).index());
    });
  };

  // Click handler for closing modals.
  const closeModal = () => {
    const $closeModal = $('#modal-close-btn');
    $closeModal.click(function() {
      $('.modal-container').remove();
    });
  };

  const generateModal = (data, index) => {
    const $body = $('body');
    const birthdayDate = new Date(data[index].dob.date).toLocaleDateString();

    // Creating HTML element by taking information from API result at index of the card that's clicked.
    let html = `
      <div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${
                data[index].picture.large
              }" alt="profile picture">
              <h3 id="name" class="modal-name cap">${data[index].name.first} ${
      data[index].name.last
    }</h3>
              <p class="modal-text">${data[index].email}</p>
              <p class="modal-text cap">${data[index].location.city}, ${
      data[index].location.state
    }</p>
              <hr>
              <p class="modal-text">${data[index].phone}</p>
              <p class="modal-text cap">${data[index].location.street}, ${
      data[index].location.state
    } ${data[index].location.postcode}</p>
              <p class="modal-text">Birthday: ${birthdayDate}</p>
          </div>
      </div>
    `;
    $body.append(html);

    // Calling close modal function that closes modal by clicking the X button
    closeModal();
  };

  // Fetches users and initializes rest of application.
  fetchUsers('https://randomuser.me/api/?results=12&nat=us');
});
