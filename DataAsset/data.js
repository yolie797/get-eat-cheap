export const Data = [{image:require('../assets/butter.png'),id:'0'},
                                 {image:require('../assets/cooking oil.jpg'),id:'1'},
                                 {image:require('../assets/maize.jpg'),id:'2'},
                                 {image:require('../assets/milk.jpg'),id:'3'},
                                 {image:require('../assets/raja.jpg'),id:'4'},
                                 {image:require('../assets/rice.jpg'),id:'5'},
                                 {image:require('../assets/spagetti.png'),id:'6'},
];

export const Shops = [{image:require('../assets/game.jpg'),id:'7'},
                      {image:require('../assets/makro.jpg'),id:'8'},
                      {image:require('../assets/picknpay.png'),id:'9'},
];

export const milk = [{image:require('../assets/cloverMilk.webp'),id:'10'},
                            {image:require('../assets/crytalMilk.webp'),id:'11'},
                            {image:require('../assets/fairCapeFullMilk.webp'),id:'12'},

]

export const milk2 = [ {image:require('../assets/fairCapeLowMilk.webp'),id:'13'},
{image:require('../assets/firstChoiceMilk.webp'),id:'14'},
{image:require('../assets/numelMilk.webp'),id:'15'},]

export const data = [
    {key:0,value:'Game',link:"http://scraper.mnisivee.com/get-game-products?search=",img:require('../assets/game.jpg')},
    {key:1,value:'PicknPay',link:"http://scraper.mnisivee.com/get-pnp-products?search=",img:require('../assets/picknpay.png')},
    {key:2,value:'Makro',link:"http://scraper.mnisivee.com/get-makro-products?search=",img:require('../assets/makro.jpg')},
  ]


let selectedStore =""
let selectedList =[]
let storeImg =''

export function setSelectedStore(storeLink){
    selectedStore = storeLink
}

export function getSelectedStore(){
    return selectedStore;
}

let budget = 0

export function getBudget() {
    
    return budget;
}

export function setStoreImg(img) {
    storeImg = img
}
export function getStoreImg() {
    return storeImg;
}
export function setBudgetAmt(userBudget) {
    budget = userBudget;

}

export function setSelectedList(myList){
    console.log(myList);
    selectedList.push(myList)
}

export function getSelectedList(){
    console.log(selectedList);
    return selectedList
}

export function getItemCount(){
    return selectedList.length
}
;