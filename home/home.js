//Slider for (ul.tags.items, ul.listOfPopulore.items, ul.listOfPopulore.items, ul.listOfRecommeded.items)Sections
let isDown = false,
  startX,
  scrollLeft;
const slider = Array.from(document.querySelectorAll('.items'));

const end = (e) => {
  isDown = false;
  e.currentTarget.classList.remove('active');
}

const start = (e) => {
  isDown = true;
  e.currentTarget.classList.add('active');
  startX = e.pageX || e.touches[0].pageX - e.currentTarget.offsetLeft;
  scrollLeft = e.currentTarget.scrollLeft;
}

const move = (e) => {
  if (!isDown) return;

  e.preventDefault();
  const x = e.pageX || e.touches[0].pageX - e.currentTarget.offsetLeft;
  const dist = (x - startX);
  e.currentTarget.scrollLeft = scrollLeft - dist;
}

(() => {
  slider.forEach(element => {
    element.addEventListener('mousedown', start);
    element.addEventListener('touchstart', start);

    element.addEventListener('mousemove', move);
    element.addEventListener('touchmove', move);

    element.addEventListener('mouseleave', end);
    element.addEventListener('mouseup', end);
    element.addEventListener('touchend', end);
  });
})();

//get element by id form html tags by getElementById and declared the apis
const listOfPopulore = document.getElementById('listOfPopulore'),
  tags = document.getElementById('tags'),
  listOfOffers = document.getElementById('listOfOffers'),
  listOfRecommeded = document.getElementById('listOfRecommeded'),
  apiCate = `https://fakestoreapi.com/products/categories`,
  baseApi = "https://fakestoreapi.com/products?limit=10";

//fetch api for categories
(async function getData() {
  try {
    const response = await fetch(apiCate)
    const data = await response.json()
    createCate(data)

  } catch (e) {
    console.log("error", e.message)
  }
})()

//create dom for categories
function createCate(data) {
  data.forEach(el => {
    const eleOfTag = document.createElement('li');
    eleOfTag.setAttribute('class', 'item')
    eleOfTag.innerText = `${el}`
    tags.appendChild(eleOfTag)
  })
}

//fetch api for listOfPopulore
(async function getData() {
  try {
    const response = await fetch(baseApi),
      data = await response.json();

    createPro(data);

  } catch (e) {
    console.log("error", e.message)
  }
})()

//create dom for listOfPopulore
function createPro(data) {
  data.forEach(product => {

    let objTitle = product.title,
      readyTitle = objTitle.split(' ').slice(0, 3).join(' '),
      objPrice = product.price,
      objImage = product.image,
      objid = product.id;

    const el = document.createElement('li'),
      proImg = document.createElement('img'),
      textAndImg = document.createElement('div'),
      titleAndPrice = document.createElement('div'),
      cartImg = document.createElement('img'),
      proTitle = document.createElement('h3'),
      proPrice = document.createElement('span');

    listOfPopulore.appendChild(el)
    el.appendChild(proImg)
    el.appendChild(textAndImg)
    textAndImg.appendChild(titleAndPrice)
    textAndImg.appendChild(cartImg)
    titleAndPrice.appendChild(proTitle)
    titleAndPrice.appendChild(proPrice)

    el.setAttribute("class", "item")
    el.setAttribute("dataset", `${objid}`)
    proImg.setAttribute("class", "imgOfPopulore")
    proImg.setAttribute('src', `${objImage}`)
    textAndImg.setAttribute('class', 'wrapOfText')
    proTitle.setAttribute('class', 'title')
    proPrice.setAttribute('class', 'price')
    cartImg.setAttribute('src', '../assets/img/cart with plus.svg')
    cartImg.addEventListener('click', addToCart)

    proTitle.innerText = `${readyTitle}`
    proPrice.innerText = `$${objPrice}`

  });
}