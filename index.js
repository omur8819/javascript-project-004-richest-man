const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data=[];
for(let i=0;i<4;i++){
    getRandomUser()
}
// getRandomUser();
// getRandomUser();
// getRandomUser();
// getRandomUser();
//fetch random user and add money
async function getRandomUser() {
     const res=await fetch('https://randomuser.me/api');
     const data= await res.json();
     console.log(data);
    const user=data.results[0];
    // console.log(user);
    const newUser={
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()*1000000)
    }
    // console.log(newUser);
    addData(newUser);
    
}
//Double eveyones money
function doubleMoney() {
    data=data.map(user=>{
        return {...user,money:user.money*2};
    })
    // console.log(data);
    updateDom()
}

//Show Only Millionaires
function  showMillionaires() {
   data= data.filter(user=>user.money>1000000);
    updateDom();
}
//Short by Richest
function  sortByRichest() {
    data.sort((a,b)=>b.money-a.money)
    updateDom();
    
}
//Calculate entire Wealth
function  calculateWealth() {
    const wealth=data.reduce((acc,user)=>(acc +=user.money),0);
    const wealthElement=document.createElement('div');
    // wealthElement.classList.add('person');
    wealthElement.innerHTML=`<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthElement)

    
}
//Add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDom()
    
}
//Update DOM
function updateDom(providedData=data) {
    //Clear main div
    main.innerHTML=` <h2><strong>Person</strong> Wealth</h2>`
    providedData.forEach(item=>{
        const element=document.createElement('div');
        element.classList.add('person');
        element.innerHTML=`<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element)
    })
    
}
//Format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    
}
//Event listeners
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
