const restaurants = [
  {
    id: 1,
    name: "KFC",
    image: "images/restaurants/kfc.jpg",
    rating: 4.2,
    type: "American • Fast Food • Chicken",
    menu: [
      { name: "Chicken Bucket", price: 399, image: "images/items/chicken_bucket.jpg", isVeg: false },
      { name: "French Fries", price: 99, image: "images/items/fries2.jpg", isVeg: true },
      { name: "Veg Zinger", price: 149, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400", isVeg: true },
      { name: "Pepsi", price: 49, image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80&w=400", isVeg: true },
      { name: "Chicken Burger", price: 99, image: "images/items/chickenburger.jpg", isVeg: false },
      { name: "Coke", price: 89, image: "images/items/coke.jpg", isVeg: true }

    ]
  },

  {
    id: 2,
    name: "Dominos",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
    rating: 4.5,
    type: "Italian • Pizza",
    menu: [
      { name: "Farmhouse Pizza", price: 299, image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=400", isVeg: true },
      { name: "Margherita", price: 199, image: "images/items/Margherita.jpg", isVeg: true },
      { name: "Garlic Bread", price: 129, image: "images/items/garlic_bread.jpg", isVeg: true },
      { name: "Coke", price: 49, image: "images/items/coke.jpg", isVeg: true },
      { name: "Chicken Tikka Pizza", price: 250, image: "images/items/chickentikkapizza.jpg", isVeg: false }

    ]
  },

  {
    id: 3,
    name: "Haldiram's",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    type: "Pure Veg • Sweets • Snacks",
    menu: [
      { name: "Chole Bhature", price: 180, image: "images/items/Chole_bhature.jpg", isVeg: true },
      { name: "Raj Kachori", price: 120, image: "images/items/Raj_kachori.jpg", isVeg: true },
      { name: "Paneer Tikka", price: 240, image: "images/items/paneertikka.jpg", isVeg: true },
      { name: "Kaju Katli", price: 450, image: "images/items/Kaju_katli_sweet.jpg", isVeg: true },
      { name: "Vada", price: 40, image: "images/items/bara.jpg", isVeg: true },
      { name: "Samosa", price: 60, image: "images/items/samosa.jpg", isVeg: true }


    ]
  },

  {
    id: 4,
    name: "The South Story",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=800",
    rating: 4.4,
    type: "Pure Veg • South Indian",
    menu: [
      { name: "Masala Dosa", price: 160, image: "images/items/masaladosa.jpg", isVeg: true },
      { name: "Idli Sambhar", price: 99, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400", isVeg: true },
      { name: "Vada", price: 110, image: "images/items/bara.jpg", isVeg: true },
      { name: "Lemon Rice", price: 110, image: "images/items/lemon.jpg", isVeg: true },
      { name: "Bonda", price: 110, image: "images/items/bonda.jpg", isVeg: true },

    ]
  },

  {
    id: 5,
    name: "McDonald's",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=80&w=800",
    rating: 4.3,
    type: "Burgers • Fast Food",
    menu: [
      { name: "McAloo Tikki", price: 79, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400", isVeg: true },
      { name: "McDouble", price: 189, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400", isVeg: false },
      { name: "Cold Coffee", price: 200, image: "images/items/cold_coffee.jpg", isVeg: true },
      { name: "Fries", price: 89, image: "images/items/fries.jpg", isVeg: true },
      { name: "Veg Maharaja Mac", price: 230, image: "images/items/vegmac.jpg", isVeg: true },
      { name: "Coke", price: 150, image: "images/items/coke.jpg", isVeg: true },

    ]
  },

  {
    id: 6,
    name: "Biryani House",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800",
    rating: 4.4,
    type: "Indian • Mughlai • Biryani",
    menu: [
      { name: "Hyderabadi Chicken Biryani", price: 299, image: "images/items/chicken_biryani.jpg", isVeg: false },
      { name: "Mutton Biryani", price: 399, image: "images/items/mutton_biriyani.jpg", isVeg: false },
      { name: "Veg Biryani", price: 199, image: "images/items/veg_biryani.jpg", isVeg: true },
      { name: "Fish Biryani", price: 399, image: "images/items/fishbiriyani.jpg", isVeg: false },
      { name: "Prawn Biryani", price: 199, image: "images/items/prawnbiriyani.jpg", isVeg: false }

    ]
  },
  {
    id: 7,
    name: "Odia Dhaba",
    image: "images/restaurants/OdiaDhaba.jpg",
    rating: 4.5,
    type: "Odia • Dhaba",
    menu: [
      { name: "Dalma", price: 299, image: "images/items/dalma.jpg", isVeg: true },
      { name: "RasaBali", price: 199, image: "images/items/RasaBali.jpg", isVeg: true },
      { name: "RasaMalai", price: 129, image: "images/items/RasaMalai.jpg", isVeg: true },
      { name: "Fish Curry", price: 49, image: "images/items/fish-curry-full.jpg", isVeg: false },
      { name: "Ghanta Tarkari", price: 250, image: "images/items/Ghanta-tarkari-1.jpg", isVeg: false },
      { name: "Kakara", price: 250, image: "images/items/Kakara.jpg", isVeg: false }

    ]
  },
  {
    id: 8,
    name: "Bihari Cultures",
    image: "images/restaurants/Bihari.jpg",
    rating: 4.5,
    type: "Bihari • Dhaba",
    menu: [
      { name: "Litti Chokha", price: 100, image: "images/items/Litti_Chokha.jpg", isVeg: true },
      { name: "Khaja", price: 150, image: "images/items/khaja.jpg", isVeg: true },
      { name: "Malpua", price: 129, image: "images/items/Malpua.jpg", isVeg: true },
      { name: "Sattu Paratha", price: 49, image: "images/items/sattu.jpg", isVeg: true },
      { name: "Champaran Mutton Meal", price: 250, image: "images/items/muttonmeal.jpg", isVeg: false },
      { name: "Dal Pitthi", price: 120, image: "images/items/pitthi.jpg", isVeg: true }

    ]
  }

];