let data = []
// console.log(data, 'first')
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(function (response) {
    // console.log(response.data.data)
    data = response.data.data;
    console.log(data)
    showCardInfo();
  });

// 宣告變數：卡片區塊
const ticketCardArea = document.querySelector('.ticketCard-area');

function showCardInfo(selectedArea) {

  const newData = data.filter(function (item) {

    if (selectedArea === item['area']) {
      return item
    }

    if (!selectedArea) {
      return item
    }

  })


  let ticketCardContent = '';

  newData.forEach(function (item) {
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

// 在新增套票按鈕上綁定監聽事件，卡片欄位確認OK後才會通過新增卡片：
addTicketBtn.addEventListener('click', checkCardInfo)
// addTicketBtn.addEventListener('click', addCard)

// 宣告變數：各個 input 欄位
const ticketName = document.querySelector('#ticketName');
const ticketImgUrl = document.querySelector('#ticketImgUrl');
const ticketRegion = document.querySelector('#ticketRegion');
const ticketPrice = document.querySelector('#ticketPrice');
const ticketNum = document.querySelector('#ticketNum');
const ticketRate = document.querySelector('#ticketRate');
const ticketDescription = document.querySelector('#ticketDescription');

// 簡單驗證：欄位不得為空白

function checkCardInfo() {

  if (!ticketName.value || ticketName.value.length < 5) {
    alert('請確認您的套票名稱')
  } else if (!ticketImgUrl.value || ticketImgUrl.value.length < 7) {
    alert('請確認您的圖片網址！')
  } else if (!ticketRegion.value) {
    alert('請選擇景點地區')
  } else if (!ticketPrice.value) {
    alert('請確認您的套票金額')
  } else if (!ticketNum.value) {
    alert('請確認您的套票組數')
  } else if (ticketRate.value < 1 || ticketRate.value > 10) {
    alert('套票星級必須介於 1 ~ 10')
  } else if (!ticketDescription.value) {
    alert('套票描述不得為空白！')
  }else{
    addCard();
  }

}

// 增加卡片
function addCard() {

  data.push({

    "id": Date.now(),
    "name": ticketName.value,
    "imgUrl": ticketImgUrl.value,
    "area": ticketRegion.value,
    "price": Number(ticketPrice.value),
    "group": Number(ticketNum.value),
    "rate": Number(ticketRate.value),
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
regionSelector.addEventListener('change', function () {

  showCardInfo(regionSelector.value)

})