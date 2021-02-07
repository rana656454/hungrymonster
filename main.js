
const getSearchValue = () =>{
    const searchValue = document.getElementById("search-input").value
    if(!searchValue){
        document.getElementById("row").innerHTML="<h1>You searched without typing anything. Please enter first then search.</h1>"
    }
    else{
   
    document.getElementById("row").innerHTML=""

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then(resp => resp.json())
    .then(data => { 
        const meals = data.meals
        meals.map(element => {
      
            const row1 = document.getElementById("row")
            const mealContainer = document.createElement("div")
            mealContainer.setAttribute("class","col col-style")
            const mealName = element.strMeal
            const mealImg = element.strMealThumb
            const mealId = element.idMeal
            
            const mealDiv = `<div class="card card-style" onclick="getmealDetails(${mealId})"  style="width: 14rem;"><img class="card-img-top" src="${mealImg}" alt="Card image cap">
                <div class="card-body"><h6 class="card-text">${mealName}</h6></div>`
                mealContainer.innerHTML=mealDiv
                row1.appendChild(mealContainer)
        })
    })
    .catch(error =>{
        document.getElementById("row").innerHTML="<h1>sorry Man no item for this search. plz try again</h1>"
        
    })
    
    }
}



//meal deatails function

const getmealDetails = (id) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(resp => resp.json())
    .then(data => {
        const meal = data.meals    
        meal.map(element=>{
            const mealImg = element.strMealThumb
           const mealdetailsContainer = document.createElement("div")             
           const mealdetailsDiv = `<div style="width: 23rem; height:300px">
           <img style="width: 400px; height:300px; border-radius:"10px"; margin-top:50px" src="${mealImg}" alt="Card image cap">
           <div class="card-body" style="width: 400px;">
             <h4 class="card-title">${element.strMeal}</h4><br>
             <h5>Ingredient</h5>
             <ul id="ingredient-list">
             </ul>
             <button class="btn btn-info" onclick="backSearch()" id="back-search">Go Search Bar</button>
           </div>
         </div>`
        // console.log(meal)

        mealdetailsContainer.innerHTML=mealdetailsDiv 
        document.getElementById("search-meal").appendChild(mealdetailsContainer)
        

        //inggredient & measure details
        const stringMeasure= "strMeasure"
        const stringIngredient = "strIngredient"
        for (let i = 1; i <= 20; i++) {
            const measure =  stringMeasure.concat(i)
            const ingredient = stringIngredient.concat(i)
            if(!element[ingredient]){
            }
            else{
                const ul = document.getElementById("ingredient-list")
                const li = document.createElement("li")
                 li.innerText=`${element[measure]} ${element[ingredient]} `
                 ul.appendChild(li)
               
            }
                    
        }

        document.getElementById("all-meals").style.display="none"
        })  
        
    })

}



// go back search function

const backSearch= () =>{
    document.getElementById("all-meals").style.display="block"
    document.getElementById("search-meal").innerHTML=""
    document.getElementById("row").innerHTML=""
    document.getElementById("search-input").value=""
}