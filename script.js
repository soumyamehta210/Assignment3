const date = document.getElementById("date");
const day = document.getElementById("day");
const my = document.getElementById("my");
const places = document.getElementById("places");
const container2 = document.getElementById("container2");

// fetching the city names through API
async function fetching() {
  let url = await fetch(
    "https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/india-popular-city.json"
  );
  let data = await url.json();
  let pdivi = document.createElement("div");
  pdivi.setAttribute("id", "mydropdown2");
  data.city.forEach((item) => {
    let cdivi = document.createElement("div");
    cdivi.setAttribute("class", "placename");
    cdivi.innerText = item.name;
    pdivi.appendChild(cdivi);
  });
  places.appendChild(pdivi);
  pdivi.classList.add("dropdowncontent");
  pdivi.classList.add("warner");
}

fetching();

const d = new Date();
date.innerHTML = d.getDate();

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day.innerHTML = days[d.getDay()];

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
my.innerHTML = `${month[d.getMonth()]}, ${d.getFullYear()}`;

function myfunc1() {
  const mydropdown = document.getElementById("mydropdown");
  mydropdown.classList.toggle("show");
}

function myfunc() {
  let mydropdown2 = document.getElementById("mydropdown2");
  mydropdown2.classList.toggle("show");
}

// fetching the cards part through API
async function fetching1() {
  let url1 = await fetch(
    "https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/make-your-trip-package.json"
  );
  let data1 = await url1.json();
  // console.log(data1);
  data1.forEach((item) => {
    // console.log(item.cityName);
    let div = document.createElement("div");
    div.classList.add("card");
    let p1 = document.createElement("p");
    p1.setAttribute("id", "cityname");
    p1.innerText = item.cityName;
    div.appendChild(p1);
    let p2 = document.createElement("p");
    p2.setAttribute("id", "tourdate");
    p2.innerText = item.tourDate;
    div.appendChild(p2);
    let p3 = document.createElement("p");
    p3.setAttribute("id", "category");
    p3.innerText = item.category;
    div.appendChild(p3);
    let p4 = document.createElement("p");
    p4.setAttribute("id", "avgtemp");
    p4.innerText = "Average Temperature";
    div.appendChild(p4);
    let p5 = document.createElement("p");
    p5.setAttribute("id", "intemp");
    p5.innerHTML = `+${item.temp}&#176;C`;
    div.appendChild(p5);
    let img = document.createElement("img");
    img.setAttribute("src", item.cityImg);
    div.appendChild(img);
    let p6 = document.createElement("p");
    p6.setAttribute("id", "price");
    p6.innerText = "Total Price:";
    div.appendChild(p6);
    let div1 = document.createElement("div");
    div1.setAttribute("id", "flexs");
    let p7 = document.createElement("p");
    p7.setAttribute("id", "inprice");
    p7.innerText = item.price;
    div1.appendChild(p7);
    let btn = document.createElement("button");
    btn.setAttribute("id", "explore");
    btn.innerText = "Explore";
    div1.appendChild(btn);
    div.appendChild(div1);

    container2.appendChild(div);
  });
}

fetching1();

window.onclick = function (e) {
  if (e.target.classList == "placename") {
    // console.log(e.target.innerText);
    fetching2(e.target.innerText);
    // console.log(e.target.parentElement.classList.contains("show"));
    if (e.target.parentElement.classList.contains("show") == true) {
      e.target.parentElement.classList.remove("show");
    }
  }
  if (!e.target.matches(".dropbtn")) {
    let dr = document.getElementsByClassName("dropdowncontent");
    let dr1 = document.getElementsByClassName("dropdowncontent1");
    for (let i = 0; i < dr.length; i++) {
      if (dr[i].classList.contains("show")) {
        dr[i].classList.remove("show");
      }
    }
    for (let i = 0; i < dr1.length; i++) {
      if (dr1[i].classList.contains("show")) {
        dr1[i].classList.remove("show");
      }
    }
  }
};

async function fetching2(cityname) {
  // console.log(cityname);
  let url2 = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityname}.json?access_token=pk.eyJ1Ijoic2h1YmhhbWhpcmFuaTQ1IiwiYSI6ImNreTN3OHBiaTA2OXoyd3E5YjJ2b2xicWkifQ.hQfD_1Mmlpta37azNXVyvQ`
  );
  let data2 = await url2.json();
  // console.log(data2);

  let longitude = data2.features[0].center[0];
  let latitude = data2.features[0].center[1];
  // console.log(longitude + " " + latitude);

  let url3 = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&units=metric&appid=d57f8c3baf6bb12c1c6f23e9e1315929`
  );
  let data3 = await url3.json();
  // console.log(data3.current.weather[0].main);
  // console.log(data3.current.temp);

  document.getElementById("temp").innerHTML = `${data3.current.temp}&#176;`;
  document.getElementById("city").innerText = cityname;

  const tempstatus = data3.current.weather[0].main;
  const condition = document.getElementById("status");

  if (tempstatus == "Sunny") {
    condition.innerHTML =
      "<i class='fas fa-sun fa-2x' style='color: #eccc68'></i>";
  } else if (tempstatus == "Clouds") {
    condition.innerHTML =
      "<i class='fas fa-cloud fa-2x' style='color: #dfe4ea'></i>";
  } else if (tempstatus == "Rain") {
    condition.innerHTML =
      "<i class='fas fa-rain fa-2x' style='color:#a4b0be'></i>";
  } else {
    condition.innerHTML =
      "<i class='fas fa-sun fa-2x' style='color:#eccc68'></i>";
  }
}

// fetching2();
