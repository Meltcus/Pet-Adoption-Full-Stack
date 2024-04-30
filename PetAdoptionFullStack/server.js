const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');




const app = express();


// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true}))

app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
    secret: 'your_secret_key', // Replace with a real secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true } // Set to true if you're using https
}));


// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
    res.render('layout', {
        pageTitle: 'Home',
        content: 'Home',
        session: req.session // For log in and log out
    });
});


// Define routes
app.get('/DogCare', (req, res) => {
    res.render('layout', {
        pageTitle: 'Dog Care',
        content: 'DogCare',
        session: req.session
    });
});

// Define routes
app.get('/CatCare', (req, res) => {
    res.render('layout', {
        pageTitle: 'Cat Care',
        content: 'CatCare',
        session: req.session
    });
});

// Define routes
app.get('/FindDogCat', (req, res) => {
    res.render('layout', {
        pageTitle: 'Find Dog Cat',
        content: 'FindDogCat',
        session: req.session
    });
});


// Define routes
app.get('/CreateAccount', (req, res) => {
    res.render('layout', {
        pageTitle: 'Create an Account',
        content: 'CreateAccount',
        session: req.session
    });
});


// Define routes
app.get('/Pets', (req, res) => {
    res.render('layout', {
        pageTitle: 'Browse Available Pets',
        content: 'Pets',
        session: req.session
    });
});

// Giveway Page
app.get('/Giveaway', (req, res) => {
    // Check if the user is authenticated
    if (req.session.isAuthenticated) {
        res.render('layout', {
            pageTitle: 'Giveaway Pets',
            content: 'Giveaway',
            session: req.session
        });
    } else {
        // If the user is not authenticated, redirect to login page
        res.redirect('/login-page');
    }
});

// Define routes
app.get('/Contact', (req, res) => {
    res.render('layout', {
        pageTitle: 'Contact Us',
        content: 'Contact',
        session: req.session
    });
});


// Define routes
app.get('/privacy_policy', (req, res) => {
    res.render('layout', {
        pageTitle: 'Privacy Policy',
        content: 'privacy_policy',
        session: req.session
    });
});


// Define routes
app.get('/DisplayPets', (req, res) => {
    res.render('layout', {
        pageTitle: 'Display Pets',
        content: 'DisplayPets',
        session: req.session
    });
});




// Require fs module to interact with the file system
const fs = require('fs');

// Account Create

app.post('/createAccount', (req, res) => {
    const { username, password } = req.body;

    // Define the path to the login file
    const loginFilePath = path.join(__dirname, 'loginFile.txt');

    // Read the existing users from the login file
    fs.readFile(loginFilePath, 'utf8', (err, data) => {
        if (err) {
            // Handle error (e.g., file not found)
            return res.status(500).send('An error occurred on the server.');
        }

        // Check if the username already exists
        const users = data.trim().split('\n');
        const usernameExists = users.some(user => user.split(':')[0] === username.toLowerCase());

        if (usernameExists) {
            // Send a message back to the client
            return res.send('Username already exists, please choose a different one.');
        }

        // Append the new user to the login file
        fs.appendFile(loginFilePath, `${username.toLowerCase()}:${password}\n`, (err) => {
            if (err) {
                // Handle error
                return res.status(500).send('An error occurred on the server.');
            }

            // Confirm account creation
            return res.send('Account successfully created.');
        });
    });
});



// Log In and Log out


// Define routes
app.get('/login-page', (req, res) => {
    res.render('layout', {
        pageTitle: 'Login In Page',
        content: 'login-page',
        session: req.session
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const loginFilePath = path.join(__dirname, 'loginFile.txt');

    // Read the login file
    fs.readFile(loginFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('An error occurred while reading the login file.');
        }

        // Split data into lines and check if the username and password match
        const users = data.trim().split('\n');
        const userRecord = users.find(record => {
            const [fileUsername, filePassword] = record.split(':');
            return fileUsername === username.toLowerCase() && filePassword === password;
        });

        if (userRecord) {
            // Set isAuthenticated to true in the session
            req.session.isAuthenticated = true;
            req.session.username = username.toLowerCase();
            // Redirect to the home page or respond with a success message
            return res.redirect('/');
        } else {
            // If the credentials don't match, respond with an error message
            return res.send('Invalid username or password.');
        }
    });
});


