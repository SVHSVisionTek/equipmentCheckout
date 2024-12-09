let formtitle = document.getElementById('formtitle');
let formcategory = document.getElementById('formcategory');
let formdescription = document.getElementById('formdescription');
let formitempic = document.getElementById('formitempic');


let selectedEquipment;










let url = 'https://api.sheety.co/8ec23e810fa3efa81389bcea9a3c14a5/checkoutInventory/sheet1';
fetch(url)
.then((response) => response.json())
.then(json => {
    // Access the correct property based on the JSON structure
    const sheetData = json.sheet1; // Adjust this line after inspecting the JSON structure
    
    if (sheetData) {
        const container = document.querySelector('.equipcheckoutcont');
        // Loop through the JSON data and write HTML elements
        for (let i = 0; i < sheetData.length; i++) {
            const card = sheetData[i];
            if (card.category === "Camera")
            {

                // html in javascript starts
                // create div
            const box = document.createElement('div'); 
            // create classes for div
            box.classList.add('itemcheckout', 'bgcolorwhite');

            // itemimage div
                const itemimage = document.createElement('div');
                itemimage.classList.add('itemimage1');

                //  item image creation
                    const image = document.createElement('img');
                    image.classList.add('image1');
                    image.src = card.image;
                    // puts the image inside the itemimage
                    itemimage.appendChild(image);

                    // puts the itemimage inside the box
                box.appendChild(itemimage);

                // create item banner div
                const bannercont = document.createElement('div');
                bannercont.classList.add('itembanner1');

                if (card.checkedOut === true)
            {
                bannercont.classList.add('bgcolorgray');
            }


                // adding item title div
                    const itemtitlediv = document.createElement('div');
                    itemtitlediv.classList.add('itemtitle1');

                        // creating responsive titles
                        const itemtitle = document.createElement('h3');
                        itemtitle.innerText = card.equipmentItem;

                        const itemdetails = document.createElement('p');
                        itemdetails.innerText = card.details;

                    // puts item title inside the itemtitlediv
                    itemtitlediv.appendChild(itemtitle);
                    // puts the item details inside the item details
                    itemtitlediv.appendChild(itemdetails);
                    // puts the itemtitlediv inside the banner cont
                    bannercont.appendChild(itemtitlediv);

                    // creating the button div
                    const itembutton = document.createElement('div');
                    itembutton.classList.add('itembutton1');

                    // creating the checkout link
                    let addtocart = document.createElement('button');
                    addtocart.id = card.number;
                    console.log(card.number)
                    addtocart.classList.add('addtocart1');
                    addtocart.addEventListener('click', function(){openPopup()}); // Attach the function as a click event listener
                

                            const carticon = document.createElement('i');
                            carticon.classList.add('fa-solid', 'fa-cart-plus', 'addtocart1');


                            // adding the carticon into addtocart
                            addtocart.appendChild(carticon);
                        // putting addtocart inside the itembutton
                        itembutton.appendChild(addtocart);
                        // putting the itembutton inside the bannercont
                    bannercont.appendChild(itembutton);
                    // putting the bannercont inside the box (main container)
                box.appendChild(bannercont);
                // puts the entire javascript inside the container, in this case it would be equipmentcheckoutcont
            container.appendChild(box);
            }
            // Create HTML elements for the content

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

                function openPopup() {
                if (card.checkedOut !== true)
                {
                    const popupContent = document.getElementById('popup');
                        popupContent.classList.remove('hide');
                
                let url = 'https://api.sheety.co/8ec23e810fa3efa81389bcea9a3c14a5/checkoutInventory/sheet1';
                        fetch(url)
                        .then((response) => response.json())
                        .then(json => {
                            const sheetData = json.sheet1; // Access the data array


                            // Loop through the data to find "Camera Kit 1"

                            let addtocart = document.createElement('button');
                            addtocart.id = card.number;
                            console.log(card.number)

                            const selectedCard = sheetData.find(item => item.number == addtocart.id);
        
                            if (selectedCard) {
                                // Update the form with the selected card's details
                                document.getElementById('formtitle').textContent = selectedCard.equipmentItem;
                                document.getElementById('formcategory').textContent = selectedCard.category;
                                document.getElementById('formdescription').textContent = selectedCard.moreDetails;
                                document.getElementById('formitempic').src = selectedCard.image;
                            } else {
                                console.error('Card data not found!');
                            }

                        })
                        .catch(error => console.error('Error:', error)); // Handle any errors
                    } 
                // Get selected SD card value and store it in a hidden input field
                const dropdownOptions = document.querySelectorAll('.dropdown-option');
                const displaySelection = document.getElementById('display-selection');
                const selectedSDCardInput = document.getElementById('selectedSDCard');
                
                // ;mpadnsoibuyvagcAUISq0   -erduocfghidueojpk0rt-ihdgufytckvuihojp0iu9y8ftdrxdhzfsdhxtryfugiho8[u9-y8t76ri5eystehrjdyfkugiho8pu9i0uy87tfu6drsewDSZestdrf67y8oup9iu8oy7t6d54jsteharwhestjdyfliy7;o8u'i9876tfdryestawrbetdyfi7;o8u'i9u8y7t6fdresjhwestdrf7y8u90-8y7t6rsewgrehtd678y9u-i]09uy8t76rstezGSZehtdyfg890ui-=u9y8t76drsezSGErd67t8yu9709t8r6e5jstehartsdy789y07-89t76r5ysteharhstj6t78y970-70tr65eysrthasrd5y6rt789y708-079t6
                    dropdownOptions.forEach(option => {
                        option.addEventListener('click', () => {
                            const selectedValue = option.getAttribute('data-value');
                            displaySelection.textContent = `You selected: ${selectedValue}`;
                            selectedSDCardInput.value = selectedValue; // Store the selected value in the hidden inputw
                            
                        });
                    });
            }
                

            

        }
    } else {
        console.error('sheet1 property is undefined');
        alert('Ran out of free sheetly uses. Please see Mr. Vogel.')
    }
})
.catch(error => console.error('Error:', error)); // Optional: Add error handling

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

