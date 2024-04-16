function convertToVietnameseCurrency(number) {
    return number.toLocaleString('vi', {style: 'currency', currency: 'VND'});
}
const url = "https://script.google.com/macros/s/AKfycbyT0UIYLArvCMuQZeiG0cYnCmDSiFterpvq1roE6sXSklprhWqVqp3S7NwYGBwtnlU/exec"
const radioOptions = []
var fullUrl = window.location.href;
var questionMarkIndex = fullUrl.indexOf('?');

var urlBeforeQuestionMark = questionMarkIndex !== -1 ? fullUrl.substring(0, questionMarkIndex) : fullUrl;
function getUrlParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

var codeValue = getUrlParameter('code');
var sizevalue = getUrlParameter('size');
const api1 = fetch(url +'?action=getitem&item_code='+codeValue)
console.log(url+'?action=getdetailitem&item_code='+codeValue+'&size='+sizevalue)
const api2 = fetch(url+'?action=getdetailitem&item_code='+codeValue+'&size='+sizevalue)
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
                                  '<a class="h6 text-decoration-none text-truncate" href="' + urlBeforeQuestionMark+'?code='+ item.item_code +'&size='+item.size+ '">' + item.item_name + ' - ' + item.size + ' inch' + '</a>' +
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
        console.log(item)
        var itemName = document.getElementById('item-name');
        itemName.textContent = item.item_name;
        specifications = item.specifications
        specifications.forEach(element => {
            if (!radioOptions.find(option => option.id === element.size)) {
                radioOptions.push({ id: element.size, label: element.size +" inches" });
            }
        });
        var specification = specifications.filter(function(data) {
            return data.size == sizevalue;
        });
        specification = specification[0]

        var description = document.getElementById('description');
        description.textContent = specification.description;

        var salePrice = document.getElementById('sale-price');
        salePrice.textContent = convertToVietnameseCurrency(specification.sale_price);

        var orgPrice = document.getElementById('org-price');
        orgPrice.textContent = convertToVietnameseCurrency(specification.org_price);

        var sellQuantity = document.getElementById('sell-quantity');
        sellQuantity.textContent = specification.sell_quantity;

        var descriptionDetail = document.getElementById('description-detail');
        descriptionDetail.textContent = specification.description_detail;

        var resolution = document.getElementById('resolution');
        resolution.textContent = specification.resolution;
        
        var view = document.getElementById('view');
        view.textContent = specification.view;

        var refreshRate = document.getElementById('refresh-rate');
        refreshRate.textContent = specification.refresh_rate;
        
        var power = document.getElementById('power');
        power.textContent = specification.power;

        var dimension = document.getElementById('dimension');
        dimension.textContent = specification.dimension;

        var outMemory = document.getElementById('out-memory');
        outMemory.textContent = specification.out_memory;

        var inMemory = document.getElementById('in-memory');
        inMemory.textContent = specification.in_memory;
        
        var cpu = document.getElementById('cpu');
        cpu.textContent = specification.cpu;

        var gpu = document.getElementById('gpu');
        gpu.textContent = specification.gpu;

        var soundTech = document.getElementById('sound-tech');
        soundTech.textContent = specification.sound_tech;
        
        var speakerPower = document.getElementById('speaker-power');
        speakerPower.textContent = specification.speaker_power;

        var weight = document.getElementById('weight');
        weight.textContent = specification.weight;

        var remainQuantity = document.getElementById('remain-quantity');
        if (specification.remain_quantity > 0) {
            remainQuantity.textContent = "Còn hàng"
            remainQuantity.style.color = 'limegreen';
        } else {
            remainQuantity.textContent = "Hết hàng"
            remainQuantity.style.color = 'red';
        }
        const parentDiv = document.getElementById("parentDiv");
        radioOptions.forEach(option => {
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.className = "custom-control-input";
            radioInput.id = option.id;
            radioInput.name = "inches";
            radioInput.value = option.id;
    
            const label = document.createElement("label");
            label.className = "custom-control-label";
            label.htmlFor = option.id;
            label.textContent = option.label;
    
            const div = document.createElement("div");
            div.className = "custom-control custom-radio custom-control-inline";
    
            div.appendChild(radioInput);
            div.appendChild(label);
    
            parentDiv.appendChild(div);
        });
        var displayinches = document.getElementById('display-inches');
        displayinches.style.setProperty("display", "block", "important");
        var radio = document.getElementById(specification.size);
        if (radio) {
            radio.checked = true;
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
    window.location.href = "contact.html?code="+codeValue+'&size='+sizevalue + '&number='+totalNumber;
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
    console.log(selectedValue)
});