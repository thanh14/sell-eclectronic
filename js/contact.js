function convertToVietnameseCurrency(number) {
    return number.toLocaleString('vi', {style: 'currency', currency: 'VND'});
}
const url = "https://script.google.com/macros/s/AKfycbwVJPIqDjsosex0vx6g2BghW7SDy2pM9os1cdj8T9xIl4zWPNngdppxUAtlJTpnBvY/exec"
const radioOptions = []
var fullUrl = window.location.href;
var questionMarkIndex = fullUrl.indexOf('?');
var dataDetail = null
var urlBeforeQuestionMark = questionMarkIndex !== -1 ? fullUrl.substring(0, questionMarkIndex) : fullUrl;
function getUrlParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

var codeValue = getUrlParameter('code');
var sizevalue = getUrlParameter('size');
var number = getUrlParameter('number');
loading("show");
fetch(url+'?action=getdetailitem&item_code='+codeValue+'&size='+sizevalue)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data.data.item_detail);
    var item = data.data.item_detail
    dataDetail = item
    var imgElement = document.getElementById('image-item');
    imgElement.src = item.image[0];

    var itemName = document.getElementById('item-name');
    itemName.textContent = item.item_name;

    var description = document.getElementById('description');
    description.textContent = item.description;

    var totalNumber = document.getElementById('total-number');
    totalNumber.textContent = number

    var totalPrice = document.getElementById('total-price');
    totalPrice.textContent = convertToVietnameseCurrency(number * item.sale_price)
    loading("hide");

  })
  .catch(error => {
    loading("hide");
    console.error('There was a problem with the fetch operation:', error);
  });

  function sendOrderButton() {
    var name = document.getElementById('name').value;
    console.log(name)
    var email = document.getElementById('email').value;
    var phoneNumber = document.getElementById('phone-number').value;
    var address = document.getElementById('address').value;
    var message = document.getElementById('message').value;
    if (name != '' && email !== '' && phoneNumber != '' && address != '') {
      loading("show");
        fetch(url+'?action=insert&customer_name='+name+'&phone_number='+phoneNumber+'&item_name='+dataDetail.item_name+'&quantity='+number+'&price='+number * dataDetail.sale_price+'&item_code='+dataDetail.item_code+'&address='+address+'&note='+message)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      loading("hide");
          return response.json();
        })
        .then(data => {
            if (data.result == "success") {
                showSuccessModal();
            }
            loading("hide");
        })
        .catch(error => {
          loading("hide");
          console.error('There was a problem with the fetch operation:', error);
        });
    }
}

function showSuccessModal() {
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
  myModal.show();
  setTimeout(function() {
      myModal.hide();
      window.location.href = "detail.html?code="+codeValue+'&size='+sizevalue;
    }, 2000);
}

/**
 * Xử lý bật tắt loading
 * @param {*} mode 
 */
function loading(mode){
  if(mode == "show"){
      $('.loading').addClass("element-show");
  }else{
      $('.loading').addClass("element-hide");
  }
}

/**
 * Quay về trang chủ
 */
$('.company-name').on('click',function (event) {
  window.location.href = "index.html";
});
