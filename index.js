
const navLinks = document.querySelectorAll('.menu a');
navLinks.forEach(link => {
  link.classList.remove('bg-violet-100', 'text-violet-700', 'font-bold');
});

const homeLinks = document.querySelectorAll('a[href="index.html"]');
homeLinks.forEach(link => {
  link.classList.add('bg-violet-100', 'text-violet-700', 'font-bold');
});

console.log("THis is from JS");

const loadProducts = async()=>{
    const url="https://fakestoreapi.com/products"
    const res=await fetch(url);
    const products= await res.json();

  displayTrends(products)
}

loadProducts()

//  {
//     "id": 1,
//     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     "price": 109.95,
//     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
//     "rating": {
//       "rate": 3.9,
//       "count": 120
//     }



const displayTrends=(products)=>{
    console.log(products);
   const trendContainer = document.getElementById("trend-section")
   trendContainer.innerHTML=""

   // Sort by rating and take top 3
   const topProducts = products
     .sort((a, b) => b.rating.rate - a.rating.rate)
     .slice(0, 3);

   for(let product of topProducts){
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
  <button  class="btn bg-violet-700 shadow-xl btn-outline flex-1">
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




const loadProductDetails=async(id)=>{
  const url=`https://fakestoreapi.com/products/${id}`;
   const res = await fetch(url);
   const details = await res.json();

   displayProductDetails(details)
  }

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
