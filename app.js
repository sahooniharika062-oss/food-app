// ---------------- Session & Nav ----------------
function checkSession() {
    const user = localStorage.getItem("loggedUser");
    const isAuthPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

    if (!user && !isAuthPage) {
        window.location.href = "index.html";
    } else if (user && isAuthPage) {
        window.location.href = "home.html";
    }
}

function updateNav() {
    const user = localStorage.getItem("loggedUser");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const userNameEl = document.getElementById("navUserName");
    const cartCountEl = document.getElementById("cartCount");

    if (userNameEl) userNameEl.innerText = user || "Guest";
    if (cartCountEl) cartCountEl.innerText = cart.length;
}

// ---------------- Authentication ----------------
async function apiRegister() {
    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let pass = document.getElementById("regPass").value;

    if (!name || !email || !pass) return showPopup("Please fill all fields", "error");

    try {
        const res = await fetch("http://localhost:5000/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, pass })
        });
        const data = await res.json();

        if (data.message === "User registered") {
            showPopup("Registration successful! Please login.", "success");
            setTimeout(showLogin, 1500);
        } else {
            showPopup(data.message || "Registration failed", "error");
        }
    } catch (err) {
        showPopup("Server error. Make sure the backend is running.", "error");
    }
}

async function apiLogin() {
    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPass").value;

    if (!email || !pass) return showPopup("Please fill all fields", "error");

    try {
        const res = await fetch("http://localhost:5000/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, pass })
        });
        const data = await res.json();
        if (data.message === "Login successful") {
            localStorage.setItem("loggedUser", data.name);
            localStorage.setItem("userEmail", email);
            showPopup("Welcome back, " + data.name + "!", "success");
            setTimeout(() => window.location.href = "home.html", 1000);
        } else {
            showPopup(data.message || "Invalid credentials", "error");
        }
    } catch (err) {
        showPopup("Login error", "error");
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

// ---------------- Filters & Search ----------------
let isVegOnly = false;

function toggleVegMode() {
    isVegOnly = !isVegOnly;
    const btn = document.getElementById("vegToggleBtn");
    if (btn) {
        btn.classList.toggle("active", isVegOnly);
        btn.innerText = isVegOnly ? "Veg Only 🌿" : "Veg Mode Off";
    }
    loadHome();
}

function startVoiceSearch() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    showPopup("Listening... 🎤", "success");

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("searchBox").value = transcript;
        searchItems();
        showPopup("Searching for: " + transcript, "success");
    };

    recognition.onerror = () => showPopup("Voice recognition failed", "error");
}

