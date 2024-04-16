function convertToVietnameseCurrency(number) {
    return number.toLocaleString('vi', {style: 'currency', currency: 'VND'});
}
const url = "https://script.google.com/macros/s/AKfycbyUryPrV60u6FhQmt7CO6nRwBRxylG84LWV0C885UnIxHZoFfQfEFjrdCknqfsBze4/exec"
const radioOptions = []
var fullUrl = window.location.href;
var questionMarkIndex = fullUrl.indexOf('?');
var dataDetail = null
var specification = null

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
    specifications = item.specifications
    specifications.forEach(element => {
        if (!radioOptions.find(option => option.id === element.size)) {
            radioOptions.push({ id: element.size, label: element.size +" inches" });
        }
    });
    specification = specifications.filter(function(data) {
        return data.size == sizevalue;
    });
    specification = specification[0]
    var imgElement = document.getElementById('image-item');
    imgElement.src = item.image[0];

    var itemName = document.getElementById('item-name');
    itemName.textContent = item.item_name;

    var description = document.getElementById('description');
    description.textContent = specification.description;

    var totalNumber = document.getElementById('total-number');
    totalNumber.textContent = number

    var detail = document.getElementById('detail');
    detail.href  = "detail.html?code="+codeValue+'&size='+sizevalue
    
    var totalPrice = document.getElementById('total-price');
    totalPrice.textContent = convertToVietnameseCurrency(number * specification.sale_price)
    loading("hide");
  })
  .catch(error => {
    loading("hide");
    console.error('There was a problem with the fetch operation:', error);
  });

  function sendOrderButton() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phoneNumber = document.getElementById('phone-number').value;
    var address = document.getElementById('address').value;
    var message = document.getElementById('message').value;
    if (name != '' && email !== '' && phoneNumber != '' && address != '') {
      loading("show");
        fetch(url+'?action=insert&customer_name='+name+'&phone_number='+phoneNumber+'&item_name='+dataDetail.item_name+'&quantity='+number+'&price='+(number * specification.sale_price)+'&item_code='+dataDetail.item_code+'&address='+address+'&note='+message)
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