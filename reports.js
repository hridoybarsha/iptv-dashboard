let users = JSON.parse(localStorage.getItem("users")) || [];
let payments = JSON.parse(localStorage.getItem("payments")) || [];

function loadReports(){

let totalRevenue = 0;
let active = 0;
let expired = 0;

const today = new Date().toISOString().split("T")[0];

users.forEach(u=>{

if(u.expiry >= today){
active++;
}else{
expired++;
}

});

let table = document.getElementById("reportTable");

table.innerHTML = "";

payments.forEach((p,index)=>{

totalRevenue += Number(p.amount);

table.innerHTML += `
<tr>
<td>${index+1}</td>
<td>${p.user}</td>
<td>₹${p.amount}</td>
<td>${p.method}</td>
<td>${p.date}</td>
</tr>
`;

});

document.getElementById("totalRevenue").innerHTML = "₹"+totalRevenue;
document.getElementById("totalPayments").innerHTML = payments.length;
document.getElementById("activeUsers").innerHTML = active;
document.getElementById("expiredUsers").innerHTML = expired;

}

window.onload = loadReports;