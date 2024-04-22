function convertToVietnameseCurrency(number) {
    return number.toLocaleString('vi', {style: 'currency', currency: 'VND'});
}
var url = "https://script.google.com/macros/s/AKfycbyC2LFttLv9D9cBnWC9x3sPvu5N4XnhgwR0LCqimqHb4TGfzKqMx9eoXnZJKvjILAE/exec";
var fullUrl = window.location.href;
var questionMarkIndex = fullUrl.indexOf('?');
var dataDetail = null
var specification = null
var prices = 0;
var urlBeforeQuestionMark = questionMarkIndex !== -1 ? fullUrl.substring(0, questionMarkIndex) : fullUrl;
function getUrlParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

var codeValue = getUrlParameter('code');
var sizevalue = getUrlParameter('size');
var number = getUrlParameter('number');
var itemType  = getUrlParameter('type');

var guaranteeValue = getUrlParameter('guarantee');

loading("show");
fetch(url+'?action=getdetailitem&item_type='+itemType+'&item_code='+codeValue+'&size='+sizevalue)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    var item = data.data.item_detail
    dataDetail = item
    var specifications = item.specifications
    var specification = specifications[0]
    var imgElement = document.getElementById('image-item');
    imgElement.src = item.image[0];

    var itemName = document.getElementById('item-name');
    itemName.textContent = item.item_name;

    var description = document.getElementById('description');
    description.textContent = specification.item_description.value;

    var totalNumber = document.getElementById('total-number');
    totalNumber.textContent = number

    var detail = document.getElementById('detail');
    detail.href  = "detail.html?code="+codeValue+'&size='+sizevalue + '&type='+itemType

    var guarantee = document.getElementById('guarantee');
    guarantee.textContent = guaranteeValue + " tháng"
    if(specification){
      specification.guarantee.forEach(element => {
        if (element.name == guaranteeValue) {
          prices =element.value
        }
      });

      let salePrice = (specification.item_sale_price && specification.item_sale_price.value) ? specification.item_sale_price.value : 0;
      
      var totalPrice = document.getElementById('total-price');
      totalPrice.textContent = convertToVietnameseCurrency(number * (prices + salePrice))
      loading("hide");
    }
  })
  .catch(error => {
    loading("hide");
    console.error('There was a problem with the fetch operation:', error);
  });

  function sendOrderButton() {
    var name = document.getElementById('name').value;
    var phoneNumber = document.getElementById('phone-number').value;
    var address = document.getElementById('address').value;
    var message = document.getElementById('message').value;
    if (name != '' && phoneNumber != '' && address != '') {
      loading("show");
        fetch(url+'?action=insert&customer_name='+name+'&phone_number='+phoneNumber+'&item_name='+dataDetail.item_name+'&quantity='+number+'&price='+(number * prices)+'&item_code='+dataDetail.item_code+'&address='+address+'&note='+message + '&guarantee_month='+guaranteeValue + 'tháng')
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
      window.location.href = "index.html";
    }, 2000);
}

/**
 * Xử lý bật tắt loading
 * @param {*} mode 
 */
function loading(mode){
  if(mode == "show"){
      $('.loading').addClass("element-show");
      $('.loading').removeClass("element-hide");
  }else{
      $('.loading').removeClass("element-show");
      $('.loading').addClass("element-hide");
  }
}
/**
 * Quay về trang chủ
 */
$('.company-name').on('click',function (event) {
  window.location.href = "index.html";
});

var form = document.getElementById('contactForm');
form.addEventListener('submit', function(event) {
  event.preventDefault();
});