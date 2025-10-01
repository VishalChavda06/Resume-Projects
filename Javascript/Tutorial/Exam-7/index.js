let users = [];

const userinfo = async () => {
    const req = await fetch("http://localhost:3000/Info");
    const res = await req.json();
    users = res;
    uiMaker(users);
};

const uiMaker = (usersToDisplay) => {
    const container = document.getElementById('infolist');
    container.innerHTML = '';

    usersToDisplay.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <h2>${user.name}</h2>
            <div class="info"><strong>Username:</strong> ${user.username}</div>
            <div class="info"><strong>Email:</strong> ${user.email}</div>
            <div class="info"><strong>Phone:</strong> ${user.phone}</div>
            <div class="info"><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></div>

            <div class="section-title">Address:</div>
            <div class="info"><strong>Street:</strong> ${user.address.street}</div>
            <div class="info"><strong>City:</strong> ${user.address.city}</div>
            <div class="info"><strong>Zipcode:</strong> ${user.address.zipcode}</div>

            <div class="section-title">Company:</div>
            <div class="info"><strong>Name:</strong> ${user.company.name}</div>
            <div class="info"><strong>Catch:</strong> ${user.company.catchPhrase}</div>
        `;

        container.appendChild(card);
    });
};

// searching....
const search = (value) => {
    let temp = users.filter((ele) =>
        ele.username.toLowerCase().includes(value.toLowerCase())
    );
    uiMaker(temp);
}

document.getElementById("search").addEventListener("input", () => {
    let value = document.getElementById("search").value;
    search(value);
});

// filter...
const FilterCategory = () => {
    const selectedCity = document.getElementById("cityFilter").value;

    if (selectedCity === "") {
        // if no city selected, show all users
        uiMaker(users);
    } else {
        let filteredUsers = users.filter(user => user.address.city === selectedCity);
        uiMaker(filteredUsers);
    }
};

document.getElementById("cityFilter").addEventListener("change", () => FilterCategory());

userinfo();
