let data = [
    {
        "id": 0,
        "name": "肥宅心碎賞櫻3日",
        "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
        "area": "高雄",
        "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
        "group": 87,
        "price": 1400,
        "rate": 10
    },
    {
        "id": 1,
        "name": "貓空纜車雙程票",
        "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台北",
        "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
        "group": 99,
        "price": 240,
        "rate": 2
    },
    {
        "id": 2,
        "name": "台中谷關溫泉會1日",
        "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台中",
        "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
        "group": 20,
        "price": 1765,
        "rate": 7
    }
];


// level 1: 把 data 陣列資料串到 card 內

const cardSection = document.querySelector(".ticketCard-area");

function render(city){
  // console.log(city)
  let cardInfo = ""

  const selectedAreaData = data.filter(function(item){

    if(item['area'] === city){
      
      return item

    } else if(!city){

      return item

    }

  })

  // console.log(selectedAreaData)

  selectedAreaData.forEach(function(item, index){

    cardInfo += `
    <li class="ticketCard">
            <div class="ticketCard-img">
              <a href="#">
                <img src="${item.imgUrl}" alt="">
              </a>
              <div class="ticketCard-region">${item.area}</div>
              <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3>
                  <a href="#" class="ticketCard-name">${item.name}</a>
                </h3>
                <p class="ticketCard-description">
                  ${item.description}
                </p>
              </div>
              <div class="ticketCard-info">
                <p class="ticketCard-num">
                  <span><i class="fas fa-exclamation-circle"></i></span>
                  剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                </p>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">${item.price}</span>
                </p>
              </div>
            </div>
          </li>
    `

    // 顯示目前卡片數量
    const selectedCardNum = document.querySelector("#searchResult-text");
    let updatedCardNum = `本次搜尋共 ${index + 1} 筆資料`;
    selectedCardNum.textContent = updatedCardNum;

  })


  cardSection.innerHTML = cardInfo;
  
  
}

render();


// level 3: 要有新增卡片功能，且下拉選單有地區篩選功能

// 新增卡片按鈕：
// 用 addEventListener 觸發 click 事件
// 陣列的 push 將新增的資料推到 data 陣列中

const addCardBtn = document.querySelector(".addTicket-btn");

function addNewCard(){

  const name = document.querySelector("#ticketName");
  const imgUrl = document.querySelector("#ticketImgUrl");
  const area = document.querySelector("#ticketRegion");
  const productDescription = document.querySelector("#ticketDescription");
  const productAmount = document.querySelector("#ticketNum");
  const ticketPrice = document.querySelector("#ticketPrice");
  const productRate = document.querySelector("#ticketRate");
 

data.push({

  id: Date.now(),
  name: name.value,
  imgUrl: imgUrl.value,
  area: area.value,
  price: Number(ticketPrice.value),
  group: Number(productAmount.value),
  rate: Number(productRate.value),
  description: productDescription.value  

})

// console.log(data)
render();

const form = document.querySelector(".addTicket-form");
form.reset();

}


// 篩選卡片地區
// 用事件監聽的 change 抓出地區的 regionSearch 的 value
const filterBtn = document.querySelector(".regionSearch");

filterBtn.addEventListener('change', selectedArea);

function selectedArea(){
  // console.log(filterBtn.value)
  render(filterBtn.value);

}




// 呼叫函式
// 用 click 事件增加一張卡片
addCardBtn.addEventListener('click', addNewCard);
