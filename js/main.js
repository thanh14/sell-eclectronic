(function ($) {
    "use strict";

    var url = "https://script.google.com/macros/s/AKfycby-T-xiop1zI3h4JluKfxUXZwPG54i4jT4GnDGM2fvIhJDHqaUu0Vy_vQKa1aBzDeE/exec";
    var ul = document.querySelector('.paging');
    var allPages = 15;
    var lstItem = [];
    var lstItemDisplay = [];
    var totalItem = 0;
    var currentPage = 1;
    var pageSize = 20;
    
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
    function formatMoney(money){
       const pieces = parseFloat(money).toFixed(2).split('')
       let ii = pieces.length - 3
       while ((ii-=3) > 0) {
         pieces.splice(ii, 0, ',')
       }
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
    function pagingData(pageIndex){
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
        endIndex = pageIndex == 1 ? 20 : pageIndex*pageSize;
        elem(Math.floor(totalItem/pageSize) + 1, pageIndex);

        lstItemDisplay = lstItem.slice(startIndex, endIndex);

        
        $("div.lst-item div").remove();
        lstItemDisplay.forEach(item => {
            let itemHTML = `<div id=` + item.item_code + ` class="col-lg-3 col-md-4 col-sm-6 pb-1 item-box">
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
                                        <div class="h6 item-name text-decoration-none text-truncate" href="">` + item.item_name + " - " + item.size + " inchs" + `</div>
                                        <div class="align-items-center mt-2">
                                            <h6 class="text-muted ml-2"><del>$` + formatMoney(item.org_price) + `</del>
                                            <h5>$` + formatMoney(item.sale_price) + `</h5>
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
        var recordId = this.getAttribute("Id");
        window.location.href = "detail.html?code="+recordId;
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
    
})(jQuery);

