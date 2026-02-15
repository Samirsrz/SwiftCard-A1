console.log("This is from JS");

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
    <div class="card bg-base-100 w-96 h-[600px] shadow-sm">
  <figure>
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
  <button class="btn btn-outline shadow-xl flex-1">
    <i class="fa-thin fa-eye" style="color: rgba(115, 45, 152, 1.00);"></i> 
    Details
  </button>
  <button class="btn bg-violet-700 shadow-xl btn-outline flex-1">
   <i class="fa-chisel fa-regular fa-cart-shopping" style="color: rgba(115, 45, 152, 1.00);"></i>
    Add
  </button>
</div>
  </div>
</div>
     
     `

     trendContainer.append(div)
   }
    
}