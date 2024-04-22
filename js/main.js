function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}


var lstItem = [];
var lstItemFilter = [];
var paramFilter = [];
(function ($) {
    "use strict";

    var url = "https://script.google.com/macros/s/AKfycbyC2LFttLv9D9cBnWC9x3sPvu5N4XnhgwR0LCqimqHb4TGfzKqMx9eoXnZJKvjILAE/exec";
    var ul = document.querySelector('.paging');
    var allPages = 15;
    var lstItemDisplay = [];
    var totalItem = 0;
    var currentPage = 1;
    var pageSize = 24;
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);

        getGeneralInfo();
        getListItem();
    });

    /**
     * Lấy danh sách hàng hóa
     */
    async function getListItem(){
        try {
            getListBanner()
            let urlGetItem = url + "?action=getitem";
            loading("show");
            let res = await $.ajax({
                url: urlGetItem
            });
            loading("hide");
            if(res) {
                if(res && res.data && res.data.lst_item && res.data.lst_item.length){
                    lstItem = JSON.parse(JSON.stringify(res.data.lst_item));
                    totalItem = res.data.lst_item.length;
                    $('.wait-minutes').addClass("element-hide");

                    pagingData(1);
                }
            }
        } catch (error) {
            loading("hide");
            console.log(error);
        }
        
    };

    async function getListBanner(){
        try {
            let urlGetItem = url + "?action=getbanner";
            let res = await $.ajax({
                url: urlGetItem
            });
            if(res) {
                if(res && res.data && res.data.lst_item && res.data.lst_item.images.length){
                    var listBanner = JSON.parse(JSON.stringify(res.data.lst_item.images));
                    var carouselInner = document.querySelector("#header-carousel .carousel-inner");

                    listBanner.forEach(function(imageSrc, index) {
                        var carouselItem = document.createElement("div");
                        carouselItem.classList.add("carousel-item", "position-relative");
                        carouselItem.style.height = "540px";

                        if (index === 0) {
                            carouselItem.classList.add("active");
                        }

                        var image = document.createElement("img");
                        image.classList.add("position-absolute", "top-50", "start-50", "translate-middle");
                        image.src = imageSrc;
                        image.style.objectFit = "cover";

                        carouselItem.appendChild(image);
                        carouselInner.appendChild(carouselItem);
                    });

                    var carouselIndicators = document.querySelector("#header-carousel .carousel-indicators");

                    // carouselData.forEach(function(_, index) {
                    //     var indicator = document.createElement("li");
                    //     indicator.setAttribute("data-target", "#header-carousel");
                    //     indicator.setAttribute("data-slide-to", index.toString());
                    //     if (index === 0) {
                    //         indicator.classList.add("active");
                    //     }
                    //     carouselIndicators.appendChild(indicator);
                    // });
                }
            }
        } catch (error) {
            console.log(error);
        }
        
    };



    /**
     * Lấy thông tin chung
     */
    function getGeneralInfo(){

    };
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    /**
     * format số tiền
     * @param {*} money 
     * @returns 
     */
    function formatMoney(number, decimalPoint = '.'){
    //    const pieces = parseFloat(money).toFixed().split('')
    //    let ii = pieces.length - 3
    //    while ((ii-=3) > 0) {
    //      pieces.splice(ii, 0, ',')
    //    }
    //    return pieces.join('')

    const pieces = parseFloat(number).toFixed(0).split('')
       let ii = pieces.length - 3;
       pieces.reverse();
       for(let i = pieces.length - 1; i >= 0; i--){
          if(i%3 == 0 && i != 0){
             pieces.splice(i, 0, decimalPoint)
          }
       }
       pieces.reverse();
       return pieces.join('')
    }
    
    /**
     * format số lượng
     * @param {*} number 
     * @returns 
     */
     function formatNumber(number, decimalPoint = '.'){
       const pieces = parseFloat(number).toFixed(0).split('')
       let ii = pieces.length - 3;
       pieces.reverse();
       for(let i = pieces.length - 1; i >= 0; i--){
          if(i%3 == 0 && i != 0){
             pieces.splice(i, 0, decimalPoint)
          }
       }
       pieces.reverse();
       return pieces.join('')
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
     * Xử lý phân trang hiển thị sản phẩm
     * @param {*} pageIndex 
     * @returns 
     */
    function pagingData(pageIndex, listItemFilter){
        loading("show");
        if(pageIndex <= 0){
            pageIndex = 1;
        }
        if(totalItem - (pageIndex - 1)*pageSize <= 0){
            return;
        }
        currentPage = pageIndex;
        let startIndex = 0,
        endIndex = 19;
        startIndex = pageIndex == 1 ? 0 : (pageIndex*pageSize - pageSize);
        endIndex = pageIndex == 1 ? pageSize : pageIndex*pageSize;
        elem(Math.floor(totalItem/pageSize) + 1, pageIndex);
        console.log(lstItem)
        if (listItemFilter != null) {
            lstItemDisplay = listItemFilter.slice(startIndex, endIndex);
        } else {
            lstItemDisplay = lstItem.slice(startIndex, endIndex);
        }

        
        $("div.lst-item div").remove();
        lstItemDisplay.forEach(item => {
            var itemName = item.item_name
            if (item.item_type == "TV") {
                itemName = item.item_name + " - " + item.size+ " inchs" 
            }
            let itemHTML = `<div code=` + item.item_code  + ` type=` + item.item_type + ` size=` + item.size + ` class="col-lg-2 col-md-3 col-sm-4 col-6 pb-1 item-box">
                                <div class="product-item bg-light mb-4">
                                    <div class="product-img position-relative overflow-hidden">
                                        <img class="img-fluid w-100" src="`+ item.image[0] +`" alt="">
                                        <div class="product-action">
                                            <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                                            <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                            <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                            <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                                        </div>
                                    </div>
                                    <div class="text-center py-4">
                                        <div class="h6 item-name text-decoration-none text-truncate" href="">` + itemName + `</div>
                                        <div class="align-items-center mt-2">
                                            <h6 class="text-muted ml-2"><del>` + formatMoney(item.org_price) + `</del>
                                            <h5>` + formatMoney(item.sale_price) + `</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

            $(itemHTML).data('itemCode', item.item_code);
            $("div.lst-item").append(itemHTML);
                            
        });
        loading("hide");
    }

    /**
     * Sự kiện nhấn vào sản phẩm
     */
    $('.lst-item').on("click", ".item-box", function () {
        var recordId = this.getAttribute("code");
        var recordType = this.getAttribute("type");
        var recorSize = this.getAttribute("size");
        if (recorSize == "undefined") {
            window.location.href = "detail.html?type="+recordType+"&code="+recordId;
        } else 
        {
            window.location.href = "detail.html?type="+recordType+"&code="+recordId+"&size="+recorSize;
        }
   
        // console.log("Nơi xử lý mở trang chi tiết")
    })

    /**
     * Next trang
     */
    $('.btn-next').on('click',function (event) {
        pagingData(currentPage + 1);
    });

    /**
     * Trở về trang trước
     */
    $('.btn-previous').on('click', function () {
        pagingData(currentPage - 1);
    });

    /**
     * Chọn trang
     */
    $('.paging-numb').on("click", ".numb", function () {
        var recordId = $(this).data('recordId');
        pagingData(recordId);
    });
    
    /**
     * Quay về trang chủ
     */
    $('.company-name').on('click',function (event) {
    window.location.href = "index.html";
    });

    /**
     * Thực hiện đi đến trang được chọn
     * @param {*} allPages 
     * @param {*} page 
     */
    function elem(allPages, page){
        let beforePages = page - 1;
        let afterPages = page + 1;
        let liActive;
        $("div.paging-numb li").remove()
    
        if(page == 1){
            $('.btn-previous').addClass("element-hide");
            $('.btn-previous').removeClass("element-show");
        }else{
            $('.btn-previous').addClass("element-show");
            $('.btn-previous').removeClass("element-hide");
        }
    
        for (let pageLength = beforePages; pageLength <= afterPages; pageLength++){
    
            if(pageLength > allPages){
                continue;
            }
            if(pageLength == 0){
                pageLength = pageLength + 1;
            }
    
            if(page == pageLength){
                liActive = 'active';
            }else{
                liActive = '';
            }
            // let itemHTML = `<li class="numb` + liActive + `"><span>` + pageLength + `</span></li>`;
            $(".paging-numb").append($(`<li class="numb ${liActive}"><span>${pageLength}</span></li>`).data('recordId', pageLength));
        }
    
        if(totalItem - currentPage*pageSize <= 0){
            $('.btn-next').addClass("element-hide");
            $('.btn-next').removeClass("element-show");
        }else{
            $('.btn-next').addClass("element-show");
            $('.btn-next').removeClass("element-hide");
        }
    }
    
    $(document).ready(function(){
        $('#sel-category').on('change', function(){
            var selectedValue = $(this).val();
            var divSize = document.getElementById('div-size');
            var type =""
            switch(selectedValue) {
                case "tivi":
                    type = "TV"
                    divSize.style.display = "block"
                    break;
                case "tulanh":
                    type = "TL"
                    divSize.style.display = "none"
                    break;
                case "maygiat":
                    type = "MG"
                    divSize.style.display = "none"
                    break;
                case "dieuhoa":
                    type = "DH"
                    divSize.style.display = "none"
                    break;
                default:
                    divSize.style.display = "none"
              }
              if (isKeyExists(paramFilter, "category"))
              {
                  updateValueForKey(paramFilter,"category", type)
              } 
              else 
              {
                  paramFilter.push({key: "category", value: type})
              }
              search(paramFilter)
        });
        $('#sel-prices').on('change', function(){
            var selectedValue = $(this).val();
            var selectedValueArray = selectedValue.split('-');
            if (selectedValueArray.length > 1) {
                if (isKeyExists(paramFilter, "prices"))
                {
                    updateValueForKey(paramFilter,"prices", selectedValueArray)
                } 
                else 
                {
                    paramFilter.push({key: "prices", value: selectedValueArray})
                }
            } else {
                removeByKey(paramFilter, "prices")
            }
            search(paramFilter)
        });
        $('#sel-inches').on('change', function(){
            var selectedValue = $(this).val();
            if (selectedValue != "0") {
                if (isKeyExists(paramFilter, "size"))
                {
                    updateValueForKey(paramFilter,"size", selectedValue)
                } 
                else 
                {
                    paramFilter.push({key: "size", value: selectedValue})
                }
            } else {
                removeByKey(paramFilter, "size")
            }
            search(paramFilter)
        });

        $('#btn-search').on('click', function(){
            var searchValue = $('#input-search').val();
            if (isKeyExists(paramFilter, "search"))
            {
                updateValueForKey(paramFilter,"search", searchValue)
            } 
            else 
            {
                paramFilter.push({key: "search", value: searchValue})
            }
            search(paramFilter)
        });
    
        $('#input-search').on('keypress', function(event){
        if (event.which === 13) {
            var searchValue = $(this).val();
            lstItemFilter = lstItem.filter(function(item) {
            return item.item_name.toLowerCase().includes(searchValue.toLowerCase())
        });
            pagingData(1, lstItemFilter);
        }
        });

        function isKeyExists(array, keyToCheck) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].key === keyToCheck) {
                    return true;
                }
            }
            return false;
        }

        function updateValueForKey(array, keyToUpdate, newValue) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].key === keyToUpdate) {
                    array[i].value = newValue;
                    break;
                }
            }
        }

        function removeByKey(array, keyToRemove) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].key === keyToRemove) {
                    array.splice(i, 1);
                    break; 
                }
            }
        }


        function search(paramFilter) {
           lstItemFilter = lstItem
           if( paramFilter.length > 0) {
                paramFilter.forEach(element => {
                    if (element.key == "prices") {
                    if (element.value.length > 1) {
                            lstItemFilter = lstItemFilter.filter(function(item) {
                                return parseInt(item.sale_price) >= parseInt(element.value[0]*1000000) && parseInt(item.sale_price) <=  parseInt(element.value[1]*1000000);
                            });
                        }
                    }
                    if (element.key == "size") {
                        if (element.value != null) {
                            lstItemFilter = lstItemFilter.filter(function(item) {
                                return parseInt(item.size) == element.value
                            });
                        }
                    }
                    if (element.key == "search") {
                        lstItemFilter = lstItem.filter(function(item) {
                            var itemName = removeVietnameseTones(item.item_name.toLowerCase())
                            var search = removeVietnameseTones(element.value.toLowerCase())
                            return itemName.includes(search)
                        });
                    }
                    if (element.key == "category") {
                        if (element.value != null) {
                            lstItemFilter = lstItemFilter.filter(function(item) {
                                return item.item_type.includes(element.value)
                            });
                        }
                    }
                });
                pagingData(1, lstItemFilter);
           } else {
            pagingData(1)
           }
        }
    });
})(jQuery);

// Product Quantity
$('.quantity button').on('click', function () {
    var button = $(this);
    var oldValue = button.parent().parent().find('input').val();
    if (button.hasClass('btn-plus')) {
        var newVal = parseFloat(oldValue) + 1;
    } else {
        if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 0;
        }
    }
    button.parent().parent().find('input').val(newVal);
});
