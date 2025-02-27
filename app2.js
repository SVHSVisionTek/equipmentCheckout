// Get references to form fields for updating the popup with item data
let formtitle = document.getElementById('formtitle');
let formcategory = document.getElementById('formcategory');
let formdescription = document.getElementById('formdescription');
let formitempic = document.getElementById('formitempic');

let selectedEquipment;

// Main URL for Sheety API
let url = 'https://api.sheety.co/8ec23e810fa3efa81389bcea9a3c14a5/checkoutInventory/sheet1';

fetch(url)
  .then((response) => response.json())
  .then((json) => {
    // The JSON structure has a property called 'sheet1' for the data array
    const sheetData = json.sheet1; 

    if (sheetData) {
      let loader = document.getElementById('loader');
      loader.remove();

      const container = document.querySelector('.equipcheckoutcont');

      // Loop through the JSON data
      for (let i = 0; i < sheetData.length; i++) {
        const card = sheetData[i];

        // We only display cards with category "Camera Equipment"
        if (card.category === "Camera Equipment") {
          // Create the outer box for each item
          const box = document.createElement('div'); 
          box.classList.add('itemcheckout', 'slide-up');

          /* 
             Randomly assign one of three "blob" classes to create 
             varied shapes for each item card.
          */
          let num = Math.floor(Math.random() * 3) + 1;
          if (num === 1) {
            box.classList.add('blob1');
          } else if (num === 2) {
            box.classList.add('blob2');
          } else {
            box.classList.add('blob3');
          }

          // Container for the item’s image
          const itemimage = document.createElement('div');
          itemimage.classList.add('itemimage1');

          // Actual item <img>
          const image = document.createElement('img');
          image.classList.add('image1');
          image.src = card.image;
          itemimage.appendChild(image);
          box.appendChild(itemimage);

          // The banner (colored background) portion
          const bannercont = document.createElement('div');
          bannercont.classList.add('itembanner1');

          // Adding item title div
          const itemtitlediv = document.createElement('div');
          itemtitlediv.classList.add('itemtitle1');

          const itemtitle = document.createElement('h3');
          itemtitle.innerText = card.equipmentItem;

          const itemdetails = document.createElement('p');
          itemdetails.innerText = card.details;

          itemtitlediv.appendChild(itemtitle);
          itemtitlediv.appendChild(itemdetails);
          bannercont.appendChild(itemtitlediv);

          // Create a button div for the cart icon
          const itembutton = document.createElement('div');
          itembutton.classList.add('itembutton1');

          // The checkout button
          let addtocart = document.createElement('button');
          addtocart.id = card.number;
          addtocart.classList.add('addtocart1', 'shake');
          // Attach the popup-opening function as a click event listener
          addtocart.addEventListener('click', function () {
            openPopup();
          });

          // The cart icon
          const carticon = document.createElement('i');
          carticon.classList.add('fa-solid', 'fa-cart-plus', 'addtocart1', 'hover', 'shake');

          // If item is already checked out, gray banner & remove hover effect
          if (card.checkedOut === true) {
            bannercont.classList.add('bgcolorgray');
            carticon.classList.remove('hover', 'shake');
            carticon.classList.add('nohover');
          }

          addtocart.appendChild(carticon);
          itembutton.appendChild(addtocart);
          bannercont.appendChild(itembutton);
          box.appendChild(bannercont);

          // Finally, append the box to the main container
          container.appendChild(box);
        }

        // Function to open the popup for the clicked item
        function openPopup() {
          // Only open popup if item is NOT already checked out
          if (card.checkedOut !== true) {
            const popupContent = document.getElementById('popup');
            popupContent.classList.remove('hide');

            fetch(url)
              .then((response) => response.json())
              .then((json) => {
                const sheetData = json.sheet1;

                // Create a temporary button to identify which item was clicked
                let addtocart = document.createElement('button');
                addtocart.id = card.number;
                console.log(card.number);

                // Find the card data that matches the clicked item
                const selectedCard = sheetData.find(item => item.number == addtocart.id);

                if (selectedCard) {
                  // Update form in the popup with the selected card's details
                  document.getElementById('formtitle').textContent = selectedCard.equipmentItem;
                  document.getElementById('formcategory').textContent = selectedCard.category;
                  document.getElementById('formdescription').textContent = selectedCard.moreDetails;
                  document.getElementById('formitempic').src = selectedCard.image;
                } else {
                  console.error('Card data not found!');
                }
              })
              .catch(error => console.error('Error:', error));
          }

          // Prepare to handle the SD card dropdown selection inside the popup
          const dropdownOptions = document.querySelectorAll('.dropdown-option');
          const displaySelection = document.getElementById('display-selection');
          const selectedSDCardInput = document.getElementById('selectedSDCard');

          /* 
             When user clicks on any .dropdown-option, we store its data-value 
             in a hidden input for later usage in the checkout.
          */
          dropdownOptions.forEach(option => {
            option.addEventListener('click', () => {
              const selectedValue = option.getAttribute('data-value');
              displaySelection.textContent = `You selected: ${selectedValue}`;
              selectedSDCardInput.value = selectedValue;
            });
          });
        }
      }
    } else {
      console.error('sheet1 property is undefined');
      alert('Ran out of free sheetly uses. Please see Mr. Vogel.');
    }
  })
  .catch(error => console.error('Error:', error));

