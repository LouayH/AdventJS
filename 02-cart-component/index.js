const items = [
    {
        id: 1,
        name: 'French Fries with Ketchup',
        price: 223,
        image: 'plate__french-fries.png',
        alt: 'French Fries',
        count: 0
    },
    {
        id: 2,
        name: 'Salmon and Vegetables',
        price: 512,
        image: 'plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
        count: 0
    },
    {
        id: 3,
        name: 'Spaghetti Meat Sauce',
        price: 782,
        image: 'plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
        count: 0
    },
    {
        id: 4,
        name: 'Bacon, Eggs, and Toast',
        price: 599,
        image: 'plate__bacon-eggs.png',
        alt: 'Bacon, Eggs, and Toast',
        count: 0
    },
    {
        id: 5,
        name: 'Chicken Salad with Parmesan',
        price: 698,
        image: 'plate__chicken-salad.png',
        alt: 'Chicken Salad with Parmesan',
        count: 0
    },
    {
        id: 6,
        name: 'Fish Sticks and Fries',
        price: 634,
        image: 'plate__fish-sticks-fries.png',
        alt: 'Fish Sticks and Fries',
        count: 0
    }
];

let subTotal = 0;
let tax = 0;
let total = 0;

const menuItems = document.querySelectorAll(".menu > li");
const cartItems = document.querySelector(".cart-summary");
const totals = document.querySelector(".totals");

const parsePrice = (amount) => amount.toFixed(2);

const updateTotals = () => {
    subTotal = items.reduce((sum, item) => (sum += item.price * item.count), 0);
    tax = parseFloat(subTotal * 9 / 100);
    total = parseFloat(subTotal + tax);

    const subTotalLabel = totals.querySelector(".line-item > .subtotal");
    const taxLabel = totals.querySelector(".line-item > .tax");
    const totalLabel = totals.querySelector(".line-item > .total");

    subTotalLabel.textContent = `$${parsePrice(subTotal / 100)}`;
    taxLabel.textContent = `$${parsePrice(tax / 100)}`;
    totalLabel.textContent = `$${parsePrice(total / 100)}`;
}

const toggleAddToCartButton = (button, isItemAdded = false) => {
    if(isItemAdded) {
        button.textContent = "Add to Cart";
        button.classList.remove('in-cart');
        button.classList.add('add');
        button.removeAttribute('disabled');

    } else {
        button.innerHTML = `
            <img src="images/check.svg" alt="Check" />
            In Cart
        `;
    
        button.classList.remove('add');
        button.classList.add('in-cart');
        button.setAttribute('disabled', true);
    }
}

const renderCartItem = (cartItem, item) => {
    cartItem.setAttribute('data-id', item.id);
    cartItem.innerHTML = `
        <div class="plate">
            <img src="images/${item.image}" alt="${item.alt}" class="plate" />
            <div class="quantity">${item.count}</div>
        </div>
        <div class="content">
            <p class="menu-item">${item.name}</p>
            <p class="price">$${item.price / 100}</p>
        </div>
        <div class="quantity__wrapper">
            <button class="decrease">
                <img src="images/chevron.svg" />
            </button>
            <div class="quantity">${item.count}</div>
            <button class="increase">
                <img src="images/chevron.svg" />
            </button>
        </div>
        <div class="subtotal">
            $${(item.price * item.count) / 100}
        </div>
    `;

    const decreaseButton = cartItem.querySelector("button.decrease");
    decreaseButton.addEventListener('click', () => removeFromCart(item, cartItem));

    const increaseButton = cartItem.querySelector("button.increase");
    increaseButton.addEventListener('click', () => addToCart(increaseButton, item, cartItem));
};

const removeFromCart = (item, cartItem) => {
    item.count--;
    updateTotals();

    if(item.count > 0) {
        renderCartItem(cartItem, item);
    } else {
        const itemIndex = items.findIndex(i => i.id === item.id);
        cartItem.remove();

        const menuItem = menuItems[itemIndex];
        const addToCartButton = menuItem.querySelector(".content > button");
        toggleAddToCartButton(addToCartButton, true);
    }
}

const addToCart = (button, item, cartItem = null) => {
    item.count++;
    updateTotals();

    if(cartItem) {
        renderCartItem(cartItem, item);
    } else {
        const cartItem = document.createElement('li');
        renderCartItem(cartItem, item);
        cartItems.appendChild(cartItem);
    
        toggleAddToCartButton(button);
    }
}

onload = () => {
    menuItems.forEach((menuItem, index) => {
        const item = items[index];
        const addToCartButton = menuItem.querySelector(".content > button");
        addToCartButton.addEventListener('click', () => addToCart(addToCartButton, item));
    });
}