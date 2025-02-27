// References to form fields to display/edit item details in the popup
let formtitle = document.getElementById('formtitle');
let formcategory = document.getElementById('formcategory');
let formdescription = document.getElementById('formdescription');
let formitempic = document.getElementById('formitempic');

let selectedEquipment;

// Sheety API endpoint
let url = 'https://api.sheety.co/8ec23e810fa3efa81389bcea9a3c14a5/checkoutInventory/sheet1';

fetch(url)
  .then((response) => response.json())
  .then((json) => {
    // We expect the data to be under 'json.sheet1'
    const sheetData = json.sheet1;

    if (sheetData) {
      let loader = document.getElementById('loader');
      loader.remove();
      
      const container = document.querySelector('.equipcheckoutcont');
      
      // Loop through the JSON data to build item cards
      for (let i = 0; i < sheetData.length; i++) {
        const card = sheetData[i];
        
        // Only display if category is "Other"
        if (card.category === "Other") {
          
          // Create main container for each item
          const box = document.createElement('div');
          box.classList.add('itemcheckout', 'slide-up');

          // Randomly assign one of three "blob" classes to vary the shape
          let num = Math.floor(Math.random() * 3) + 1;
          if (num === 1) {
            box.classList.add('blob1');
          } else if (num === 2) {
            box.classList.add('blob2');
          } else {
            box.classList.add('blob3');
          }

          // Container for the item image
          const itemimage = document.createElement('div');
          itemimage.classList.add('itemimage1');

          // Actual image element
          const image = document.createElement('img');
          image.classList.add('image1');
          image.src = card.image;
          itemimage.appendChild(image);
          box.appendChild(itemimage);

          // Create banner background
          const bannercont = document.createElement('div');
          bannercont.classList.add('itembanner1');

          // Title/container inside the banner
          const itemtitlediv = document.createElement('div');
          itemtitlediv.classList.add('itemtitle1');

          const itemtitle = document.createElement('h3');
          itemtitle.innerText = card.equipmentItem;

          const itemdetails = document.createElement('p');
          itemdetails.innerText = card.details;

          itemtitlediv.appendChild(itemtitle);
          itemtitlediv.appendChild(itemdetails);
          bannercont.appendChild(itemtitlediv);

          // Button container within the banner
          const itembutton = document.createElement('div');
          itembutton.classList.add('itembutton1');

          // 'Add to cart' or 'Checkout' button
          let addtocart = document.createElement('button');
          addtocart.id = card.number;
          addtocart.classList.add('addtocart1');
          // Attach the function to open the popup on click
          addtocart.addEventListener('click', function () {
            openPopup();
          });

          // Cart icon
          const carticon = document.createElement('i');
          carticon.classList.add('fa-solid', 'fa-cart-plus', 'addtocart1', 'hover', 'shake');

          // If item is already checked out, gray out the banner and remove hover
          if (card.checkedOut === true) {
            bannercont.classList.add('bgcolorgray');
            carticon.classList.remove('hover', 'shake');
            carticon.classList.add('nohover');
          }

          addtocart.appendChild(carticon);
          itembutton.appendChild(addtocart);
          bannercont.appendChild(itembutton);
          box.appendChild(bannercont);

          // Append the entire card (box) to the container
          container.appendChild(box);
        }

        // -----------------------------------------------------------
        // Function to open the popup for the clicked card
        // -----------------------------------------------------------
        function openPopup() {
          // Only open the popup if this item is not checked out
          if (card.checkedOut !== true) {
            const popupContent = document.getElementById('popup');
            popupContent.classList.remove('hide');

            // Fetch again to get the item details (could be optimized)
            fetch(url)
              .then((response) => response.json())
              .then((json) => {
                const sheetData = json.sheet1;

                // Create a temporary button ID to match the item number
                let addtocart = document.createElement('button');
                addtocart.id = card.number;
                console.log(card.number);

                // Find the clicked card's data
                const selectedCard = sheetData.find(item => item.number == addtocart.id);
                
                // Update the popup form with the data
                if (selectedCard) {
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
        }
      }
    } else {
      console.error('sheet1 property is undefined');
      alert('Ran out of free sheetly uses, wait a week and try again');
    }
  })
  .catch(error => console.error('Error:', error));

// -----------------------------------------------------------
// Close the popup
// -----------------------------------------------------------
function closePopup() {
  const popupContent = document.getElementById('popup');
  popupContent.classList.add('hide');
}

// -----------------------------------------------------------
// Dropdown references (if used for SD card or other items)
// -----------------------------------------------------------
const dropdownOptions = document.querySelectorAll('.dropdown-option');
const displaySelection = document.getElementById('display-selection');

// -----------------------------------------------------------
// validateCheckout: checks the form fields before updating 
// Sheety to mark items as checked out
// -----------------------------------------------------------
function validateCheckout() {
  // Get user inputs
  const email = document.getElementById("email").value.trim();
  const name = document.getElementById("name").value.trim();

  // Simple regex for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Basic input checks
  if (!email || !emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  // If valid, proceed
  alert("Checkout successful!");

  const url = 'https://api.sheety.co/8ec23e810fa3efa81389bcea9a3c14a5/checkoutInventory/sheet1';

  // Fetch to find the current item from the formtitle
  fetch(url)
    .then(response => response.json())
    .then(json => {
      const sheetData = json.sheet1;

      // Identify the 'Other' item being checked out
      const camerakit = sheetData.find(item => item.equipmentItem === formtitle.innerHTML);

      // Helper to update item state in Sheety
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

      // Update the item based on the 'Other' category item, if found
      updateItem(camerakit, name, email);
    })
    .catch(error => console.error('Error fetching data:', error));
}