
// 1) Set Live Time on Each Page Header

    // DOMContentLoaded means once the HTML page is loadede then execute this method of displaying time
    document.addEventListener('DOMContentLoaded', function() { 
        let time = document.getElementById("Time");

        setInterval(() => {
            let d = new Date();
            time.textContent = d.toLocaleString();
         }, 1000);
    });



// 2) Browse Available Pets page:

        class Pet {
            constructor(img, name, type, breed, age, gender, goodWithDogs, goodWithCats, familyFriendly, owner, email, ownerComments) {
                this.img = img;
                this.name = name;
                this.type = type;
                this.breed = breed;
                this.age = age;
                this.gender = gender;
                this.goodWithDogs = goodWithDogs;
                this.goodWithCats = goodWithCats;
                this.familyFriendly = familyFriendly;
                this.owner = owner;
                this.email = email;
                this.ownerComments = ownerComments;
            }

        }

        // declaring Pets adn storing it in an array of objects Pets

        const Sweets = new Pet("Pet1.png", "Sweets", "Cat", "Maine Coon Mix", "2 years", "Male", "Yes", "Yes", "Yes", "John Krasinski", "JohnKrasinski@gmail.com", "I hate this dog of all my will, imagine waking up seeing this licking your face. I lost my wife and kids thanks to this creature.");

        const Doggo = new Pet("Pet2.png", "Snoop-Doggo", "Dog", "Black Retriever", "3 years", "Female", "Yes", "Yes", "Yes", "Snoop Dog", "Snoop@gmail.com", "Doggo is the best companion ever. She brings so much joy and happiness ");
        
        const Rahath = new Pet("Pet3.png", "Rahath", "Dog", "Borzoi", "2 years", "Female", "No", "No", "No", "Alvi Matin", "KP@gmail.com", "Rahath is a dog, chasing his tail although he'll never reach it. He enjoys licking other people.");

        const BoogeyMan = new Pet("Pet4.png", "BoogeyMan", "Dog", "Chihuahua", "5 years", "Male", "Yes", "Yes", "Yes", "Jack Smith", "jack@gmail.com", "BoogeyMan may look scary, but he's actually a very friendly dog.");


        let Pets = [Sweets, Doggo, Rahath, BoogeyMan];

        /** Adds the info regarding from each pet into into the browse available pages
         *  TODO make sure the function is working
         * 
         * @param {*} Pet The specific instance of pet
         */
        function AddPetInfo(Pet) {

            document.getElementById("PetImg").src = Pet.img 
            document.getElementById("PetName").innerHTML = Pet.name;
            document.getElementById("PetType").innerHTML = "<strong>Type:</strong> " + Pet.type;
            document.getElementById("PetBreed").innerHTML = "<strong>Breed:</strong> " + Pet.breed;
            document.getElementById("PetAge").innerHTML = "<strong>Age:</strong> " + Pet.age;
            document.getElementById("PetGender").innerHTML = "<strong>Gender:</strong> " + Pet.gender;
            document.getElementById("PetWDogs").innerHTML = "<strong>Good with dogs:</strong> " + Pet.goodWithDogs;
            document.getElementById("PetWCats").innerHTML = "<strong>Good with cats:</strong> " + Pet.goodWithCats;
            document.getElementById("PetFF").innerHTML = "<strong>Family-friendly:</strong> " + Pet.familyFriendly;
            document.getElementById("PetOwnerComments").innerHTML = "<em>" +  Pet.ownerComments  + "</em> " 
            document.getElementById("PetOwnerName").innerHTML = "<strong>Owner:</strong> " + Pet.owner;
            document.getElementById("PetOwnerEmail").innerHTML = "<strong>Email:</strong> " + Pet.email;
            

        }


        AddPetInfo(Pets[0]);



// 3) Find a dog/cat page:

    // To Check if the Find a Dog/Cat form is either Empty or Not
    function checkForm() {
        // Get the form element
        const form = document.querySelector('.pForm');
        
        // Check if all radio groups have a selected value
        const radioGroups = ["Pets", "Gender", "Breed"]; // Add the name attributes of your radio button groups
        for (let name of radioGroups) {
            const radioGroup = form.querySelectorAll(`input[name="${name}"]:checked`);
            if (radioGroup.length === 0) {
                alert('Error - Form is not Completed');
                return false; // Prevents Submission
            }
        }

        // Check if required checkboxes are checked
        const checkboxes = form.querySelectorAll('input[type="checkbox"][required]:not(:checked)');
        if (checkboxes.length > 0) {
            alert('Error - Form is not Completed');
            return false; // Prevents Submission
        }

        // All the checks have passed emaning the form is filled out appropriately
        alert('Completed');
        return true;
    }



    // 4) Have a pet to give away page

    function ValidateGiveawayForm() {
        // Access the form element correctly
        const form = document.querySelector('.pForm'); 
    
        var petType = document.getElementsByName("Pets");
        var petAge = form.querySelector('select[name="age"]');
        var gender = document.getElementsByName("Gender");
        var breed = document.getElementsByName("Breed");
        var ownerName = document.getElementById("OwnerName").value;
        var ownerEmail = document.getElementById("OwnerEmail").value;
        var petInfo = document.getElementById("PetInfo").value; 

        // Function to check if any radio group is selected
        function isRadioSelected(radioGroup) {
            return Array.from(radioGroup).some(radio => radio.checked);
        }
    
        // Function to check if the email is valid
        function validateEmail(email) {
            var emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/; // Email Validater
            return emailPattern.test(email);
        }
    

        // Validation checks


        // Check for pet type
        if (!isRadioSelected(petType)) {
            alert('Error - Pet type is not selected');
            return false;
        }
        
        // Check for Proper Age INput
        if (!petAge.value) {
            alert('Error - Pet age is not selected');
            return false;
        }
    
        // Check for Gender InpUt
        if (!isRadioSelected(gender)) {
            alert('Error - Pet gender is not selected');
            return false;
        }
        
        // Check for Breed
        if (!isRadioSelected(breed)) {
            alert('Error - Pet breed is not selected');
            return false;
        }

        // Check if the pet information textarea is not empty
        if (petInfo.trim() === "") {
            alert('Error - Additional information about your pet is required');
            return false;
        }
    
        if (ownerName === "") {
            alert('Error - Owner name is not entered');
            return false;
        }
    
        if (!validateEmail(ownerEmail)) {
            alert('Error - Invalid email format');
            return false;
        }
    
        // If all validations pass
        return true;
    }


    
    
    
