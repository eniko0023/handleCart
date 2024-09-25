const products = [
  {
    id: 1,
    name: "Choco Bliss",
    price: 1200,
    picture: "choco_bliss.jpg", // Link to the chocolate image
    description: "A smooth and creamy milk chocolate with a hint of vanilla. Perfect for chocolate lovers!",
  },
  {
    id: 2,
    name: "Candy Delight",
    price: 800,
    picture: "candy_delight.jpg", // Link to the candy image
    description: "Delicious fruity candies that melt in your mouth. Great for kids and adults alike!",
  },
  {
    id: 3,
    name: "Bonbon Royale",
    price: 3000,
    picture: "bonbon_royale.jpg", // Link to the bonbon image
    description: "Premium bonbons filled with exotic flavors. A luxurious treat for special occasions.",
  },
  {
    id: 4,
    name: "Hazel Dream",
    price: 1500,
    picture: "hazel_dream.jpg", // Link to the hazelnut chocolate image
    description: "Rich dark chocolate with crunchy hazelnut pieces. Perfect for those who enjoy a nutty flavor!",
  },
  {
    id: 5,
    name: "Lemon Chew",
    price: 500,
    picture: "lemon_chew.jpg", // Link to the lemon candy image
    description: "Tangy lemon chews that pack a punch of citrusy flavor. Refreshing and sweet!",
  },
  {
    id: 6,
    name: "Caramel Treat",
    price: 2000,
    picture: "caramel_treat.jpg", // Link to the caramel chocolate image
    description: "Smooth caramel covered in milk chocolate. A delightful combination of sweetness and richness.",
  },
  {
    id: 7,
    name: "Berry Blast",
    price: 1000,
    picture: "berry_blast.jpg", // Link to the berry candy image
    description: "Mixed berry-flavored candies that burst with juicy flavors in every bite. Great for snacking!",
  },
  {
    id: 8,
    name: "Truffle Heaven",
    price: 4000,
    picture: "truffle_heaven.jpg", // Link to the truffle image
    description: "Decadent chocolate truffles filled with smooth ganache. Perfect for gifting or indulging.",
  },
  {
    id: 9,
    name: "Minty Fresh",
    price: 700,
    picture: "minty_fresh.jpg", // Link to the mint candy image
    description: "Refreshing mint candies that leave a cool sensation in your mouth. Great after meals!",
  },
  {
    id: 10,
    name: "Crunchy Delight",
    price: 2500,
    picture: "crunchy_delight.jpg", // Link to the crunchy chocolate image
    description: "A delightful chocolate bar with crispy rice pieces for an extra crunch in every bite.",
  },
  {
    id: 11,
    name: "Vanilla Bonbon",
    price: 3500,
    picture: "vanilla_bonbon.jpg", // Link to the vanilla bonbon image
    description: "Soft and creamy vanilla bonbons with a touch of white chocolate. A delicate and delicious treat.",
  },
  {
    id: 12,
    name: "Orange Twist",
    price: 600,
    picture: "orange_twist.jpg", // Link to the orange candy image
    description: "Zesty orange-flavored candies that are sweet, tangy, and perfect for a citrus kick.",
  }
];

// Kártyákat tartalmazó html-struktúra készítése (mellékhatás nélküli):
const createProductCards = (data) => {
  // console.log(data)
  // Ne tedd zárójelbe '{}' a map callback-függvény blokkját, mert akkor kell a return is!!!
  const cards = data.map(({ id, name, price, picture, description }) => 
    `<div class="product-card" id="${id}">
        <img src="img/${picture}" alt="${name}" title="${name}">
        <h3>${name}</h3>
        <p>${description}</p>
        <p>Ár: ${price} Ft</p>
        <button class="add-to-cart-btn">Kosárba</button>
    </div>`
  )
  // console.log(cards)
  return cards.join('');
};

const cardsHTML = createProductCards(products);

// A kártyák beillesztése a products-konténerbe (mellékhatás):
const renderCards = (htmlDetail) => {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "";
  productsContainer.innerHTML = htmlDetail;
};

// A kártyák megjelenítése, amikor az oldal betöltődik:
document.addEventListener("DOMContentLoaded", () => {
  renderCards(cardsHTML);
})

// A szűrés gombhoz tartozó funkció**********************************
// Input értékek kinyerése:
const getInputValues = () => {
  const minPriceValue = document.querySelector("#min-price").value;
  const maxPriceValue = document.querySelector("#max-price").value;
  return [minPriceValue, maxPriceValue];
};

// A kinyert értékek validálása és számokká alakítása:
const testingValues = (minValue, maxValue) => {
  if (!minValue || !maxValue) {
    return [false, 0, 0];
  }
  if (isNaN(minValue) || isNaN(maxValue)) {
    return [false, 0, 0];
  }
  return [true, Number(minValue), Number(maxValue)];
};

// Hibaüzenet küldése:
function sendErrorMessage() {
  alert("Helytelen értékeket adott meg a szűréshez!");
};

function notFoundMessage() {
  alert("Nem található a megadott feltételeknek megfelelő termék.");
}

// A szűrés elkészítése
const filteringValues = (data, minvalue, maxvalue, callback) => {
  const [isValid, minNumber, maxNumber] = callback(minvalue, maxvalue);
  if (!isValid) {
    sendErrorMessage();
    return [];
  }
  if (minNumber > maxNumber) {
    [minNumber, maxNumber] = [maxNumber, minNumber];
  }
  console.log(minNumber, maxNumber)
  const filteredProducts = data.filter(({price}) => price >= minNumber && price <= maxNumber);
  //console.log(filteredProducts)
  if (filteredProducts.length === 0) {
    notFoundMessage();
    return [];
  }
  //console.log(filteredProducts)
  return filteredProducts;
};

// A szűrt termékek megjelenítése:
// A már megírt createProducts() és a renderCards() függvényekkel...

// A szűrő gomb működtetése:
const filteredProductsDisplay = () => {
  const filterButton = document.querySelector("#filter-btn");
  filterButton.addEventListener("click", () => {
    const [ minimalPrice, maximalPrice ] = getInputValues();
    // console.log(minimalPrice, maximalPrice)
    const foundProducts = filteringValues(products, minimalPrice, maximalPrice, testingValues);
    console.log(foundProducts)
    if (foundProducts) {
      const foundedProducts = createProductCards(foundProducts);

      renderCards(foundedProducts);
    }
  })
};
filteredProductsDisplay();