function closePopup() {
    const popupContent = document.getElementById('popup');
        popupContent.classList.add('hide');
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const dropdownOptions = document.querySelectorAll('.dropdown-option');
const displaySelection = document.getElementById('display-selection');
const selectedSDCardInput = document.getElementById('selectedSDCard');

        fetch(url)
        .then((response) => response.json())
        .then(json => {
            const sheetData = json.sheet1; // Access the data array

            // Loop through the data to find "Camera Kit 1"
            for (let i = 0; i < sheetData.length; i++) {
                const card = sheetData[i]; // Access each item
                
                if (card.category === "SD Card") { // Check if it's "Camera Kit 1"
                    let dropdownholder = document.getElementById('dropdownholder')
                    let dropdowndiv = document.createElement('div')

                    dropdowndiv.classList.add('dropdown-option')
                    dropdowndiv.setAttribute('data-value', card.equipmentItem)

                    dropdownholder.appendChild(dropdowndiv)

                    let dropdowndivtxt = document.createElement('p')
                    dropdowndivtxt.innerHTML = card.equipmentItem;

                    dropdowndiv.appendChild(dropdowndivtxt);

                    if (card.checkedOut === true)
                    {
                        dropdowndiv.classList.add('nohover1', 'bgcolorgray')
                        dropdowndiv.removeAttribute('data-value', card.equipmentItem)
                    }

                }
            }
        })
        .catch(error => console.error('Error:', error)); // Handle any errors







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

    // Proceed with the checkout process if all validations pass
    alert("Checkout successful!");

    const url = 'https://api.sheety.co/8ec23e810fa3efa81389bcea9a3c14a5/checkoutInventory/sheet1';

    // Fetch inventory data to find the selected SD card and Camera Kit 1
    fetch(url)
        .then(response => response.json())
        .then(json => {
            const sheetData = json.sheet1;
    
            // Find the selected SD card and Camera Kit 1

            const selectedCardEntry = sheetData.find(item => item.equipmentItem === selectedSDCard);
            const camerakit = sheetData.find(item => item.equipmentItem === formtitle.innerHTML);

    
            // Function to update item status
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
    
            // Update selected SD card and Camera Kit 1 if found
            updateItem(selectedCardEntry, name, email);
            updateItem(camerakit, name, email);
        })
        .catch(error => console.error('Error fetching data:', error));
    
}
