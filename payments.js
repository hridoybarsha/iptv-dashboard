let payments = JSON.parse(localStorage.getItem("payments")) || [];

function addPayment(){

let user = document.getElementById("payUser").value.trim();
let amount = document.getElementById("amount").value;
let method = document.getElementById("method").value;

if(user=="" || amount==""){

alert("সব তথ্য পূরণ করুন");
return;

}

payments.push({

id:Date.now(),

user:user,

amount:amount,

method:method,

date:new Date().toLocaleDateString()

});

localStorage.setItem("payments",JSON.stringify(payments));

document.getElementById("payUser").value="";
document.getElementById("amount").value="";
document.getElementById("method").selectedIndex=0;

loadPayments();

}

function loadPayments(){

let table=document.getElementById("paymentTable");

table.innerHTML="";

payments.forEach((p,index)=>{

table.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${p.user}</td>

<td>₹${p.amount}</td>

<td>${p.method}</td>

<td>${p.date}</td>

<td>

<button class="action delete"
onclick="deletePayment(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function deletePayment(index){

if(confirm("Delete Payment?")){

payments.splice(index,1);

localStorage.setItem("payments",JSON.stringify(payments));

loadPayments();

}

}

window.onload=loadPayments;