"use strict";

//Get the container we need to push HTML into
const container = document.querySelector(".section-center");
const filterBtns = document.querySelectorAll(".filter-btn");

let fetched = [];
//Fetch the data on click
const getDataAll = () => {
  fetch(
    `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeshadow`
  )
    .then((response) => response.json())
    .then((data) => {
      //Clean previous HTML
      container.innerHTML = "";
      //Render as many cards as objects
      data.map((ele) => renderCard(ele));
      //Save the data in a variable
      fetched.push(...data);
    });
};

//Load items
window.addEventListener("DOMContentLoaded", getDataAll());

const renderCard = (data) => {
  const html = `  <article class="menu-item">
      <img src="${data.image_link}" alt="Photo not available" class="photo" />
      <div class="item-info">
        <header>
          <h4>${data.name}</h4>
          <h4 class="price">${data.price}€</h4>
        </header>
        <p class="item-text">${data.description}</p>
      </div>
    </article>`;

  container.insertAdjacentHTML("afterbegin", html);
};

//Filter items
filterBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    //Clean previous HTML
    container.innerHTML = "";
    const brand = e.currentTarget.dataset.id;
    //Filter
    const menuBrand = fetched.filter((item) => {
      if (item.brand === brand) {
        return item;
      }
    });
    if (brand === "all") {
      fetched.map((ele) => renderCard(ele));
    } else {
      menuBrand.map((ele) => renderCard(ele));
    }
  })
);
