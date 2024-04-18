/*
url: https://script.google.com/macros/s/AKfycbxOAeVBB8eJbhLPE2FyM3OIgceKTtrlO2yKwjCVDIMbZi3ynGOWyudcI2Ai2nF5lXQ/exec

1. API đặt hàng
url + ?action=insert&customer_name=lvtho&phone_number=0981283963&item_name=tivi_3&quantity=2&price=25000000&item_code=TV_01&address=Thái_bình&note=ghi chú

response:
- Thành công:
{
    "result": "success",
    "data": {
        "nextRow": 17
    }
}
+ nextRow: dòng được insert

- Thất bại:
{
    "result": "error",
    "error": {}
}

!Lưu ý: phải giữ đúng thứ tự param truyền đi


2. API lấy danh sách mặt hàng
url + ?action=getitem
{
    "result": "success",
    "data": {
        "lst_item": [
            {
                "item_type": "TV",
                "item_code": "TV_01",
                "item_name": "Tivi xiaomi",
                "size": 40,
                "manufacture": "xiaomi",
                "org_price": 11000000,
                "sale_price": 10000000,
                "image": [
                    "https://drive.google.com/thumbnail?id=1pqAN6yGCNHie7anazYzFhPxWROkvJxyM",
                    "https://drive.google.com/thumbnail?id=1SXKmDa475Mxsx9EFO_mdje-xrhMt6PmM"
                ]
            },
            {
                "item_type": "TV",
                "item_code": "TV_02",
                "item_name": "Xiaomi 2",
                "size": 42,
                "manufacture": "xiaomi",
                "org_price": 12000000,
                "sale_price": 6500000,
                "image": []
            },
            {
                "item_type": "TL",
                "item_code": "TL_01",
                "item_name": "Tủ lạnh sharp",
                "capacity": 400,
                "manufacture": "Sharp",
                "org_price": 20000000,
                "sale_price": 17000000,
                "number_door": 4,
                "image": [
                    "https://drive.google.com/thumbnail?id=1SXKmDa475Mxsx9EFO_mdje-xrhMt6PmM"
                ]
            },
            {
                "item_type": "MG",
                "item_code": "MG_01",
                "item_name": "Máy giặt aqua",
                "washing_volume": 10,
                "type_door": "Cửa trên",
                "manufacture": "Aqua",
                "org_price": 7000000,
                "sale_price": 5000000,
                "image": [
                    "https://drive.google.com/thumbnail?id=1SXKmDa475Mxsx9EFO_mdje-xrhMt6PmM"
                ]
            },
            {
                "item_type": "DH",
                "item_code": "DH_01",
                "item_name": "Điều hòa DH01",
                "power": 5000,
                "manufacture": "Panasonic",
                "org_price": 10000000,
                "sale_price": 10000000,
                "way": "2 chiều",
                "image": [
                    "https://drive.google.com/thumbnail?id=1SXKmDa475Mxsx9EFO_mdje-xrhMt6PmM"
                ]
            }
        ]
    }
}
+ item_type: Loại hàng hóa - TV: tivi; TL: Tủ lạnh, MG: Máy giặt; DH: Điều hòa
+ item_code: Mã hàng
+ item_name: Tên hàng
+ org_price: Giá gốc
+ sale_price: Giá khuyến mại
+ size: kích thước (inches)
+ power: Công suất (w)
+ way: Loại điều hòa (1 chiều/ 2 chiều)
+ washing_volume: Trọng lượng giặt của máy giặt (kg)
+ type_door: Loại cửa máy giặt
+ capacity: Dung tích tủ lạnh
+ number_door: Số cửa tủ lạnh
+ manufacture: Hãng
+ image: Danh sách ảnh sản phẩm


3. API lấy danh sách thông tin chung
url + ?action=getinfo
response:
{
    "result": "success",
    "data": {
        "info": [
            {
                "conpany_name": "Tivi Xiaomi Hải Phòng",
                "address": "Hải Phòng ",
                "phone_number": "0981283963",
                "zalo": "zalo",
                "facebook": "facebook",
                "logo": "logo"
            }
        ]
    }
}
+ conpany_name: Tên công ty
+ address: Địa chỉ
+ phone_number: Số điện thoại
+ zalo: link zalo
+ facebook: link facebook
+ logo: link ảnh logo

4. Lấy chi tiết hàng hóa
url + ?action=getdetailitem&item_type=tl&item_code=TV_01
response:
{
    "result": "success",
    "data": {
        "item_detail": {
            "item_code": "TL_01",
            "item_name": "Tủ lạnh sharp",
            "specifications": [
                {
                    "guarantee": [
                        {
                            "name": 12,
                            "value": 100000
                        }
                    ],
                    "itemrefrigeration_technology": {
                        "name": "Công nghệ làm lạnh",
                        "value": "Làm lạnh nhanh"
                    },
                    "itemsize": {
                        "name": "Kích thước",
                        "value": "1,8x1"
                    },
                    "itemutilities": {
                        "name": "Tiện ích",
                        "value": "Rã đông mềm"
                    },
                    "itemother_info": {
                        "name": "Thông tin khác",
                        "value": ""
                    }
                }
            ],
            "image": [
                "https://drive.google.com/thumbnail?id=1SXKmDa475Mxsx9EFO_mdje-xrhMt6PmM"
            ]
        }
    }
}
+ guarantee: Thông tin bảo hành
=> name: số tháng bảo hành
=> value: số tiền bảo hành
+ item_type: Loại mặt hàng - TV: tivi; TL: Tủ lạnh, MG: Máy giặt; DH: Điều hòa
+ item_code: Mã hàng
+ image: Danh sách ảnh sản phẩm

5. Lấy danh sách banner
url + ?action=getbanner
response
{
    "result": "success",
    "data": {
        "lst_item": {
            "images": [
                "https://drive.google.com/thumbnail?id=1pqAN6yGCNHie7anazYzFhPxWROkvJxyM",
                "https://drive.google.com/thumbnail?id=1SXKmDa475Mxsx9EFO_mdje-xrhMt6PmM",
                "https://drive.google.com/thumbnail?id=1SXKmDa475Mxsx9EFO_mdje-xrhMt6PmM"
            ]
        }
    }
}
*/