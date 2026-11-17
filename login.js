// Get form elements
const loginForm =
    document.getElementById("loginForm");
const username =
    document.getElementById("username");
const password =
    document.getElementById("password");
const errorMessage =
    document.getElementById("errorMessage");
// Login event

loginForm.addEventListener(
    "submit",
    function(event) {
        // Prevent page refresh
        event.preventDefault();
        // Get entered values
        const enteredUsername =
            username.value.trim();
        const enteredPassword =
            password.value;
        // Dummy login details
        const correctUsername =
            "admin";
        const correctPassword =
            "12345";
        // Check login

        if (
            enteredUsername === correctUsername &&
            enteredPassword === correctPassword
        ) {
            // Save login status
            localStorage.setItem(
                "isLoggedIn",
                "true"
            );
            // Save username
            localStorage.setItem(
                "username",
                enteredUsername
            );
            // Go to typing test
            window.location.href =
                "typing_test.html";
        }

        else {
            errorMessage.textContent =
                "Invalid username or password.";
        }
    }
);