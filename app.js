let products = [
  {
    id: 1,
    name: "adidas shirt",
    price: 80,
    category: "fashion",
    img: "./images/shirt.png",
  },
  {
    id: 2,
    name: "earpods",
    price: 150,
    category: "phone accessories",
    img: "./images/airpods.png",
  },
  {
    id: 3,
    name: "jacket",
    price: 120,
    category: "fashion",
    img: "./images/jacket.png",
  },
  {
    id: 4,
    name: "adidas bottle",
    price: 50,
    category: "sport",
    img: "./images/bottle.png",
  },
  {
    id: 5,
    name: "glasses",
    price: 80,
    category: "men accessories",
    img: "./images/glasses.png",
  },
  {
    id: 6,
    name: "cap",
    price: 120,
    category: "men accessories",
    img: "./images/cap.png",
  },
  {
    id: 7,
    name: "adidas bag",
    price: 110,
    category: "bags",
    img: "./images/bag.png",
  },
  {
    id: 8,
    name: "adidas shoes",
    price: 80,
    category: "sport",
    img: "./images/shoes.png",
  },
  {
    id: 9,
    name: "bag",
    price: 100,
    category: "fashion",
    img: "./images/femalebag.png",
  },
]
let elements = products.map(e => `
      <figure>
        <img src=${e.img} alt="">
        <figcaption>
          <p class="product">Product: <span>${e.name}</span></p>
          <p class="price">Price: <span>$${e.price}</span></p>
          <p class="category">Category: <span>${e.category}</span></p>
          <div>
            <button name="${e.name}" price="${e.price}" id="${e.id}" class="addcart">Add to cart</button>
            <i name="${e.name}" img="${e.img}" category="${e.category}" id="${e.id}" class="fa-solid addfavourite fa-heart"></i>
          </div>
        </figcaption>
      </figure>
`)
function sel(e) {
  return document.querySelector(e)
}
sel(".items").innerHTML = elements.join("")
let user = JSON.parse(localStorage.getItem("user")) || false

let cart = JSON.parse(localStorage.getItem("cart")) || []
let favourites = JSON.parse(localStorage.getItem("favourites")) || []

