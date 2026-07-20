// Login
function login() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (user === "admin" && pass === "123456") {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Username or Password");
    }
}