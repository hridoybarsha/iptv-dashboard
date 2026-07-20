function loadSettings(){

const settings = JSON.parse(localStorage.getItem("settings")) || {

adminUser:"admin",
adminPass:"123456",
portalUrl:"",
whatsapp:""

};

document.getElementById("adminUser").value = settings.adminUser;
document.getElementById("adminPass").value = settings.adminPass;
document.getElementById("portalUrl").value = settings.portalUrl;
document.getElementById("whatsapp").value = settings.whatsapp;

}

function saveSettings(){

const settings = {

adminUser:document.getElementById("adminUser").value.trim(),
adminPass:document.getElementById("adminPass").value.trim(),
portalUrl:document.getElementById("portalUrl").value.trim(),
whatsapp:document.getElementById("whatsapp").value.trim()

};

localStorage.setItem("settings",JSON.stringify(settings));

alert("Settings Saved Successfully");

}

window.onload = loadSettings;