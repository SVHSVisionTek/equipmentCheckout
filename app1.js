// References to popup form fields
let formtitle = document.getElementById('formtitle');
let formcategory = document.getElementById('formcategory');
let formdescription = document.getElementById('formdescription');
let formitempic = document.getElementById('formitempic');

let selectedEquipment;

// Sheety API endpoint
let url = 'https://api.sheety.co/8ec23e810fa3efa81389bcea9a3c14a5/checkoutInventory/sheet1';

// Fetch initial data from Sheety
fetch(url)
  .then((response) => response.json())
  .then((json) => {
    const sheetData = json.sheet1; // Adjust this based on the actual JSON structure, if needed

    if (sheetData) {
      // Remove the loader element once data is retrieved
      let loader = document.getElementById('loader');
      loader.remove();

      const container = document.querySelector('.equipcheckoutcont');

      // Loop through the data and create item cards for those with category "Camera"
      for (let i = 0; i < sheetData.length; i++) {
        const card = sheetData[i];

        if (card.category === "Camera") {
          // Create a container for each item
          const box = document.createElement('div');
          box.classList.add('itemcheckout', 'slide-up');

          // Randomly assign a 'blob' class for different shapes
          let num = Math.floor(Math.random() * 3) + 1;
          if (num === 1) {
            box.classList.add('blob1');
          } else if (num === 2) {
            box.classList.add('blob2');
          } else {
            box.classList.add('blob3');
          }

          // Create a div for the item image
          const itemimage = document.createElement('div');
          itemimage.classList.add('itemimage1');

          // The actual img element for the item
          const image = document.createElement('img');
          image.classList.add('image1');
          image.src = card.image;
          itemimage.appendChild(image);
          box.appendChild(itemimage);

          // Create the banner portion
          const bannercont = document.createElement('div');
          bannercont.classList.add('itembanner1');

          // Title and details within the banner
          const itemtitlediv = document.createElement('div');
          itemtitlediv.classList.add('itemtitle1');

          const itemtitle = document.createElement('h3');
          itemtitle.innerText = card.equipmentItem;

          const itemdetails = document.createElement('p');
          itemdetails.innerText = card.details;

          itemtitlediv.appendChild(itemtitle);
          itemtitlediv.appendChild(itemdetails);
          bannercont.appendChild(itemtitlediv);

          // Container for the checkout button
          const itembutton = document.createElement('div');
          itembutton.classList.add('itembutton1');

          // The button itself
          let addtocart = document.createElement('button');
          addtocart.id = card.number;
          addtocart.classList.add('addtocart1', 'shake');
          addtocart.addEventListener('click', function () {
            openPopup();
          });

          // The cart icon
          const carticon = document.createElement('i');
          carticon.classList.add('fa-solid', 'fa-cart-plus', 'addtocart1', 'hover', 'shake');

          // If the item is already checked out, disable hover effects and gray out
          if (card.checkedOut === true) {
            bannercont.classList.add('bgcolorgray');
            carticon.classList.remove('hover', 'shake');
            carticon.classList.add('nohover');
          }

          addtocart.appendChild(carticon);
          itembutton.appendChild(addtocart);
          bannercont.appendChild(itembutton);

          // Append the banner to the box
          box.appendChild(bannercont);

          // Finally, add the entire item box to the main container
          container.appendChild(box);
        }

        // ---------------------------------------------------------
        // Function to open the popup for the clicked item
        // ---------------------------------------------------------
        function openPopup() {
          // Only open if the item is not checked out
          if (card.checkedOut !== true) {
            const popupContent = document.getElementById('popup');
            popupContent.classList.remove('hide');

            // Fetch again to ensure we have the latest data (could be optimized)
            fetch(url)
              .then((response) => response.json())
              .then((json) => {
                const sheetData = json.sheet1;

                // Use a dummy button ID to locate the correct card
                let addtocart = document.createElement('button');
                addtocart.id = card.number;
                console.log(card.number);

                const selectedCard = sheetData.find(item => item.number == addtocart.id);

                if (selectedCard) {
                  // Update the form/popup with the selected card's info
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

          // Handle SD Card dropdown selection inside the popup
          const dropdownOptions = document.querySelectorAll('.dropdown-option');
          const displaySelection = document.getElementById('display-selection');
          const selectedSDCardInput = document.getElementById('selectedSDCard');

          dropdownOptions.forEach(option => {
            option.addEventListener('click', () => {
              const selectedValue = option.getAttribute('data-value');
              displaySelection.textContent = `You selected: ${selectedValue}`;
              selectedSDCardInput.value = selectedValue; // Store the selected SD card in a hidden input
            });
          });
        }
      }
    } else {
      console.error('sheet1 property is undefined');
      alert('Ran out of free sheetly uses. Please see Mr. Vogel.');
    }
  })
  .catch(error => console.error('Error:', error)); // Catch any fetch errors

// ---------------------------------------------------------
// Close the popup
// ---------------------------------------------------------
function closePopup() {
  const popupContent = document.getElementById('popup');
  popupContent.classList.add('hide');
}

// ---------------------------------------------------------
// Set up the dropdown for SD cards (if any)
// ---------------------------------------------------------
const dropdownOptions = document.querySelectorAll('.dropdown-option');
const displaySelection = document.getElementById('display-selection');
const selectedSDCardInput = document.getElementById('selectedSDCard');

// Fetch the data again to populate SD card dropdown options
fetch(url)
  .then((response) => response.json())
  .then((json) => {
    const sheetData = json.sheet1; // Access the data array

    // Find items whose category is "SD Card" and add to dropdown
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

        // If already checked out, disable selection
        if (card.checkedOut === true) {
          dropdowndiv.classList.add('nohover1', 'bgcolorgray');
          dropdowndiv.removeAttribute('data-value', card.equipmentItem);
        }
      }
    }
  })
  .catch(error => console.error('Error:', error)); // Handle any errors

// ---------------------------------------------------------
// validateCheckout - validation & update Sheety data
// ---------------------------------------------------------
function validateCheckout() {
  // Grab user inputs from the popup form
  const email = document.getElementById("email").value.trim();
  const name = document.getElementById("name").value.trim();
  const selectedSDCard = selectedSDCardInput.value;

  // Simple regex for validating email format
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

  // If validations pass
  alert("Checkout successful!");

  const url = 'https://api.sheety.co/8ec23e810fa3efa81389bcea9a3c14a5/checkoutInventory/sheet1';

  // Fetch the full data again to update the selected camera kit & SD card
  fetch(url)
    .then(response => response.json())
    .then(json => {
      const sheetData = json.sheet1;

      // Identify the selected SD card and the camera kit from the popup formtitle
      const selectedCardEntry = sheetData.find(item => item.equipmentItem === selectedSDCard);
      const camerakit = sheetData.find(item => item.equipmentItem === formtitle.innerHTML);

      // Function to update an item's "checkedOut" status
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

      // Update both the SD card and the camera kit (if they exist)
      updateItem(selectedCardEntry, name, email);
      updateItem(camerakit, name, email);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// ---------------------------------------------------------
// Intersection Observer to reveal items on scroll
// ---------------------------------------------------------
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
