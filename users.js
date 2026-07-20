// SUPER IPTV - Users Manager (Fixed Version)

let users = JSON.parse(localStorage.getItem("users")) || [];

function saveUser() {

    const phone = document.getElementById("phone").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const portal = document.getElementById("portal").value.trim();
    const plan = document.getElementById("plan").value;

    if (!phone || !username || !password) {
        alert("Please fill all required fields.");
        return;
    }

    const expiry = getExpiry(plan);

    users.push({
        id: Date.now(),
        phone: phone,
        username: username,
        password: password,
        portal: portal,
        plan: plan,
        expiry: expiry,
        status: "Active"
    });

    localStorage.setItem("users", JSON.stringify(users));

    clearForm();
    loadUsers();
    updateCards();

    alert("User Added Successfully");
}

function getExpiry(plan) {

    const d = new Date();

    switch(plan){
        case "1 Month":
            d.setMonth(d.getMonth()+1);
            break;

        case "3 Months":
            d.setMonth(d.getMonth()+3);
            break;

        case "6 Months":
            d.setMonth(d.getMonth()+6);
            break;

        case "12 Months":
            d.setFullYear(d.getFullYear()+1);
            break;
    }

    return d.toISOString().split("T")[0];
}

function clearForm(){

    document.getElementById("phone").value="";
    document.getElementById("username").value="";
    document.getElementById("password").value="";
    document.getElementById("portal").value="";
    document.getElementById("plan").selectedIndex=0;

}

function loadUsers(){

    users = JSON.parse(localStorage.getItem("users")) || [];

    const today = new Date().toISOString().split("T")[0];

    let table = document.getElementById("userTable");

    table.innerHTML="";

    users.forEach((u,index)=>{

        let status = (u.expiry >= today) ? "Active" : "Expired";

        table.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${u.phone}</td>
            <td>${u.username}</td>
            <td>${u.plan}</td>
            <td>${status}</td>
            <td>${u.expiry}</td>
            <td>

            <button class="action whatsapp"
            onclick="window.open('https://wa.me/${u.phone}','_blank')">
            WhatsApp
            </button>

            <button class="action call"
            onclick="window.location.href='tel:${u.phone}'">
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

    if(confirm("Delete this user?")){

        users.splice(index,1);

        localStorage.setItem("users",JSON.stringify(users));

        loadUsers();
        updateCards();

    }

}

function editUser(index){

    const u = users[index];

    document.getElementById("phone").value = u.phone;
    document.getElementById("username").value = u.username;
    document.getElementById("password").value = u.password;
    document.getElementById("portal").value = u.portal;
    document.getElementById("plan").value = u.plan;

    users.splice(index,1);

    localStorage.setItem("users",JSON.stringify(users));

    loadUsers();
    updateCards();

}

function updateCards(){

    const today = new Date().toISOString().split("T")[0];

    let active = 0;
    let expired = 0;
    let revenue = 0;

    users.forEach(u=>{

        if(u.expiry >= today){
            active++;
        }else{
            expired++;
        }

        switch(u.plan){

            case "1 Month":
                revenue += 200;
                break;

            case "3 Months":
                revenue += 550;
                break;

            case "6 Months":
                revenue += 1000;
                break;

            case "12 Months":
                revenue += 1800;
                break;
        }

    });

    document.getElementById("totalUsers").innerText = users.length;

    if(document.getElementById("activeUsers"))
        document.getElementById("activeUsers").innerText = active;

    if(document.getElementById("expiredUsers"))
        document.getElementById("expiredUsers").innerText = expired;

    if(document.getElementById("revenue"))
        document.getElementById("revenue").innerText = "₹"+revenue;

}

const search = document.getElementById("search");

if(search){

search.addEventListener("keyup",function(){

    const value = this.value.toLowerCase();

    const rows = document.querySelectorAll("#userTable tr");

    rows.forEach(row=>{

        row.style.display =
        row.innerText.toLowerCase().includes(value)
        ? ""
        : "none";

    });

});

}

window.onload=function(){

    loadUsers();
    updateCards();

};