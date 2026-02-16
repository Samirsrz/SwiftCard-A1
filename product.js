
const navLinks = document.querySelectorAll('.menu a');
navLinks.forEach(link => {
  link.classList.remove('bg-violet-100', 'text-violet-700', 'font-bold');
});

const currentPage = window.location.pathname.split('/').pop() || 'product.html';

navLinks.forEach(link => {
  const linkHref = link.getAttribute('href');
  
  if (linkHref === currentPage) {
    link.classList.add('bg-violet-100', 'text-violet-700', 'font-bold');
  }
});





const loadProducts = async()=>{
    const url="https://fakestoreapi.com/products"
    const res=await fetch(url);
    const products= await res.json();

  displayTrends(products)
}

loadProducts()


const displayTrends=(products)=>{
    //console.log(products);
   const trendContainer = document.getElementById("our-product")
   trendContainer.innerHTML=""

  

   for(let product of products){
     const div = document.createElement("div")
     div.innerHTML=`
    <div class="card bg-base-700 w-96 h-[600px] shadow-sm">
  <figure class="bg-gray-500">
    <img class="h-[300px]"
      src="${product?.image}"
       />
  </figure>
  <div class="card-body">
   <div class="flex justify-between  items-center">
      <div class="badge badge-primary">${product?.category}</div>
    <div class=""><span><i class="fa-solid fa-star" style="color: rgba(115, 45, 152, 1.00);"></i></span> ${product.rating.rate} <span>(${product.rating.count})</span> </div>
   </div>
 
     <p class="text-xl font-semibold italic mb-2">${product.title}</p>
     <p class="text-2xl font-bold mb-4">$${product.price}</p>
   
   <div class="card-actions flex flex-row justify-between gap-2">
  <button onclick=loadProductDetails(${product?.id}) class="btn btn-outline shadow-xl flex-1">
   <i class="fa-regular fa-eye" style="color: rgba(115, 45, 152, 1.00);"></i>
    Details
  </button>
  <button class="btn bg-violet-700 shadow-xl btn-outline flex-1">
  <i class="fa-solid fa-cart-shopping" style="color: rgba(140, 140, 140, 1.00);"></i>
    Add
  </button>
</div>
  </div>
</div>
     
     `

     trendContainer.append(div)
   }
    
}

const loadCategory=async()=>{
    const url= "https://fakestoreapi.com/products/categories"
    const res=await fetch(url);
    const categories=await res.json();
   // console.log(categories);
    displayCategory(categories)
}
loadCategory()

const displayCategory = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = `
        <button onclick="filterByCategory('all')" class="btn btn-primary">All</button>
    `;
    
    categories.forEach(category => {
        const button = document.createElement("button");
        button.setAttribute("onclick", `filterByCategory("${category}")`);
        button.className = "btn btn-outline";
        button.textContent = category;
        categoryContainer.appendChild(button);
    });
}




const filterByCategory=async(category)=>{
    // DO fetch using thi categroy dynamically

    let url;
     if(category=='all'){
      url=`https://fakestoreapi.com/products`
     }

    else{
      url = `https://fakestoreapi.com/products/category/${category}`
    }


     
    const res = await fetch(url);
    const data = await res.json();
    const categoryContainer = document.getElementById("our-product")
    categoryContainer.innerHTML="";

    console.log(data);
  
    data.forEach((cat) => {
  
 const card = document.createElement("div")
  card.innerHTML=`
    <div class="card bg-base-700 w-96 h-[600px] shadow-sm">
  <figure class="bg-gray-500">
    <img class="h-[300px]"
      src="${cat?.image}"
       />
  </figure>
  <div class="card-body">
   <div class="flex justify-between  items-center">
      <div class="badge badge-primary">${cat?.category}</div>
    <div class=""><span><i class="fa-solid fa-star" style="color: rgba(115, 45, 152, 1.00);"></i></span> ${cat.rating.rate} <span>(${cat.rating.count})</span> </div>
   </div>
 
     <p class="text-xl font-semibold italic mb-2">${cat.title}</p>
     <p class="text-2xl font-bold mb-4">$${cat.price}</p>
   
   <div class="card-actions flex flex-row justify-between gap-2">
  <button onclick=loadProductDetails(${cat?.id}) class="btn btn-outline shadow-xl flex-1">
   <i class="fa-regular fa-eye" style="color: rgba(115, 45, 152, 1.00);"></i>
    Details
  </button>
  <button class="btn bg-violet-700 shadow-xl btn-outline flex-1">
  <i class="fa-solid fa-cart-shopping" style="color: rgba(140, 140, 140, 1.00);"></i>
    Add
  </button>
</div>
  </div>
</div>
     
  `
 
 categoryContainer.append(card);

  })



}


const loadProductDetails=async(id)=>{
  const url=`https://fakestoreapi.com/products/${id}`;
   const res = await fetch(url);
   const details = await res.json();

   displayProductDetails(details)
  }


// {
//   "id": 3,
//   "title": "Mens Cotton Jacket",
//   "price": 55.99,
//   "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
//   "category": "men's clothing",
//   "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
//   "rating": {
//     "rate": 4.7,
//     "count": 500
//   }
// }


const displayProductDetails=(details)=>{
   const detailBox=document.getElementById("details-container");
   detailBox.innerHTML=`
<div class="space-y-6">
   <div class="border-b pb-4">
      <h2 class="text-3xl font-bold mb-2">${details.title}</h2>
      <div class="flex items-center gap-3">
         <span class="text-3xl font-bold text-violet-700">$${details.price}</span>
         <div class="badge badge-lg badge-primary">${details.category}</div>
      </div>
   </div>

   <div class="flex items-center gap-3 bg-base-200 p-4 rounded-lg">
      <div class="flex items-center gap-2">
         <i class="fa-solid fa-star text-yellow-500 text-xl"></i>
         <span class="text-2xl font-bold">${details.rating.rate}</span>
      </div>
      <span class="text-gray-600">Based on ${details.rating.count} reviews</span>
   </div>

   <div>
      <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
         <i class="fa-solid fa-circle-info text-violet-700"></i>
         Product Description
      </h3>
      <p class="text-gray-700 leading-relaxed">${details.description}</p>
   </div>
   
   <div class="flex justify-center bg-gray-100 p-6 rounded-lg">
      <img src="${details.image}" alt="${details.title}" class="h-64 object-contain">
   </div>
   

   <div class="flex gap-3 pt-4">
      <button class="btn btn-primary flex-1">
         <i class="fa-solid fa-cart-shopping"></i>
         Add to Cart
      </button>
      <button class="btn btn-outline flex-1">
         <i class="fa-solid fa-heart"></i>
         Add to Wishlist
      </button>
   </div>
</div>
   
   `

   console.log(details);

    document.getElementById("word_modal").showModal();
}