// Ending log in session 
// Log out route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send('Error logging out');
        } else {
            res.redirect('/');
        }
    });
});



// Forms
// Define routes for Giving a Pet away form
// Define routes
app.post('/submit', (req, res) => {
    if (!req.session.isAuthenticated) {
        return res.status(401).send('You must be logged in to submit pet information.');
    }

    const petInfoFilePath = path.join(__dirname, 'petInfoFile.txt');

    fs.readFile(petInfoFilePath, 'utf8', (err, data) => {
        if (err) {
            // Handle error (e.g., file not found, in that case, you might want to create the file)
            return res.status(500).send('An error occurred on the server.');
        }

        // Process the file content to determine the next ID
        const entries = data.trim().split('\n');
        const lastEntry = entries[entries.length - 1];
        const lastId = lastEntry ? parseInt(lastEntry.split(':')[0]) : 0;
        const nextId = lastId + 1;

        // Gather the pet information from the request body
        const pet = req.body.Pets;
        const age = req.body.age;
        const gender = req.body.Gender;
        const breed = req.body.Breed;
        const dog = req.body.Dogs ? 'Yes' : 'No';  // If checkbox is checked, the value will be present in req.body
        const cat = req.body.Cats ? 'Yes' : 'No';
        const kids = req.body.Kids ? 'Yes' : 'No';
        const petInfo = req.body.PetInfo;
        const ownerName = req.body.OName;
        const email = req.body.Email;
        const user = req.session.username; // Get the logged-in username from the session

        // Create a new entry line
        const newEntry = `${nextId}:${user}:${pet}:${breed}:${age}:${gender}:${dog}:${cat}:${kids}:${petInfo}:${ownerName}:${email}\n`;

        // Append the new entry to the file
        fs.appendFile(petInfoFilePath, newEntry, 'utf8', (err) => {
            if (err) {
                return res.status(500).send('An error occurred while saving pet information.');
            }
            res.send('Animal has been added to the list');
        });
    });
});





// Define Routes for Finding a Pet (Dog/Cat) form
app.post('/submitFindDogCat', (req, res) => {
    const petInfoFilePath = path.join(__dirname, 'petInfoFile.txt');

    // Read the pet information file
    fs.readFile(petInfoFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('An error occurred while reading the pet information file.');
        }

        // Split the file into lines representing individual pets
        const pets = data.trim().split('\n');
        const filteredPets = pets.filter(pet => {
            const details = pet.split(':');
            // details array is expected to follow this format:
            // [id, username, type, breed, age, gender, goodWithDogs, goodWithCats, goodWithKids, petInfo, ownerName, email]
            const [id, username, type, breed, age, gender, goodWithDogs, goodWithCats, goodWithKids] = details;

            return (req.body.Pets === 'Any' || req.body.Pets === type) &&
                   (req.body.age === 'Any' || req.body.age === age) &&
                   (req.body.Gender === gender) &&
                   (req.body.Breed === breed || req.body.Breed === 'Any') &&
                   (req.body.dogF === 'Yes' ? goodWithDogs === 'Yes' : true) &&
                   (req.body.catF === 'Yes' ? goodWithCats === 'Yes' : true) &&
                   (req.body.kidF === 'Yes' ? goodWithKids === 'Yes' : true);
        });

        // Format the filtered pets for display
        const formattedPets = filteredPets.map(pet => pet.replace(/:/g, ', ')).join('<br>');
        res.render('views/DisplayPets.ejs', { pets: filteredPets });
    });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});