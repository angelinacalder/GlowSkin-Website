// --- SELECT ELEMENTS ---
const cartItemsContainer = document.querySelector(".cart-items");
const emptyMessage = document.querySelector(".cart-empty-message");
const subtotalEl = document.querySelector(".summary-row span:last-child");
const shippingEl = document.querySelector(".summary-row:nth-child(2) span:last-child");
const totalEl = document.querySelector(".summary-total span:last-child");

// Shipping cost (static)
const SHIPPING_COST = 4.99;


// --- UPDATE TOTALS ---
function updateTotals() {
    let subtotal = 0;

    document.querySelectorAll(".cart-item").forEach(item => {
        const price = parseFloat(item.querySelector(".item-price").textContent.replace("$", ""));
        const quantity = parseInt(item.querySelector(".qty-input").value);
        subtotal += price * quantity;
    });

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    const total = subtotal + SHIPPING_COST;
    totalEl.textContent = `$${total.toFixed(2)}`;

    checkIfEmpty();
}


// --- CHECK IF CART IS EMPTY ---
function checkIfEmpty() {
    const items = document.querySelectorAll(".cart-item");

    if (items.length === 0) {
        emptyMessage.style.display = "block";
        cartItemsContainer.style.display = "none";
    } else {
        emptyMessage.style.display = "none";
        cartItemsContainer.style.display = "flex";
    }
}


// --- ADD EVENT LISTENERS FOR QUANTITY BUTTONS ---
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("increase")) {
        const input = e.target.previousElementSibling;
        input.value = parseInt(input.value) + 1;
        updateTotals();
    }

    if (e.target.classList.contains("decrease")) {
        const input = e.target.nextElementSibling;
        if (input.value > 1) {
            input.value = parseInt(input.value) - 1;
            updateTotals();
        }
    }
});


// --- WHEN USER TYPES DIRECTLY IN QUANTITY INPUT ---
document.addEventListener("input", function (e) {
    if (e.target.classList.contains("qty-input")) {
        if (e.target.value < 1) e.target.value = 1;
        updateTotals();
    }
});


// --- REMOVE ITEM BUTTON ---
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-item")) {
        e.target.closest(".cart-item").remove();
        updateTotals();
    }
});


// INITIAL CALCULATION
updateTotals();
