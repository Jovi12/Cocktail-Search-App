const searchbtn=document.getElementById('search');
const searchbar=document.getElementById('searchbar');
const list=document.getElementById('introimage');
const title=document.getElementById('title');
const image=document.getElementById('image');
const ing=document.getElementById('ing');
const inst=document.getElementById('inst');
const box=document.getElementById('box');
const close=document.getElementById('close');

searchbtn.addEventListener('click', searchCocktails);

async function  searchCocktails(){
    const searchdata=searchbar.value.trim();
    if(searchdata ==='') return;

    const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchdata}`);
    const data = await response.json();
    if(data.drinks){
        data.drinks.forEach(item =>{
            const itembox=document.createElement('div');
            itembox.className='cocktail-box';
            itembox.style.marginBottom='40px';
            itembox.style.display='flex';
            itembox.style.flex='flex-wrap';
            itembox.style.justifyContent='center';
            itembox.style.width='300px';
            itembox.style.height='300px';
            itembox.style.flexDirection='column';
            
           
            itembox.innerHTML=`
              <img src="${item.strDrinkThumb}" alt="${item.strDrink}" >
              <p style="position:relative">${item.strDrink}</p>
            `;
            itembox.addEventListener('click',() => open(item));
            list.appendChild(itembox);
        });
    }
    else{
        list.innerHTML='no data found';
    }
function open(item){
        title.textContent=item.strDrink;
        image.src=item.strDrinkThumb;
        ing.textContent='';
        for(let i=1;i<=20;i++){
           if(item[`strIngredient${i}`]){
            let li= document.createElement("li");
            li.textContent=item[`strIngredient${i}`];
            ing.appendChild(li);

           }
        }
        inst.textContent=item.strInstructions;
        box.style.display='block';
    }
close.addEventListener('click',closebox);
function closebox(){
    box.style.display='none';
}
   
}
