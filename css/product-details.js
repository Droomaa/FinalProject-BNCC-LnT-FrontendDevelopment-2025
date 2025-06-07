        const addToCartBtn = document.getElementById("addToCart")
const checkoutBtn = document.getElementById("checkoutNow")
const wishlistBtn = document.getElementById("wishlist")
const quantityInput = document.getElementById("quantity")
const increaseBtn = document.getElementById("increaseBtn")
const decreaseBtn = document.getElementById("decreaseBtn")

// Cart functionality
const cart = []
const wishlist = []

// Quantity controls
increaseBtn.addEventListener("click", () => {
  const currentValue = Number.parseInt(quantityInput.value)
  if (currentValue < 10) {
    quantityInput.value = currentValue + 1
  } else {
    showNotification("Maximum quantity is 10", "warning")
  }
})

decreaseBtn.addEventListener("click", () => {
  const currentValue = Number.parseInt(quantityInput.value)
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1
  }
})

// Add to Cart functionality
addToCartBtn.addEventListener("click", () => {
  const quantity = Number.parseInt(quantityInput.value)
  const product = {
    id: "saturn-eternal",
    name: "Saturn Eternal",
    price: 250.0,
    quantity: quantity,
    image: "saturn-eternal.jpg",
  }

  const existingProduct = cart.find((item) => item.id === product.id)

  if (existingProduct) {
    existingProduct.quantity += quantity
  } else {
    cart.push(product)
  }

  showNotification("Product added to cart successfully!", "success")
  updateCartUI()

  addToCartBtn.style.transform = "scale(0.95)"
  setTimeout(() => {
    addToCartBtn.style.transform = "scale(1)"
  }, 150)
})

// Checkout functionality
checkoutBtn.addEventListener("click", () => {
  const quantity = Number.parseInt(quantityInput.value)
  const product = {
    id: "saturn-eternal",
    name: "Saturn Eternal",
    price: 250.0,
    quantity: quantity,
  }

  showNotification("Redirecting to checkout...", "info")

  setTimeout(() => {
    console.log("Checkout data:", product)
  }, 1500)
})

// Wishlist functionality
wishlistBtn.addEventListener("click", () => {
  const product = {
    id: "saturn-eternal",
    name: "Saturn Eternal",
    price: 250.0,
    image: "saturn-eternal.jpg",
  }

  const existingIndex = wishlist.findIndex((item) => item.id === product.id)

  if (existingIndex > -1) {
    wishlist.splice(existingIndex, 1)
    wishlistBtn.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
    showNotification("Removed from wishlist", "info")
  } else {
    wishlist.push(product)
    wishlistBtn.style.backgroundColor = "rgba(248, 113, 113, 0.3)"
    showNotification("Added to wishlist!", "success")
  }

  updateWishlistUI()
})

// Quantity input validation
quantityInput.addEventListener("input", function () {
  const value = Number.parseInt(this.value)

  if (isNaN(value) || value < 1) {
    this.value = 1
  } else if (value > 10) {
    this.value = 10
    showNotification("Maximum quantity is 10", "warning")
  }
})

// Notification system
function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px 25px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "600",
    zIndex: "9999",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
  })

  switch (type) {
    case "success":
      notification.style.background = "linear-gradient(135deg, #10B981, #059669)"
      break
    case "warning":
      notification.style.background = "linear-gradient(135deg, #F59E0B, #D97706)"
      break
    case "error":
      notification.style.background = "linear-gradient(135deg, #EF4444, #DC2626)"
      break
    default:
      notification.style.background = "linear-gradient(135deg, #6366F1, #4F46E5)"
  }

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 300)
  }, 3000)
}

// Update cart UI
function updateCartUI() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const cartIcon = document.querySelector(".cart-icon")
  if (cartIcon && cartCount > 0) {
    const existingBadge = cartIcon.querySelector(".cart-badge")
    if (existingBadge) {
      existingBadge.remove()
    }

    const badge = document.createElement("span")
    badge.className = "cart-badge"
    badge.textContent = cartCount
    badge.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            background: #EF4444;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        `

    cartIcon.style.position = "relative"
    cartIcon.appendChild(badge)
  }
}

function updateWishlistUI() {
  const wishlistCount = wishlist.length
  console.log(`Wishlist updated: ${wishlistCount} items`)
}

// Add hover effects
document.querySelectorAll(".discover-card, .note-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
    this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
    this.style.boxShadow = "none"
  })
})

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in-out"
    document.body.style.opacity = "1"
  }, 100)
})