/* 
   Close the popup (called from a "Close" button or icon)
*/
function closePopup() {
  const popupContent = document.getElementById('popup');
  popupContent.classList.add('hide');
}

// Preparing the SD Card dropdown items
const dropdownOptions = document.querySelectorAll('.dropdown-option');
const displaySelection = document.getElementById('display-selection');
const selectedSDCardInput = document.getElementById('selectedSDCard');

/* 
   Another fetch to get SD Card items 
   and append them as .dropdown-option elements in #dropdownholder
*/
fetch(url)
  .then((response) => response.json())
  .then((json) => {
    const sheetData = json.sheet1;

    for (let i = 0; i < sheetData.length; i++) {
      const card = sheetData[i];

      if (card.category === "SD Card") {
        let dropdownholder = document.getElementById('dropdownholder');
        let dropdowndiv = document.createElement('div');

        dropdowndiv.classList.add('dropdown-option');
        dropdowndiv.setAttribute('data-value', card.equipmentItem);

        dropdownholder.appendChild(dropdowndiv);

        let dropdowndivtxt = document.createElement('p');
        dropdowndivtxt.innerHTML = card.equipmentItem;
        dropdowndiv.appendChild(dropdowndivtxt);

        // If SD card is already checked out, gray out and make unclickable
        if (card.checkedOut === true) {
          dropdowndiv.classList.add('nohover1', 'bgcolorgray');
          dropdowndiv.removeAttribute('data-value', card.equipmentItem);
        }
      }
    }
  })
  .catch(error => console.error('Error:', error));

/* 
   validateCheckout() 
   1. Validates user's email, name, and selected SD card.
   2. PUT updates to Sheety API if all is valid.
*/
function validateCheckout() {
  // Get user inputs
  const email = document.getElementById("email").value.trim();
  const name = document.getElementById("name").value.trim();
  const selectedSDCard = selectedSDCardInput.value;

  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate inputs
  if (!email || !emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  if (!selectedSDCard) {
    alert("Please select an SD card.");
    return;
  }

  // If validations pass, proceed
  alert("Checkout successful!");

  const url = 'https://api.sheety.co/8ec23e810fa3efa81389bcea9a3c14a5/checkoutInventory/sheet1';

  // Fetch to find both the selected SD card & the camera kit item
  fetch(url)
    .then(response => response.json())
    .then(json => {
      const sheetData = json.sheet1;

      // Identify selected SD card and the camera kit from the current popup
      const selectedCardEntry = sheetData.find(item => item.equipmentItem === selectedSDCard);
      const camerakit = sheetData.find(item => item.equipmentItem === formtitle.innerHTML);

      // Reusable function to update an item’s status
      const updateItem = (item, checkedOutName, checkedOutEmail) => {
        if (!item) {
          console.error('Item not found');
          return;
        }

        const updateUrl = `https://api.sheety.co/8ec23e810fa3efa81389bcea9a3c14a5/checkoutInventory/sheet1/${item.id}`;

        fetch(updateUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sheet1: {
              checkedOut: true,
              checkedOutName,
              checkedOutEmail,
              equipmentItem: item.equipmentItem
            }
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to update item ${item.equipmentItem}. HTTP status: ${response.status}`);
            }
            return response.json();
          })
          .then(updatedData => {
            console.log(`${item.equipmentItem} updated successfully:`, updatedData);
          })
          .catch(error => console.error(`Error updating ${item.equipmentItem}:`, error));
      };

      // Update both the SD card and the camera kit
      updateItem(selectedCardEntry, name, email);
      updateItem(camerakit, name, email);
    })
    .catch(error => console.error('Error fetching data:', error));
}

/* 
   Intersection Observer for scrolling animations:
   We observe each '.itemcheckout' to add a 'show' class when it intersects,
   removing it if it scrolls out of view (optional logic).
*/
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const scrollanimation = document.querySelectorAll('.itemcheckout');
scrollanimation.forEach((el) => observer.observe(el));
