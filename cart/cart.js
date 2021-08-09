let cartList = document.getElementById("cartList");

let unKnown_user = JSON.parse(localStorage.getItem("unknown"));
let products = unKnown_user.Product;

for (let i = 0; i < products.length; i++) {
    if(products[i].id == "")continue;
  console.log(products)

  let productBlock = document.createElement("div");
  productBlock.className = "product-block";

  let productImg = document.createElement("div");
  //  productImg.className = "product-img";
  let img = document.createElement("img");
  img.src = products[i].image;
  img.className = "product-img";
  productImg.appendChild(img);
  console.log(products[i]);
  productBlock.appendChild(productImg);

  let productData = document.createElement("div");
  productData.className = "product-data";

  let dataRow_1 = document.createElement("div");
  dataRow_1.className = "row-data";
  dataRow_1.setAttribute("style", "margin-top: 0.8125rem;");

  let productName = document.createElement("h2");
  productName.className = "normal-text";
  productName.textContent = products[i].title.split(' ').slice(0, 3).join(' ');

  let productPrice = document.createElement("h2");
  productPrice.className = "normal-text";
  productPrice.setAttribute("style", "font-weight: 700;");
  productPrice.textContent = "$" + products[i].price;

  dataRow_1.appendChild(productName);
  dataRow_1.appendChild(productPrice);

  let dataRow_2 = document.createElement("div");
  dataRow_2.className = "row-data";

  let countSection = document.createElement("div");
  countSection.className = "count-section";

  let minusBox = document.createElement("button");
  let minus = document.createElement("img");
  minus.src = "../assets/img/minus.svg";
  minusBox.appendChild(minus);
  minusBox.className = "svg-box";
  let count = document.createElement("h2");
  count.className = "count";
  count.textContent = "2";
  let plusBox = document.createElement("button");
  plusBox.className = "svg-box";
  let plus = document.createElement("img");
  plus.src = "../assets/img/plus.svg";
  plusBox.appendChild(plus);

  countSection.appendChild(minusBox);
  countSection.appendChild(count);
  countSection.appendChild(plusBox);

  let removeSection = document.createElement("div");
  let removeText = document.createElement("button");
  removeText.className = "remove-button";
  removeText.textContent = "Remove";
  removeSection.appendChild(removeText);

  dataRow_2.appendChild(countSection);
  dataRow_2.appendChild(removeSection);

  productData.appendChild(dataRow_1);
  productData.appendChild(dataRow_2);
  productBlock.appendChild(productData);

  cartList.appendChild(productBlock);
}
