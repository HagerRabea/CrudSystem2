var nameInput=document.getElementById("productName");
var categoryInput=document.getElementById("productCategory");
var priceInput=document.getElementById("productPrice");
var descriptionInput=document.getElementById("productDescription");
var tbody=document.getElementById("tbody");
var error=document.getElementById("error");
var searshInput=document.getElementById("searchInput");
var alertInput=document.getElementById("alertNameInput");
var index="";

if(localStorage.getItem("productData")==null){
  var products=[];
}else{
 var products= JSON.parse(localStorage.getItem("productData"));
}
displayProduct();
function addProduct(){
 
  if(validationProductName()){

  if(nameInput.value==""||categoryInput.value==""||priceInput.value==""||descriptionInput.value==""){
    error.innerHTML="please fill all fields";
    nameInput.onclick=function(){
      error.innerHTML="";
    }
    categoryInput.onclick=function(){
      error.innerHTML="";
    }
    priceInput.onclick=function(){
      error.innerHTML="";
    }
    descriptionInput.onclick=function(){
      error.innerHTML="";
    }
  }
  else{
  var product={
     pname : nameInput.value,
     pcat : categoryInput.value,
     pprice : Number(priceInput.value),
     pdesc:descriptionInput.value
  } 

  products.push(product);
  localStorage.setItem("productData",JSON.stringify(products));
  displayProduct();
  clearProduct();
}}else{
  alert("ay haga");
}



  clearProduct();
}

function clearProduct(){
  nameInput.value="";
  categoryInput.value="";
  priceInput.value="";
  descriptionInput.value="";
}



function displayProduct(){
  var str="";
  for (var i=0; i<products.length; i++){
    str +=`<tr>
    <td>${i}</td>
    <td>${products[i].pname}</td>
    <td>${products[i].pcat}</td>
    <td>${products[i].pprice}</td>
    <td>${products[i].pdesc}</td>
    <td>
        <button class="btn btn-warning" onclick="update(${i})">      
          Update
        </button>
    </td>
    <td>
      <button class="btn btn-danger "   onclick="deleteProduct(${i})">
         </i>Delete
      </button>
  </td></tr>`
  }
  tbody.innerHTML=str;
}
var word="";
searshInput.addEventListener("keyup",function(){
     word=searshInput.value;
     searshProduct(word);
})
function searshProduct(word){
  var str="";

  // var color="";
  // for(var i=0; i<products.length; i++){
  //     if(products[i].pname[i]==searshInput.value[i]){
  //          color=color+(products[i].pname[i]);
  //     }
  //   }

  

  for(var i=0; i<products.length; i++){
    if(products[i].pname.includes(searshInput.value)){
      str +=`<tr>
      <td>${i}</td>
      <td>${products[i].pname.replace(word,`<span style="background-color: yellow;">${word}</span>`)}
      </td>
      <td>${products[i].pcat}</td>
      <td>${products[i].pprice}</td>
      <td>${products[i].pdesc}</td>
      <td>
          <button class="btn btn-warning" onclick="update(${i})">      
             Update
          </button>
      </td>
      <td>
        <button class="btn btn-danger"  onclick="deleteProduct(${i})">
            Delete
        </button>
    </td></tr>`
    }
  
  }
    tbody.innerHTML=str;
  }

  function deleteProduct(i){
    products= JSON.parse(localStorage.getItem("productData"));
    products.splice(i,1);
    localStorage.setItem("productData",JSON.stringify(products));
    displayProduct();
  }

  var button=document.getElementById("update");
  function update(k){
    nameInput.value=products[k].pname;
    categoryInput.value=products[k].pcat;
    priceInput.value=products[k].pprice;
    descriptionInput.value=products[k].pdesc;
  
   button.innerHTML="updat product";
   button.classList.add("btn-secondary", "text-white")
   button.onclick=function(){
    products= JSON.parse(localStorage.getItem("productData"));
   products[k].pname =nameInput.value;
    products[k].pcat=categoryInput.value;
    products[k].pprice=priceInput.value;
    products[k].pdesc=descriptionInput.value;
    localStorage.setItem("productData",JSON.stringify(products));
    displayProduct();
    clearProduct();
    button.innerHTML="add Product";
    button.classList.remove("btn-secondary", "text-white")
    button.onclick=function(){
      addProduct();
    }
   } 
  }
function validationProductName(){
  var rgex=/^[A-Z][a-z0-9 ]{3,10}$/;
  var isMatch=rgex.test(nameInput.value);
   if(isMatch){
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    alertInput.classList.add("d-none");
    button.removeAttribute("disabled");
    return true;
   }else{
     nameInput.classList.add("is-invalid");
     nameInput.classList.remove("is-valid");
     alertInput.classList.remove("d-none");
    //  button.setAttribute("disabled");
     return false;
   }
}
nameInput.addEventListener("blur",validationProductName);





  