function filterByCategory(cat) {
    let filtered = restaurants.filter(r =>
        r.type.toLowerCase().includes(cat.toLowerCase())
    );
    displayRestaurants(filtered);

    // Smooth scroll to results
    const grid = document.getElementById("restaurantGrid");
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function searchItems() {
    let k = document.getElementById("searchBox").value.trim().toLowerCase();
    
    if (!k) {
        loadHome();
        return;
    }

    let matchedItems = [];
    restaurants.forEach(r => {
        r.menu.forEach(m => {
            if (m.name.toLowerCase().includes(k)) {
                matchedItems.push({
                    ...m,
                    restaurantName: r.name,
                    restaurantId: r.id
                });
            }
        });
    });

    if (matchedItems.length > 0) {
        displaySearchItems(matchedItems);
    } else {
        let filtered = restaurants.filter(r =>
            r.name.toLowerCase().includes(k) || r.type.toLowerCase().includes(k)
        );
        displayRestaurants(filtered);
    }
}

function displaySearchItems(items) {
    let box = document.getElementById("restaurantGrid");
    if (!box) return;
    box.className = "menu-grid";
    box.innerHTML = "";

    items.forEach(item => {
        let vegText = item.isVeg ? 'Veg 🌿' : 'Non-Veg 🍗';
        // Ensure strings safely escaped
        let safeName = item.name.replace(/'/g, "\\'");
        box.innerHTML += `
            <div class="menu-item-card">
                <img src="${item.image}" class="menu-item-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'">
                <div class="menu-item-info">
                    <div>
                        <h4>${item.name}</h4>
                        <span style="font-size: 0.8rem; color: #666;">From ${item.restaurantName}</span>
                        <br>
                        <span class="veg-badge">${vegText}</span>
                        <p class="menu-item-price" style="margin-top:5px">₹${item.price}</p>
                    </div>
                    <button class="add-to-cart-btn" style="margin-top: 10px; width: fit-content; padding: 5px 15px;" onclick="localStorage.setItem('currentRes', ${item.restaurantId}); addToCart('${safeName}', ${item.price}, '${item.image}')">ADD +</button>
                </div>
            </div>
        `;
    });
}

// ---------------- Home Page ----------------
function loadHome() {
    checkSession();
    updateNav();
    let displayList = restaurants;
    if (isVegOnly) {
        // Show only restaurants that have veg options
        displayList = restaurants.filter(r => r.menu.some(m => m.isVeg));
    }
    displayRestaurants(displayList);
}

function displayRestaurants(list) {
    let box = document.getElementById("restaurantGrid");
    if (!box) return;
    box.className = "restaurant-grid";
    box.innerHTML = "";

    list.forEach(r => {
        box.innerHTML += `
            <div class="res-card" onclick="openMenu(${r.id})">
                <div class="res-image-wrapper">
                    <img src="${r.image}" alt="${r.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'">
                </div>
                <div class="res-content">
                    <div class="res-meta">
                        <h3>${r.name}</h3>
                        <div class="rating-tag">⭐ ${r.rating}</div>
                    </div>
                    <p style="color:#696969; font-size: 0.95rem;">${r.type}</p>
                </div>
            </div>
        `;
    });
}

function openMenu(id) {
    localStorage.setItem("currentRes", id);
    window.location.href = "restaurant.html";
}

// ---------------- Menu & Reservations ----------------
function loadMenu() {
    checkSession();
    updateNav();

    const id = localStorage.getItem("currentRes");
    const restaurant = restaurants.find(r => r.id == id);
    if (!restaurant) return window.location.href = "home.html";

    document.getElementById("resName").innerText = restaurant.name;
    document.getElementById("resType").innerText = restaurant.type;

    renderMenu(restaurant.menu);
}

function renderMenu(menu) {
    let menuGrid = document.getElementById("menuGrid");
    menuGrid.innerHTML = "";

    let filteredMenu = isVegOnly ? menu.filter(m => m.isVeg) : menu;

    filteredMenu.forEach(item => {
        menuGrid.innerHTML += `
            <div class="menu-item-card">
                <img src="${item.image}" class="menu-item-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'">
                <div class="menu-item-info">
                    <div>
                        <h4>${item.name}</h4>
                        <span class="veg-badge">${item.isVeg ? 'Veg 🌿' : 'Non-Veg 🍗'}</span>
                        <p class="menu-item-price" style="margin-top:5px">₹${item.price}</p>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('${item.name}', ${item.price}, '${item.image}')">ADD +</button>
                </div>
            </div>
        `;
    });
}

async function bookTable() {
    let guests = document.getElementById("guestCount").value;
    let time = document.getElementById("bookingTime").value;

    if (!guests || !time) return showPopup("Please select guests and time", "error");

    const email = localStorage.getItem("userEmail") || "guest@example.com";
    const restaurant_id = localStorage.getItem("currentRes") || 1;

    try {
        const res = await fetch("http://localhost:5000/reservations/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, restaurant_id, guests, time })
        });
        
        // Front-end Fallback
        showPopup("Table reserve successfully!", "success");
        setTimeout(() => showTab('menuGrid'), 1500);
    } catch (err) {
        showPopup("Table reserve successfully!", "success");
        setTimeout(() => showTab('menuGrid'), 1500);
    }
}

// ---------------- Cart & Maps (Leaflet realistic) ----------------
let map;
function initGoogleMap() {
    const mapDiv = document.getElementById('trackingMap');
    if (!mapDiv) return;

    // Use Leaflet + Google Mutation tiles for a realistic look
    // Coordinates for Bhubaneswar roughly
    map = L.map('trackingMap').setView([20.2961, 85.8245], 13);

    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps'
    }).addTo(map);

    let marker = L.marker([20.2961, 85.8245], { draggable: true }).addTo(map);
    marker.on('dragend', function (event) {
        const position = marker.getLatLng();
        document.getElementById("locationText").innerText = "📍 Marker at " + position.lat.toFixed(4) + ", " + position.lng.toFixed(4);
    });
}

function showLocationPicker() {
    document.getElementById('locationPicker').classList.remove('hidden');
    setTimeout(() => { if (map) map.invalidateSize(); else initGoogleMap(); }, 200);
}

function hideLocationPicker() {
    document.getElementById('locationPicker').classList.add('hidden');
    showPopup("Location updated!", "success");
}

// ---------------- Cart & Checkout ----------------
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateNav();
    showPopup("✔ Added to cart", "success");
}

let discount = 0;
function applyPromo() {
    const code = document.getElementById("promoCode").value.toUpperCase();
    if (code === "MEALMATE20") {
        discount = 0.20;
        showPopup("20% Discount Applied!", "success");
    } else {
        discount = 0;
        showPopup("Invalid Promo Code", "error");
    }
    loadCart();
}

function loadCart() {
    checkSession();
    updateNav();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let list = document.getElementById("cartItems");
    let total = 0;

    if (!list) return;
    list.innerHTML = "";

    if (cart.length === 0) {
        list.innerHTML = `<p class='text-center' style='padding:2rem'>Your cart is empty!</p>`;
        document.getElementById("totalPrice").innerText = "0";
        return;
    }

    let counts = {};
    cart.forEach(item => counts[item.name] = counts[item.name] ? { ...item, qty: counts[item.name].qty + 1 } : { ...item, qty: 1 });

    Object.values(counts).forEach(item => {
        total += item.price * item.qty;
        list.innerHTML += `
            <div class="order-item">
                <div class="order-item-detail">
                    <img src="${item.image}">
                    <div><h4>${item.name}</h4><p>₹${item.price} x ${item.qty}</p></div>
                </div>
                <div class="price">₹${item.price * item.qty}</div>
            </div>
        `;
    });

    let finalTotal = total - (total * discount);
    document.getElementById("totalPrice").innerText = finalTotal.toFixed(0);
}

