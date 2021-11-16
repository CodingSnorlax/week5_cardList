let data = []
// console.log(data, 'first')
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(function (response) {
    // console.log(response.data.data)
    data = response.data.data;
    console.log(data)
    showCardInfo();
    // 想請問助教，我這邊第8行寫 showCardInfo(); 跟寫 showCardInfo(data); 有不一樣嗎 
  });

// 宣告變數：卡片區塊
const ticketCardArea = document.querySelector('.ticketCard-area');

function showCardInfo(selectedArea){

  const newData = data.filter(function(item){

    if(selectedArea === item['area']){
      return item
    }

    if(!selectedArea){
      return item
    }

  })


  let ticketCardContent = '';

  newData.forEach(function(item){
    // console.log(item.rate)
    ticketCardContent += `<li class="ticketCard">
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
                  TWD <span id="ticketCard-price">$${item.price}</span>
                </p>
              </div>
            </div>
          </li>`
    ticketCardArea.innerHTML = ticketCardContent;
    
  })

  const searchResultAmount = document.querySelector('#searchResult-text');
  let cardAmount = ''
  cardAmount = `本次搜尋共 ${newData.length} 筆資料`
  searchResultAmount.textContent = cardAmount;

}
// 宣告變數：新增套票按鈕
const addTicketBtn = document.querySelector('.addTicket-btn');

// 在新增套票按鈕上綁定監聽事件：
addTicketBtn.addEventListener('click', addCard)

// 宣告變數：各個 input 欄位
const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketRegion  = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector('#ticketDescription');

function addCard(){

  data.push({

    "id": Date.now(),
    "name": ticketName.value,
    "imgUrl": ticketImgUrl.value,
    "area": ticketRegion.value,
    "price": ticketPrice.value,
    "group": ticketNum.value,
    "rate": ticketRate.value,
    "description": ticketDescription.value,

  })

  // 宣告變數：範圍是整個表單
  const wholeInputList = document.querySelector('.addTicket-form')
  // 重置表單
  wholeInputList.reset();

  showCardInfo();

}

// 宣告變數：下拉選單
const regionSelector = document.querySelector('.regionSearch')
// 綁定事件：change
regionSelector.addEventListener('change', function(){

  showCardInfo(regionSelector.value)

})