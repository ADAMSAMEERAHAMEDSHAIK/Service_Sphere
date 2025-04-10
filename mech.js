
var x = document.getElementById("inputForm");
var y = document.getElementById("removeForm");
var z = document.getElementById("btn");

function iForm() {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
  console.log("Add");
}

function rForm() {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0";
 
}

// const data = [
//     {

//     },
//     {

//     }
// ]

var cities = JSON.parse(localStorage.getItem('cities')) || [];
var container = document.getElementsByClassName('container')[0];



// Rental Di Submission
function handleSubmit(event) {
    event.preventDefault();

    var cityName = prompt("Enter the city name to store location :");
    var cityData = cities.find(item => item.city.toLowerCase() === cityName.trim().toLowerCase());

    if (!cityData) {
        cityData = {
            city: cityName,
            rentals: []
        };
        cities.push(cityData);
    }

    var ownerName = document.getElementById("ownerName").value;
    var rentPerMonth = parseInt(document.getElementById("rentPerMonth").value);
    var email = document.getElementById("email").value;
    var location = document.getElementById("location").value;
    var image = document.getElementById("image").files[0]; 

    

    
    var reader = new FileReader();
    reader.onload = function(e) {
        var base64Image = e.target.result;

       //Rental Object Creation
        var rentalObject = {
            ownerName: ownerName,
            rentPerMonth: rentPerMonth,
            email: email,
            location: location,
            image: base64Image
        };

       
        cityData.rentals.push(rentalObject);

        //Update Ls
        // try
        // {

        
        localStorage.setItem('cities', JSON.stringify(cities));

        // }
        // catch(e)
        // {
            
        //     clearLocalStorage();

        // }

        document.getElementById("inputForm").reset();
        console.log("Resetting The Form");
        container.innerHTML = '';
        window.location.reload();
        display(cityData.rentals);
    };
    reader.readAsDataURL(image);
}

function displayMechSection()
{
    var getmech=document.getElementById("section3");
    getmech.style.display="block";
}


function displayUserRentals() {

    var getcon=document.getElementsByClassName("container")[0];
    getcon.style.display = "flex";

    container.innerHTML = '';
    if (cities.length > 0) {
        cities.forEach(city => display(city.rentals));
    } else {
        console.log("No rentals found in local storage.");
    }
}


//Sub
document.getElementById("inputForm").addEventListener("submit", handleSubmit);

// Remove
function handleRemove(event) {
    event.preventDefault();

    var cityName = document.getElementById("cityRemove").value.trim().toLowerCase();
    var ownerEmail = document.getElementById("emailRemove").value.trim().toLowerCase();

    var cityData = cities.find(city => city.city.toLowerCase() === cityName);

    if (!cityData) {
        console.log("City not found");
        return;
    }

    var index = cityData.rentals.findIndex(rental => rental.email.toLowerCase() === ownerEmail);

    if (index !== -1) {
        cityData.rentals.splice(index, 1);

        // Update the cities array in local storage
        localStorage.setItem('cities', JSON.stringify(cities));
        console.log(cities);
        console.log(cityName);

        container.innerHTML = '';
        display(cityData.rentals);
        window.location.reload();
        
    } else {
        console.log("Rental object with the specified owner's email not found in the city.");
    }
    document.getElementById("removeForm").reset();
}

// Event listener for form submission
document.getElementById("removeForm").addEventListener("submit", handleRemove);


function display(rentals) {
    rentals.forEach(function (obj) {
        

        var card = document.createElement("div");
        card.style.backgroundColor = "black";
        card.style = "border-radius:20px";
        card.style.color = "white";
        
        
        card.style = "box-shadow: 0px 0px 20px aqua";
        card.style.height = "250px";
        card.style.width = "300px";
     
       
        card.style.border = "2px solid aqua";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.alignItems = "center";
        card.style.padding = "10px";
        card.style.margin = "10px";
        
       
        
    
        var image = document.createElement("img");
        image.style = "border-radius:25px";
        image.style.width = "100%";
        image.style.height = "150px";
        image.style.objectFit = "cover";
         image.style.width = "50%";
        image.style.height = "150px";
       image.src = obj.image; 
      image.style.objectFit = "cover";
      image.style.margin = "20px";
         image.style.border = "2px solid teal";
                card.appendChild(image);

        var ownerNameParagraph = document.createElement("p");
        ownerNameParagraph.textContent = "Owner's Name: " + obj.ownerName;
        ownerNameParagraph.style.color = "white";
        card.appendChild(ownerNameParagraph);
    
        var rentPerMonthParagraph = document.createElement("p");
        rentPerMonthParagraph.textContent = "Charge Per Month: $" + obj.rentPerMonth;
        rentPerMonthParagraph.style.color = "white";
        card.appendChild(ownerNameParagraph);
    
        var emailParagraph = document.createElement("p");
        emailParagraph.textContent = "Email: " + obj.email;
        emailParagraph.style.color = "white";
        card.appendChild(emailParagraph);
    
        var locationParagraph = document.createElement("p");
        locationParagraph.textContent = "Location: " + obj.location;
        locationParagraph.style.color = "white";
        card.appendChild(locationParagraph);
    
        
    
        container.appendChild(card);
    });

   
}






function logout() {
    localStorage.removeItem('cities');
    cities = [];
    container.innerHTML = '';
    console.log("Logged out and cleared local storage.");
}

// Function to search for city and display rentals
function searchCity() {
    var searchValue = document.getElementById("city").value.trim().toLowerCase();
    var cityData = cities.find(city => city.city.toLowerCase() === searchValue);

    container.innerHTML = '';

    if (cityData) {
        display(cityData.rentals);
    } else {
        console.log("City not found");
    }
}





// Load rentals from local storage on page load
window.onload = function() {
    if (cities.length > 0) {
        cities.forEach(city => display(city.rentals));
    }
}

function clearLocalStorage(){
    localStorage.clear();
}






  