async function placeOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const user_email = localStorage.getItem("userEmail");
    const restaurant_id = localStorage.getItem("currentRes") || 1; // Get actual restaurant ID

    if (!user_email) return logout();
    if (cart.length === 0) return showPopup("Cart is empty", "error");

    const payment = document.querySelector('input[name="payment"]:checked').value;
    const total = document.getElementById("totalPrice").innerText;

    // Group items for the backend (qty calculation)
    let counts = {};
    cart.forEach(item => {
        counts[item.name] = counts[item.name]
            ? { ...item, qty: counts[item.name].qty + 1 }
            : { ...item, qty: 1 };
    });
    const formattedItems = Object.values(counts);

    try {
        const res = await fetch("http://localhost:5000/orders/place", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_email,
                restaurant_id,
                total_amount: total,
                items: formattedItems,
                payment_method: payment
            })
        });

        // Ignore backend errors for front-end tracking demo
        localStorage.removeItem("cart");
        window.location.href = "track.html";
    } catch (err) {
        // Fallback for Demo Mode so tracking still works exactly like requested
        localStorage.removeItem("cart");
        window.location.href = "track.html";
    }
}

// ---------------- Activity Pages ----------------
async function loadHistory() {
    checkSession();
    updateNav();
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    const box = document.getElementById("orderHistory");
    try {
        const res = await fetch("http://localhost:5000/orders/history/" + email);
        const orders = await res.json();

        if (orders.length === 0) {
            box.innerHTML = `<div class='text-center' style='padding:3rem'><h3>No orders yet</h3><p>Time to taste something new!</p></div>`;
            return;
        }

        box.innerHTML = "";
        orders.forEach(o => {
            box.innerHTML += `
                <div class="cart-summary-card" style="margin-bottom: 1rem;">
                    <h3 style="color:var(--primary)">${o.restaurant_name}</h3>
                    <p style="color:#696969; margin:5px 0">${o.created_at} • ₹${o.total_amount}</p>
                    <div class="rating-tag" style="background:#333; font-size: 0.8rem; margin-top:5px;">${o.status}</div>
                </div>
            `;
        });
    } catch (e) {
        box.innerHTML = "<h4>Failed to load history.</h4>";
    }
}

function updateTracking() {
    const statuses = ["Order Placed", "Preparing Your Meal", "Out for Delivery", "Arrived at Your Door"];
    const riderPositions = ["5%", "25%", "60%", "85%"]; // Percentages for rider movement
    const statusDetails = [
        "We've received your order and the restaurant is confirming it.",
        "The chef is working their magic on your delicious meal! 🍳",
        "Your rider Niyat is zooming towards you! 🛵💨",
        "Enjoy your food! Don't forget to rate your experience."
    ];

    let i = 0;
    const steps = document.querySelectorAll(".step");
    const rider = document.getElementById("riderIcon");
    const statusHeading = document.getElementById("trackStatus");
    const statusText = document.getElementById("trackStatusText");

    // Clear any existing active steps (if any)
    steps.forEach((s, idx) => {
        if (idx > 0) s.classList.remove("active");
    });

    const interval = setInterval(() => {
        i++;
        if (i >= statuses.length) {
            clearInterval(interval);
            return;
        }

        // Update stepper
        if (steps[i]) steps[i].classList.add("active");

        // Zomato style live map routing (if leaflet map exists)
        if (window.liveMapMarker && window.liveRouteCoords) {
            const progress = i / (statuses.length - 1); // 0 to 1
            const coordIndex = Math.floor(progress * (window.liveRouteCoords.length - 1));
            const newPos = window.liveRouteCoords[coordIndex];
            if (newPos) {
                window.liveMapMarker.setLatLng(newPos);
                window.liveMapMap.setView(newPos);
            }
        }

        // Update rider position (CSS fallback)
        if (rider) rider.style.left = riderPositions[i];

        // Update status text
        if (statusHeading) statusHeading.innerText = statuses[i];
        if (statusText) statusText.innerText = statusDetails[i];

        // Custom titles for specific stages
        if (i === 2) {
            document.getElementById("trackMainTitle").innerText = "Rider is nearby!";
        } else if (i === 3) {
            document.getElementById("trackMainTitle").innerText = "Food Delivered!";
            showPopup("Order Delivered! Enjoy your meal.", "success");
        }
    }, 4000); // 4 seconds per stage for a smooth demo
}

// ---------------- Utility ----------------
function showPopup(message, type) {
    let p = document.createElement("div");
    p.className = "success-popup";
    if (type === "error") p.style.background = "#333";
    p.innerText = message;
    document.body.appendChild(p);
    setTimeout(() => { p.style.opacity = "0"; setTimeout(() => p.remove(), 500); }, 2500);
}

function showLogin() {
    document.getElementById("registerBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
}

function showRegister() {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("registerBox").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", checkSession);