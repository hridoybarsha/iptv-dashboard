// SUPER IPTV Users Manager

let users = JSON.parse(localStorage.getItem("users")) || [];

function saveUser(){

let phone=document.getElementById("phone").value.trim();
let username=document.getElementById("username").value.trim();
let password=document.getElementById("password").value.trim();
let portal=document.getElementById("portal").value.trim();
let plan=document.getElementById("plan").value;

if(phone==""||username==""||password==""){
alert("সব তথ্য পূরণ করুন");
return;
}

let expiry=getExpiry(plan);

users.push({
id:Date.now(),
phone:phone,
username:username,
password:password,
portal:portal,
plan:plan,
expiry:expiry,
status:"Active"
});

localStorage.setItem("users",JSON.stringify(users));

clearForm();

loadUsers();

updateCards();

}

function getExpiry(plan){

let d=new Date();

if(plan=="1 Month") d.setMonth(d.getMonth()+1);

if(plan=="3 Months") d.setMonth(d.getMonth()+3);

if(plan=="6 Months") d.setMonth(d.getMonth()+6);

if(plan=="12 Months") d.setFullYear(d.getFullYear()+1);

return d.toISOString().split("T")[0];

}

function clearForm(){

phone.value="";
username.value="";
password.value="";
portal.value="";
plan.selectedIndex=0;

}

function loadUsers(){

let table=document.getElementById("userTable");

table.innerHTML="";

users.forEach((u,index)=>{

table.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${u.phone}</td>

<td>${u.username}</td>

<td>${u.plan}</td>

<td>${u.status}</td>

<td>

<button class="action whatsapp"
onclick="window.open('https://wa.me/${u.phone}')">

WhatsApp

</button>

<button class="action call"
onclick="window.location='tel:${u.phone}'">

Call

</button>

<button class="action edit"
onclick="editUser(${index})">

Edit

</button>

<button class="action delete"
onclick="deleteUser(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function deleteUser(index){

if(confirm("Delete User?")){

users.splice(index,1);

localStorage.setItem("users",JSON.stringify(users));

loadUsers();

updateCards();

}

}

function editUser(index){

let u=users[index];

phone.value=u.phone;
username.value=u.username;
password.value=u.password;
portal.value=u.portal;
plan.value=u.plan;

users.splice(index,1);

localStorage.setItem("users",JSON.stringify(users));

loadUsers();

updateCards();

}

function updateCards(){

document.getElementById("totalUsers").innerText=users.length;

}

window.onload=function(){

loadUsers();

updateCards();

}