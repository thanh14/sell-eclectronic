function convertToVietnameseCurrency(number) {
    console.log(number.toLocaleString('vi', {style: 'currency', currency: 'VND'}))
    return number.toLocaleString('vi', {style: 'currency', currency: 'VND'});
}
var url = "https://script.google.com/macros/s/AKfycbyC2LFttLv9D9cBnWC9x3sPvu5N4XnhgwR0LCqimqHb4TGfzKqMx9eoXnZJKvjILAE/exec";
const radioOptions = []
var fullUrl = window.location.href;
var questionMarkIndex = fullUrl.indexOf('?');
var listGuarantee = []
var urlBeforeQuestionMark = questionMarkIndex !== -1 ? fullUrl.substring(0, questionMarkIndex) : fullUrl;
function getUrlParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

var codeValue = getUrlParameter('code');
var sizevalue = getUrlParameter('size');
var itemType  = getUrlParameter('type');
const api1 = fetch(url +'?action=getitem')
const api2 = fetch(url+'?action=getdetailitem&item_type='+itemType+'&item_code='+codeValue+'&size='+sizevalue)
loading("show");
Promise.all([api1, api2]).then((values) => {
    const [listIteamSameType, itemDetail] = values;
    listIteamSameType.json().then((data) => {
        var listItems = data.data.lst_item
        const randomProducts = listItems.sort(() => Math.random() - 0.5).slice(0, 6);
        var productContainer = document.getElementById("productContainer");
        productContainer.innerHTML = '';
        randomProducts.forEach(function(item) {
          var productHtml = '<div class="col-lg-2 col-md-4 col-sm-6 pb-1">' +
                              '<div class="product-item bg-light mb-4">' +
                                '<div class="product-img position-relative overflow-hidden">' +
                                  '<img class="img-fluid w-100" src="' + item.image[0] + '" alt="' + item.item_name + '">' +
                                '</div>' +
                                '<div class="text-center py-4">' +
                                  '<a class="h6 text-decoration-none text-truncate" href="' + urlBeforeQuestionMark+'?code='+ item.item_code +'&size='+item.size+'&type='+item.item_type+ '">' + item.item_name  + '</a>' +
                                  '<div class="d-flex align-items-center justify-content-center mt-2">' +
                                    '<h5>' + item.sale_price + '</h5><h6 class="text-muted ml-2"><del>' + item.org_price + '</del></h6>' +
                                  '</div>' +
                                '</div>' +
                              '</div>' +
                            '</div>';
          productContainer.innerHTML += productHtml;
        });

        return itemDetail.json();

    }).then((data) => {
        var lisData = data.data
        var item = lisData.item_detail;
        var itemName = document.getElementById('item-name');
        itemName.textContent = item.item_name;
        var specification = item.specifications[0]
        var tbodyElement = document.querySelector("tbody");
        Object.entries(specification).forEach(element => {
            if (element[0] == "item_sale_price" || element[0] == "item_org_price" ||
            element[0] == "guarantee" || element[0] == "item_description" ||
            element[0] == "item_description_detail" || element[0] == "item_remain_quantity" ||  element[0] == "item_sell_quantity"
            ) {
                return;
            }
            var trElement = document.createElement("tr");
            var tdKey = document.createElement("td");
            tdKey.textContent = element[1].name;
            var tdValue = document.createElement("td");
            tdValue.textContent = element[1].value
            trElement.appendChild(tdKey);
            trElement.appendChild(tdValue);
            tbodyElement.appendChild(trElement);
        })
        var selectElement = document.getElementById("guarantee");
        listGuarantee = specification.guarantee
        listGuarantee.forEach(element => {
            var optionElement = document.createElement("option");
            optionElement.textContent = element.name + " tháng";
            optionElement.value = element.name
            selectElement.appendChild(optionElement);
        })
        var description = document.getElementById('description');
        description.textContent = specification.item_description.value;

        var salePrice = document.getElementById('sale-price');
        salePrice.textContent = convertToVietnameseCurrency(listGuarantee[0]?.value ?? specification.item_sale_price.value);

        var orgPrice = document.getElementById('org-price');
        orgPrice.textContent = convertToVietnameseCurrency(specification.item_org_price.value);

        var sellQuantity = document.getElementById('sell-quantity');
        sellQuantity.textContent = specification.item_sell_quantity.value;

        var descriptionDetail = document.getElementById('description-detail');
        descriptionDetail.textContent = specification.item_description_detail.value;

        var remainQuantity = document.getElementById('remain-quantity');
        if (specification.item_remain_quantity.value > 0) {
            remainQuantity.textContent = "Còn hàng"
            remainQuantity.style.color = 'limegreen';
        } else {
            remainQuantity.textContent = "Hết hàng"
            remainQuantity.style.color = 'red';
        }
        var listImage = item.image
        const imageCarousel = document.getElementById('imageCarousel');

        listImage.forEach(image => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (image === listImage[0]) {
                carouselItem.classList.add('active');
            }
            const img = document.createElement('img');
            img.classList.add('w-100', 'h-100');
            img.src = image;

            carouselItem.appendChild(img);
            imageCarousel.appendChild(carouselItem);
            var imageCarouselDisplay = document.getElementById('product-carousel');
            imageCarouselDisplay.style.display = "block"
        });
    }).then(() => {
        var radioButtons = document.querySelectorAll('input[type=radio][name="inches"]');
            radioButtons.forEach(function(radioButton) {
                radioButton.addEventListener('click', function() {
                    if (this.value == sizevalue) return
                    window.location.href = urlBeforeQuestionMark + '?code='+codeValue+'&size='+this.value;
                });
            });
            setTimeout(() => {
                loading("hide");
            }, 0);
    })
});

function buyProduct() {
    var totalNumber = document.getElementById('total-number').value;
    var selectElement = document.getElementById("guarantee");

    window.location.href = "contact.html?type="+ itemType+ "&code="+codeValue+'&size='+sizevalue + '&number='+totalNumber + '&guarantee='+selectElement.value ;
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

$('#guarantee').on('change', function(){
    var selectedValue = $(this).val();
    var salePrice = document.getElementById('sale-price');
    listGuarantee.forEach(element => {
        if (element.name == selectedValue) {
            selectedValue = element.value
        }
    })
    salePrice.textContent = convertToVietnameseCurrency(parseInt(selectedValue));
});