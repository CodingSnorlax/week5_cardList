let data = []

  // axios start 

  axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
    .then(function (response) {
      data = response.data;
      render();
      // console.log(data)
    });

  // axios end

// 卡片區塊 從 data 取值帶入資料
const ticketCardSection = document.querySelector(".ticketCard-area")

// 帶入卡片資料
function render(selectedArea) {

  const newData = data.filter(function(item){

    if(selectedArea === item['area'] ){
      return item
    }

    if(!selectedArea){
      return item
    }

  })

      let cardInfo = "";

      // forEach 逐筆帶入字串資料
      newData.forEach(function (item) {

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
      TWD <span id="ticketCard-price">$${item.price}</span>
    </p>
  </div>
</div>
</li>`

        ticketCardSection.innerHTML = cardInfo;

        const cardAmount = document.querySelector('#searchResult-text');
        let cardAmontNumber = `本次搜尋共 ${newData.length} 筆資料`
        cardAmount.textContent = cardAmontNumber;

      })

}


// 宣告變數：在新增卡片按鈕上
const addCardBtn = document.querySelector('.addTicket-btn');

// btn 綁定 click 事件
addCardBtn.addEventListener('click', addCard);

// 宣告變數：表單上各欄位
const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketRegionSelector = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector('#ticketDescription')

function addCard() {

  // 將填入表單欄位內的 value 傳入 data
  // 傳入的資料要與目前的 data 內欄位結構一致

  data.push({

    id: Date.now(),
    name: ticketName.value,
    imgUrl: ticketImgUrl.value,
    area: ticketRegionSelector.value,
    price: ticketPrice.value,
    group: ticketNum.value,
    rate: ticketRate.value,
    description: ticketDescription.value

  })

  const ticketForm = document.querySelector('.addTicket-form')
  ticketForm.reset();

  render();

}

addCard();

// 綁定 change 事件
// 點選 selectAreaBtn 按鈕時，取得 area 的值
const selectAreaBtn = document.querySelector('.regionSearch');
selectAreaBtn.addEventListener('change', function(){
  
  render(selectAreaBtn.value);

})

// 下一版可考慮加寫簡單驗證