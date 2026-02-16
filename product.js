
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
  <button class="btn btn-outline shadow-xl flex-1">
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
    console.log(categories);
    displayCategory(categories)
}
loadCategory()

const displayCategory = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = `
        <button class="btn btn-primary">All</button>
    `;
    
    categories.forEach(category => {
        const button = document.createElement("button");
        button.setAttribute("onclick", `filterByCategory("${category}")`);
        button.className = "btn btn-outline";
        button.textContent = category;
        categoryContainer.appendChild(button);
    });
}




const filterByCategory=(category)=>{
    console.log("this is category", category);
}