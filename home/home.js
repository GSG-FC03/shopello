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

//set unknown object into loacl storage
let unknown = {
  Name: "",
  Email: "",
  Password: "",
  Currency: "",
  Product: [],
};

if (localStorage.getItem("unknown") == null) {
  localStorage.setItem("unknown", JSON.stringify(unknown));
}

//get unknown object into loacl storage
unknown = localStorage.getItem("unknown") === null ? [] : JSON.parse(localStorage.getItem("unknown"));

//fetch currencies and exchange prices 
let Currency,
  rate = 1,
  symbol = '$',
  timer;
if (unknown.Currency == '') {
  Currency = 'USD'
  timer = 0
} else {
  timer = 200
  Currency = unknown.Currency
  symbol = Currency
  let from = "USD",
    to = Currency;

  (async function getData() {
    try {
      const response = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?to=${to}&from=${from}&q=1.0`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "6155594c89msh387173eac4635c0p108063jsnee1a9a20e441",
          "x-rapidapi-host": "currency-exchange.p.rapidapi.com"
        }
      })
      const data = await response.json()
      rate = data;
    } catch (e) {
      console.log("error", e.message)
    }
  })()
}

//get element by id form html tags by getElementById and declared the apis
const listOfPopulore = document.getElementById('listOfPopulore'),
  tags = document.getElementById('tags'),
  listOfOffers = document.getElementById('listOfOffers'),
  listOfRecommeded = document.getElementById('listOfRecommeded'),
  main = document.getElementById('main'),
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
    eleOfTag.addEventListener('click', getProductByCate)
    tags.appendChild(eleOfTag)
  })
}

//fetch api for listOfPopulore, listOfOffers, listOfRecommeded
let dataForSearch;
setTimeout(() => {
  (async function getData() {
    try {
      const response = await fetch(baseApi),
        data = await response.json();
      dataForSearch = data;
      createPro(data);
      createOffer(data.reverse());
      createRecomeded(data.reverse())

    } catch (e) {
      console.log("error", e.message)
    }
  })()
}, timer)

//create dom for listOfPopulore
function createPro(data) {
  data.forEach(product => {

    let objTitle = product.title,
      readyTitle = objTitle.split(' ').slice(0, 3).join(' '),
      exPrice = product.price * rate,
      objPrice = exPrice.toFixed(2),
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
    proImg.setAttribute("class", "imgOfPopulore")
    proImg.setAttribute('src', `${objImage}`)
    textAndImg.setAttribute('class', 'wrapOfText')
    proTitle.setAttribute('class', 'title')
    proTitle.setAttribute('onclick', `getDataDetails(${objid},displayDetails)`)
    proPrice.setAttribute('class', 'price')
    cartImg.setAttribute('src', '../assets/img/cart with plus.svg')
    cartImg.setAttribute('onclick', `getDataDetails(${objid}, addToCart)`)

    proTitle.innerText = `${readyTitle}`
    proPrice.innerText = `${symbol} ${objPrice}`

  });
}

//create dom for listOfOffers
function createOffer(data) {
  data.forEach(product => {

    let objImage = product.image,
      objCate = product.category,
      objid = product.id;

    const elemOfOffer = document.createElement('li'),
      offerCate = document.createElement('img'),
      offSpan = document.createElement('span'),
      wrapOfOffer = document.createElement('div'),
      wrapOfDesc = document.createElement('div'),
      offImg = document.createElement('img'),
      saveUp = document.createElement('p'),
      disc = document.createElement('p'),
      off = document.createElement('p');

    elemOfOffer.appendChild(offerCate)
    elemOfOffer.appendChild(offSpan)
    elemOfOffer.appendChild(wrapOfOffer)
    wrapOfOffer.appendChild(wrapOfDesc)
    wrapOfOffer.appendChild(offImg)
    wrapOfDesc.appendChild(saveUp)
    wrapOfDesc.appendChild(disc)
    wrapOfDesc.appendChild(off)
    listOfOffers.appendChild(elemOfOffer)

    elemOfOffer.setAttribute("class", "item")
    offerCate.setAttribute('src', `../assets/img/${objCate}.svg`)
    offerCate.setAttribute("class", "imgOfTag")
    offSpan.setAttribute('class', 'nameOfTag')
    wrapOfOffer.setAttribute('class', 'wrapOfOffer')
    wrapOfDesc.setAttribute('class', 'wrapOfDesc')
    offImg.setAttribute('src', `${objImage}`)
    offImg.setAttribute('onclick', `getDataDetails(${objid}, displayDetails)`)
    disc.setAttribute('class', 'disc')

    offSpan.innerText = `${objCate}`
    saveUp.innerText = "Save up"
    disc.innerText = `${Math.floor(Math.random() * 50)}%`
    off.innerText = "Off!"

  });
}

//create dom for listOfRecommeded
function createRecomeded(data) {
  data.forEach(product => {

    let objTitle = product.title,
      readyTitle = objTitle.split(' ').slice(0, 2).join(' '),
      exPrice = product.price * rate,
      objPrice = exPrice.toFixed(2),
      objImage = product.image,
      objid = product.id;

    const elemOfRecom = document.createElement('li'),
      imgOfRecom = document.createElement('img'),
      wrapOfTitleAndPrice = document.createElement('div'),
      proTitle = document.createElement('h3'),
      proPrice = document.createElement('span'),
      imgCart = document.createElement('img');

    listOfRecommeded.appendChild(elemOfRecom)
    elemOfRecom.appendChild(imgOfRecom)
    elemOfRecom.appendChild(wrapOfTitleAndPrice)
    elemOfRecom.appendChild(imgCart)
    wrapOfTitleAndPrice.appendChild(proTitle)
    wrapOfTitleAndPrice.appendChild(proPrice)

    elemOfRecom.setAttribute("class", "item")
    imgOfRecom.setAttribute("class", "imgOfRecom")
    imgOfRecom.setAttribute('src', `${objImage}`)
    wrapOfTitleAndPrice.setAttribute('class', 'wrapOfTitleAndPrice')
    proTitle.setAttribute('class', 'title')
    proTitle.setAttribute('onclick', `getDataDetails(${objid},displayDetails)`)
    proPrice.setAttribute('class', 'price')
    imgCart.setAttribute('class', 'addToCart')
    imgCart.setAttribute('src', '../assets/img/cart with plus.svg')
    imgCart.setAttribute('onclick', `getDataDetails(${objid},addToCart)`)

    proTitle.innerText = `${readyTitle}`
    proPrice.innerText = `${symbol} ${objPrice}`

  });
}

//get product by category
function getProductByCate(e) {
  let category = e.target.textContent;
  let apiCategory = `https://fakestoreapi.com/products/category/${category}`
  main.style.display = 'none'
  getCategoryData(apiCategory);
}

//get data from apiCategory
async function getCategoryData(apiCategory) {
  try {
    const response = await fetch(apiCategory)
    const data = await response.json()

    createProByCategory(data);

  } catch (e) {
    console.log("error", e.message)
  }
}

//create list of products and display it
const mainOfCategory = document.createElement('main');

function createProByCategory(data) {
  let mainCategory = document.getElementById('mainOfCategory')
  if (mainCategory != null) {
    mainCategory.style.display = 'block'
  }

  const sectionOfCategory = document.createElement('section'),
    ulOfCategory = document.createElement('ul'),
    container = document.getElementById('container');

  mainOfCategory.innerHTML = "";
  data.forEach(product => {

    let objTitle = product.title,
      readyTitle = objTitle.split(' ').slice(0, 3).join(' '),
      objPrice = product.price,
      objImage = product.image,
      objid = product.id;

    const elemOfCategory = document.createElement('li'),
      proImgOfCategory = document.createElement('img'),
      textAndImgOfCategory = document.createElement('div'),
      titleAndPriceOfCategory = document.createElement('div'),
      cartImgOfCategory = document.createElement('img'),
      proTitleOfCategory = document.createElement('h3'),
      proPriceOfCategory = document.createElement('span');

    container.appendChild(mainOfCategory)
    mainOfCategory.appendChild(sectionOfCategory)
    sectionOfCategory.appendChild(ulOfCategory)
    ulOfCategory.appendChild(elemOfCategory)
    elemOfCategory.appendChild(proImgOfCategory)
    elemOfCategory.appendChild(textAndImgOfCategory)
    textAndImgOfCategory.appendChild(titleAndPriceOfCategory)
    textAndImgOfCategory.appendChild(cartImgOfCategory)
    titleAndPriceOfCategory.appendChild(proTitleOfCategory)
    titleAndPriceOfCategory.appendChild(proPriceOfCategory)

    mainOfCategory.setAttribute("id", "mainOfCategory")
    sectionOfCategory.setAttribute("class", "wrapPopulore")
    elemOfCategory.setAttribute("class", "item")
    ulOfCategory.setAttribute("class", "listOfPopulore items")
    proImgOfCategory.setAttribute("class", "imgOfPopulore")
    proImgOfCategory.setAttribute('src', `${objImage}`)
    textAndImgOfCategory.setAttribute('class', 'wrapOfText')
    proTitleOfCategory.setAttribute('class', 'title')
    proTitleOfCategory.setAttribute('onclick', `getDataDetails(${objid},displayDetails)`)
    proPriceOfCategory.setAttribute('class', 'price')
    cartImgOfCategory.setAttribute('src', '../assets/img/cart with plus.svg')
    cartImgOfCategory.setAttribute('onclick', `getDataDetails(${objid}, addToCart)`)

    proTitleOfCategory.innerText = `${readyTitle}`
    proPriceOfCategory.innerText = `$${objPrice}`
  });
}

const nameOfApp = document.getElementById('nameOfApp')
nameOfApp.addEventListener('click', showHomePage)

// get back to home page from Category
function showHomePage() {
  let mainCategory = document.getElementById('mainOfCategory')
  mainCategory.style.display = 'none'
  main.style.display = 'block'
}

//get details data of product by id
async function getDataDetails(id, fun) {
  let apiDetails = `https://fakestoreapi.com/products/${id}`
  try {
    const response = await fetch(apiDetails)
    const data = await response.json()

    fun(data);

  } catch (e) {
    console.log("error", e.message)
  }
}

function displayDetails(data) {
  localStorage.getItem("data") === null ? [] : JSON.parse(localStorage.getItem("data"));
  localStorage.setItem('data', JSON.stringify(''))
  localStorage.setItem('data', JSON.stringify(data))
  location.href = '../details/details.html'
}

//add the product into object and storage it into loacal storage
function addToCart(data) {
  unknown = localStorage.getItem("unknown") === null ? [] : JSON.parse(localStorage.getItem("unknown"));

  let newProduct = {
    id: "",
    title: "",
    description: "",
    category: "",
    image: "",
    price: "",
    quantity: ""
  }

  newProduct.id = data.id
  newProduct.title = data.title
  newProduct.description = data.description
  newProduct.category = data.category
  newProduct.image = data.image
  newProduct.price = data.price
  newProduct.quantity = 1

  if (unknown.Product.length == 0) {
    unknown.Product.push(newProduct)
  } else {
    let flag = false
    for (let index = 0; index < unknown.Product.length; index++) {
      if (unknown.Product[index].id == newProduct.id) {
        unknown.Product[index].quantity += 1;
        flag = false
        break;
      } else {
        flag = true
      }
    }
    if (flag) unknown.Product.push(newProduct)
  }
  localStorage.setItem("unknown", JSON.stringify(unknown));
  showCount()
}

//show the count of product in cart
function showCount() {
  let count = document.getElementById('count')
  if (unknown.Product.length > 0)
    count.style.display = 'block'
  count.textContent = unknown.Product.length;
}
showCount()

//change the name depend on some state
let account = document.getElementById('account'),
  wrapAccount = document.getElementById('wrapAccount'),
  logout = document.getElementById('logout'),
  arrowIcon = document.getElementById('arrowIcon');
if (unknown.Name == '') {
  account.textContent = 'Sign up'
  arrowIcon.style.display = 'none'
} else {
  account.textContent = unknown.Name
  arrowIcon.style.display = 'inline-block'
}

//add link for createAccount page
wrapAccount.addEventListener('click', () => {
  if (account.textContent == 'Sign up') {
    location.href = '../createAccount/createAccount.html'
  } else {
    logout.classList.toggle('activeLogOut')
    arrowIcon.classList.toggle('rotateIcon')
  }
})

//add event when click on logout
logout.addEventListener('click', logOutFunction)

//logout function
function logOutFunction() {
  logout.classList.toggle('activeLogOut')
  arrowIcon.classList.toggle('rotateIcon')
  arrowIcon.style.display = 'none'
  account.textContent = 'Sign up'
  unknown.Currency = ''
  unknown.Name = ''
  unknown.Email = ''
  unknown.Password = ''
  unknown.Product = []
  localStorage.setItem("unknown", JSON.stringify(unknown));
  showCount()
}

//add link for cart page
let cartShow = document.getElementById('cartShow')
cartShow.addEventListener('click', () => {
  location.href = '../cart/cart.html'
})

//get element for dom and event listener (for search function)
const wrapTags = document.getElementById('wrapTags'),
  searchInput = document.getElementById('searchInput'),
  itemsSection = document.getElementById('itemsSection'),
  lists = document.createElement('ul');

lists.setAttribute('class', 'itemsSearch')
searchInput.addEventListener('keyup', search)

//fetch translate api 
async function getDataTranslate(arabicWord) {
  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${arabicWord}&langpair=ar%7Cen-US%22`)
    const dataWord = await response.json()
    getEnglishWord(dataWord)
  } catch (e) {
    console.log("error", e.message)
  }
}

//get translated Word
let translatedWord;

function getEnglishWord(dataWord) {
  translatedWord = dataWord.matches[0].translation
}

//search function
function search() {

  let arabic = /[\u0600-\u06FF\u0750-\u077F]/,
    word = searchInput.value,
    found = true,
    searchValue,
    timerWord;

  if (arabic.test(word)) {
    timerWord = 1000
    getDataTranslate(word)
    searchValue = translatedWord
  } else {
    searchValue = searchInput.value
    timerWord = 0
  }

  setTimeout(() => {
    itemsSection.style.display = 'block'
    lists.textContent = ''
    if (dataForSearch.length > 0 && searchValue !== '' && searchValue !== ' ') {
      dataForSearch.forEach(el => {
        let nameOfProduct = el.title
        let nameOfProductSearch = el.title.toLowerCase()
        if (nameOfProductSearch.includes(searchValue.toLowerCase().trim())) {
          found = false
          wrapTags.style.display = 'flex'
          main.style.display = 'block'
          notfound.style.display = 'none'
          const list = document.createElement('li')
          list.textContent = nameOfProduct.split(' ').splice(0, 5).join(' ')
          list.setAttribute('class', 'itemSearch')
          list.setAttribute('onclick', `getDataDetails(${el.id},displayDetails)`)
          lists.appendChild(list)
        }
      })
      if (found) {
        let notfound = document.getElementById('notfound')
        wrapTags.style.display = 'none'
        main.style.display = 'none'
        notfound.style.display = 'flex'
      }
    }
    itemsSection.appendChild(lists)
  }, timerWord)
}