document.querySelectorAll(".addcart").forEach(e => {
  e.onclick = el => {
    cart = JSON.parse(localStorage.getItem("cart")) || []
    if (cart.length == 0) {
      cart = [
        {
          id: e.id,
          price: e.getAttribute("price"),
          name: e.getAttribute("name"),
          amount: 1
        }
      ]
      e.innerHTML = "Remove from cart"
      e.classList.add("removecart")
      localStorage.setItem("cart", JSON.stringify(cart))
      return;
    }
    for (let i = 0; i < cart.length; i++) {
      if (e.id == cart[i].id) {
        let newcart = cart.filter(ell => ell.id != e.id)
        cart = newcart
        e.innerHTML = "Add to cart"
        e.classList.remove("removecart")
        break
      } else if (i == cart.length - 1 && e.id != cart[i].id) {
        cart = [
          ...cart,
          {
            id: e.id,
            name: e.getAttribute("name"),
            price: e.getAttribute("price"),
            amount: 1
          }
        ]
        e.classList.add("removecart")
        e.innerHTML = "Remove from cart"
        break
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
  }
})

document.querySelectorAll(".addfavourite").forEach(e => {
  if(favourites.length>0){
    favourites.forEach(e2=>{
      if(e2.id == e.getAttribute("id")){
        e.classList.add("fav")
      }
    })
  }
  e.onclick = () => {
    favourites = JSON.parse(localStorage.getItem("favourites")) || []
    if (favourites.length = 0) {
      favourites = [
        {
          id: e.getAttribute("id"),
          name: e.getAttribute("name"),
          img: e.getAttribute("img"),
          category: e.getAttribute("category"),
        }
      ]
      localStorage.setItem("favourites", JSON.stringify(favourites))
      e.classList.add("fav")
    }else if(e.classList.contains("fav")){
      e.classList.remove("fav")
      favourites = JSON.parse(localStorage.getItem("favourites")) || []
      let newfav = favourites.filter(e2=>e2.id != e.getAttribute("id"))
      localStorage.setItem("favourites",JSON.stringify(newfav) )
    }else{
      favourites = JSON.parse(localStorage.getItem("favourites")) || []
      e.classList.add("fav")
      console.log("addfav")
      favourites = [
        ...favourites,
        {
          id: e.getAttribute("id"),
          name: e.getAttribute("name"),
          img: e.getAttribute("img"),
          category: e.getAttribute("category"),
        },
      ]
      localStorage.setItem("favourites", JSON.stringify(favourites))
    }
  }
})

if (user !== false) {
  sel(".username").innerHTML = user.firstname;
  sel(".access").style.display = "none"
  cart.forEach(item => {
    let llaala = document.querySelectorAll(".addcart")
    for (let index = 0; index < llaala.length; index++) {
      if (item.id == llaala[index].id) {
        llaala[index].innerHTML = "Remove from cart";
        llaala[index].classList.add("removecart");
      }
    }
  })
} else {
  sel(".account").style.display = "none"
  sel(".username").style.display = "none"
  sel(".welcome").style.display = "none"
}
sel("#logout").onclick = () => {
  localStorage.removeItem("user")
  sel(".account").style.display = "none"
  sel(".username").style.display = "none"
  sel(".welcome").style.display = "none"
}

sel(".fa-caret-down").onclick = (e) => {
  cart = JSON.parse(localStorage.getItem("cart"))
  if (sel(".dropmenu").classList.contains("displaynone")) {
    sel(".dropmenu").classList.remove("displaynone")
    sel(".fa-caret-down").classList.add("goup")
  } else {
    sel(".fa-caret-down").classList.remove("goup")
    sel(".dropmenu").classList.add("displaynone")
  }
  if (cart.length == 0) {
    sel(".dropmenu-list").innerHTML = "";
    return
  }
  cart.forEach(e => {
    cart = JSON.parse(localStorage.getItem("cart")) || []
    let menu = cart.map(e => `
    <div class="item fig-${e.id}">
      <p>${e.name}</p>
      <div>
        <span class="item-${e.id}">${e.amount}</span>
        <i id="${e.id}" class="fa-solid fa-plus addamount"></i>
        <i id="${e.id}" class="fa-solid fa-minus minamount"></i>
      </div>
    </div>
    `)
    sel(".dropmenu-list").innerHTML = menu.join("");


    if (cart.length > 0) {
      document.querySelectorAll(".addamount").forEach(e => {
        e.onclick = (event) => {
          cart = JSON.parse(localStorage.getItem("cart"))
          cart.forEach(e2 => {
            if (e.id == e2.id) {
              e2.amount += 1
              sel(`.item-${e.id}`).innerHTML = e2.amount
              localStorage.setItem("cart", JSON.stringify(cart))
            }
          })
        }
      })

      document.querySelectorAll(".minamount").forEach(e => {
        e.onclick = (event) => {
          cart = JSON.parse(localStorage.getItem("cart"))
          cart.forEach(e2 => {
            if (e.id == e2.id) {
              if (e2.amount == 1) {
                sel(`.fig-${e2.id}`).remove()
                let newcart = cart.filter(ell => ell.id != e2.id)
                localStorage.setItem("cart", JSON.stringify(newcart))
                return;
              } else {
                e2.amount--
              }
              sel(`.item-${e.id}`).innerHTML = e2.amount
              localStorage.setItem("cart", JSON.stringify(cart))
            }
          })
        }
      })
    }
  })

}

sel("#searchinput").onkeyup = () => {
  if (sel("#category").value == "name") {
    let result = products.filter(e => e.name.includes(`${sel("#searchinput").value}`))
    let newelements = result.map(e => `
  <figure>
    <img src=${e.img} alt="">
    <figcaption>
      <p class="product">Product: <span>${e.name}</span></p>
      <p class="price">Price: <span>$${e.price}</span></p>
      <p class="category">Category: <span>${e.category}</span></p>
      <div>
        <button name="${e.name}" price="${e.price}" id="${e.id}" class="addcart">Add to cart</button>
        <i class="fa-solid fa-heart"></i>
      </div>
    </figcaption>
  </figure>
`)
    sel(".items").innerHTML = newelements.join("")
  } else {
    let result = products.filter(e => e.category.includes(`${sel("#searchinput").value}`))
    let newelements = result.map(e => `
  <figure>
    <img src=${e.img} alt="">
    <figcaption>
      <p class="product">Product: <span>${e.name}</span></p>
      <p class="price">Price: <span>$${e.price}</span></p>
      <p class="category">Category: <span>${e.category}</span></p>
      <div>
        <button name="${e.name}" price="${e.price}" id="${e.id}" class="addcart">Add to cart</button>
        <i class="fa-solid fa-heart"></i>
      </div>
    </figcaption>
  </figure>
`)
    sel(".items").innerHTML = newelements.join("")
  }

}