/*
url: https://script.google.com/macros/s/AKfycbwHab4hGpiFBE3mkXCz4W8LmTw1MtiD8dK6AwD8tzrA0rfb3x5ouhphUYHo3fymGxs/exec

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
response:
{
    "result": "success",
    "data": {
        "lst_item": [
            {
                "item_code": "TV_01",
                "item_name": "Tivi xiaomi",
                "org_price": 11000000,
                "sale_price": 10000000,
                "size": 40,
                "remain_quantity": 10,
                "sell_quantity": 5,
                "description": "Ti vi xiaomi",
                "resolution": "3840x2160",
                "view": 178,
                "refresh_rate": "60Hz",
                "power": "145W",
                "dimension": "1285x289x806",
                "out_memory": 1.5,
                "in_memory": 8,
                "cpu": "Lõi kép A64",
                "gpu": "Mali-450 MP2",
                "sound_tech": "Dolby Digital Plus; Dolby Atmos; FLAC; MP3; AAC; DTS Surround, DTS-HD; OGG",
                "speaker_power": "2x10W",
                "weight": 12,
				        "description_detail": "mô tả chi tiết",
                "image": [
                    "ảnh 1",
                    "ảnh 2"
                ]
            }
        ]
    }
}
+ item_code: Mã hàng
+ item_name: Tên hàng
+ org_price: Giá gốc
+ sale_price: Giá khuyến mại
+ size: kích thước (inches)
+ remain_quantity: Số lượng tồn
+ sell_quantity: Số lượng đã bán
+ description: Mô tả
+ resolution: Độ phân giải
+ view: góc nhìn
+ refresh_rate: Tốc độ làm mới
+ power: Công suất
+ dimension: Kích cỡ (dài x rộng)
+ out_memory: Bộ nhớ ngoài
+ in_memory: Bộ nhớ trong
+ cpu: cpu
+ gpu: gpu
+ sound_tech: Công nghệ âm thanh
+ weight: Trọng lượng
+ description_detail: Mô tả chi tiết
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
url + ?action=getdetailitem&item_code=TV_01
response:
{
    "result": "success",
    "data": {
        "item_detail": {
            "item_code": "TV_01",
            "item_name": "Tivi xiaomi",
            "org_price": 11000000,
            "sale_price": 10000000,
            "size": 40,
            "remain_quantity": 10,
            "sell_quantity": 5,
            "description": "Ti vi xiaomi",
            "resolution": "3840x2160",
            "view": 178,
            "refresh_rate": "60Hz",
            "power": "145W",
            "dimension": "1285x289x806",
            "out_memory": 1.5,
            "in_memory": 8,
            "cpu": "Lõi kép A64",
            "gpu": "Mali-450 MP2",
            "sound_tech": "Dolby Digital Plus; Dolby Atmos; FLAC; MP3; AAC; DTS Surround, DTS-HD; OGG",
            "speaker_power": "2x10W",
            "weight": 12,
            "description_detail": "Mô tả chi tiết",
            "image": [
                "https://drive.google.com/thumbnail?id=1pqAN6yGCNHie7anazYzFhPxWROkvJxyM",
                "https://drive.google.com/thumbnail?id=1SXKmDa475Mxsx9EFO_mdje-xrhMt6PmM"
            ]
        }
    }
}
+ item_code: Mã hàng
+ item_name: Tên hàng
+ org_price: Giá gốc
+ sale_price: Giá khuyến mại
+ size: kích thước (inches)
+ remain_quantity: Số lượng tồn
+ sell_quantity: Số lượng đã bán
+ description: Mô tả
+ resolution: Độ phân giải
+ view: góc nhìn
+ refresh_rate: Tốc độ làm mới
+ power: Công suất
+ dimension: Kích cỡ (dài x rộng)
+ out_memory: Bộ nhớ ngoài
+ in_memory: Bộ nhớ trong
+ cpu: cpu
+ gpu: gpu
+ sound_tech: Công nghệ âm thanh
+ weight: Trọng lượng
+ description_detail: Mô tả chi tiết
+ image: Danh sách ảnh sản phẩm
*/