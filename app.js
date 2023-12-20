

// Function to fetch all customers and display them
function showAllCustomers() {
  // Make a GET request to the Mock API
  fetch('https://my.api.mockaroo.com/customers.json?key=03c46990')
    .then(response => response.json())
    .then(customers => {
      // Display customers in the content container
      renderAllCustomers(customers);
    })
    .catch(error => {
      console.error('Error fetching customer data:', error);
    });
}

// Function to render all customers
function renderAllCustomers(customers) {
  console.log(customers);
  let contentContainer = document.querySelector('.container');
  contentContainer.innerHTML = '<h2>All Customers</h2>';

  // Loop through each customer and create a card
  customers.forEach(customer => {


    // Create a card element
    let card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    // Card body
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Customer name
    let name = document.createElement('h5');
    name.classList.add('card-title');
    name.textContent = `${customer.first_name} ${customer.last_name}`;
    cardBody.appendChild(name);

    let ssn = customer.ssn;
    let last4 = customer.ssn === null ? "not provided" : ssn.substring(ssn.length - 4)

    // Customer details
    let details = document.createElement('p');
    details.classList.add('card-text');
    details.innerHTML = `
          <strong>Customer Number:</strong> ${customer.customer_number}<br>
          <strong>Date of Birth:</strong> ${customer.date_birth}<br>
          <strong>Last 4 of SSN:</strong> ${last4}<br>
          <strong>Age:</strong> ${calculateAge(customer.date_birth)} years<br>
          <button class="btn btn-primary" data-bs-toggle="popover" data-bs-trigger="focus" title="Additional Information" data-bs-content="${getAdditionalInfo(customer)}">View Details</button>
        `;


    cardBody.appendChild(details);

    // Append card body to the card
    card.appendChild(cardBody);

    // Append the card to the content container
    contentContainer.appendChild(card);
  });

  // Enable Bootstrap popovers
  let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  console.log(popoverTriggerList);
  let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl, {
      container: 'body',
      html: true  // Set the html option to true
    });
  });
  console.log(popoverList);
}

// Function to get additional information for the popover
function getAdditionalInfo(customer) {
  // Your logic to retrieve additional information for the popover
  // ...

  console.log(customer.primary_address);

  let popoverHTML = `
    <strong>Email:</strong> ${customer.email}<br>
    <strong>Primary Address:</strong> ${customer.primary_address.address_line_1}, ${customer.primary_address.city}, ${customer.primary_address.state}, ${customer.primary_address.zip_code} <br>
    <strong>Mobile Phone:</strong> ${customer.mobile_phone_number}<br>
    <strong>Join Date:</strong> ${customer.join_date}<br>
    `;



  return popoverHTML;

}

// Function to calculate age based on Date of Birth
function calculateAge(dob) {
  // Parse the Date of Birth string to a Date object
  const birthDate = new Date(dob);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in years
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Adjust age based on the month and day of birth
  if (currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

// Function to show the form for creating a new customer
function showNewCustomerForm() {
  let contentContainer = document.querySelector('.container');
  contentContainer.innerHTML = `
      <h2>Create New Customer</h2>
      <form id="newCustomerForm" onsubmit="createCustomer(event)">
        <div class="mb-3">
          <label for="firstName" class="form-label">First Name:</label>
          <input type="text" class="form-control" id="firstName" name="firstName" required>
        </div>
  
        <div class="mb-3">
          <label for="lastName" class="form-label">Last Name:</label>
          <input type="text" class="form-control" id="lastName" name="lastName" required>
        </div>
  
        <div class="mb-3">
          <label for="dob" class="form-label">Date of Birth:</label>
          <input type="date" class="form-control" id="dob" name="dob" required>
        </div>
  
        <div class="mb-3">
          <label for="ssn" class="form-label">SSN:</label>
          <input type="text" class="form-control" id="ssn" name="ssn" required pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}" title="Enter SSN in the format 123-45-6789">
        </div>
  
        <div class="mb-3">
          <label for="email" class="form-label">Email address:</label>
          <input type="email" class="form-control" id="email" name="email" required>
        </div>

        <div class="mb-3">
        <label for="address_line_1" class="form-label">Primary Address:</label>
        <input type="text" class="form-control" id="address_line_1" name="addressLine1" required>
      </div>

      <div class="mb-3">
        <label for="city" class="form-label">City:</label>
        <input type="text" class="form-control" id="city" name="city" required>
      </div>

      <div class="mb-3">
      <label for="state" class="form-label">State:</label>
      <input type="text" class="form-control" id="state" name="state" pattern="[A-Za-z]{2}" title="Enter a valid two-letter state code (e.g., CA)" required>
      <div class="invalid-feedback">Please enter a valid two-letter state code (e.g., CA).</div>
    </div>

    <div class="mb-3">
      <label for="zip_code" class="form-label">Zip Code:</label>
      <input type="text" class="form-control" id="zip_code" name="zipCode" pattern="[0-9]{5}" title="Enter a valid 5-digit zip code" required>
      <div class="invalid-feedback">Please enter a valid 5-digit zip code.</div>
    </div>


  
        <div class="mb-3">
          <label for="mobilePhone" class="form-label">Mobile Phone number:</label>
          <input type="tel" class="form-control" id="mobilePhone" name="mobilePhone" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="Enter phone number in the format 123-456-7890">
        </div>
  
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    `;
}

// Initial load - show all customers
showAllCustomers();

// Function to create a new customer
function createCustomer(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form values
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const dob = document.getElementById('dob').value;
  const ssn = document.getElementById('ssn').value;
  const email = document.getElementById('email').value;
  const addressLine1 = document.getElementById('address_line_1').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const zipCode = document.getElementById('zip_code').value;
  const mobilePhone = document.getElementById('mobilePhone').value;

  // Create a new customer object
  const newCustomer = {
    "customer_number": generateRandomNumber(),
    "first_name": firstName,
    "last_name": lastName,
    "date_birth": dob,
    "ssn": ssn,
    "email": email,
    "primary_address": {
      "address_line_1": addressLine1,
      "city": city,
      "state": state,
      "zip_code": zipCode
    },
    "mobile_phone_number": mobilePhone,
    "join_date": getCurrentDate()
  };

  // You can do further processing (e.g., sending the data to the server, updating UI, etc.)
  console.log("New customer created:", newCustomer);

  // Post the new customer data to the API
  postCustomerData(newCustomer);

  let contentContainer = document.querySelector('.container');
  contentContainer.innerHTML = '<h2>New customer created successfully!</h2>';
  // Once the customer is created, navigate back to the "All Customers" view
  showAllCustomers();
}

// Function to generate a random 5-digit number
function generateRandomNumber() {
  return Math.floor(10000 + Math.random() * 90000);
}

// Function to get the current date in the format MM/DD/YYYY
function getCurrentDate() {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const year = now.getFullYear();
  return `${month}/${day}/${year}`;
}

// Function to post customer data to the API
function postCustomerData(newCustomer) {
  const apiUrl = 'https://my.api.mockaroo.com/customers.json?key=03c46990';

  // Use fetch to make a POST request
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCustomer),
  })
    .then(response => {
      if (response.ok) {
        // Handle successful response (status code 200-299)
        console.log('New customer created successfully:', newCustomer);
        showAllCustomers(); // Navigate back to the "All Customers" view
      } else {
        // Handle error response
        console.error('Error creating customer:', response.statusText);
        // You can add additional error handling or user feedback here
      }
    })
    .catch(error => {
      // Handle network error
      console.error('Network error:', error);
      // You can add additional error handling or user feedback here
    });
}