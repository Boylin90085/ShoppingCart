var item_url="http://www.monoame.com/awi_class/api/command.php?type=get&name=itemdata"
//新增一個商品清單物件
var shoplist={};
shoplist.name="MyBuylist 購物清單"
shoplist.time="2017/4/27"
//商品清單裡是個陣列,塞商品物件們
shoplist.list=[
  {name: "吹風機",price: 300},
  {name: "麥克風",price: 9000},
  {name: "筆電",price: 87878},
  {name: "iPone 1000",price: 900000},
  {name: "手環",price: 3}
];

$.ajax({
  url: item_url,
  success: function(res){
    shoplist.list=JSON.parse(res);
    showlist();
  }
  
});
//定義元素用的html模板,{{名稱}}代表要套入的地方
var item_html="<li id={{id}} class='buy_item'>{{num}}.{{item}}<div class='price'>{{price}}</div><div id={{del_id}} data-del-id='{{delid}}' class='del_btn'>X</div></li>";

var total_html="<li class='buy_item total'>總價<div class='price'>{{price}}</div></li>";

function showlist(){
  $("#items_list").html("");
  var total_price=0;
  for(var i=0;i<shoplist.list.length;i++){
    var item=shoplist.list[i];
    var item_id="buyitem_"+i;
    var del_item_id="del_buyitem_"+i;
    //動態統計總價(每一項跑時加上去)
    total_price+= parseInt(item.price);//parseInt 將抓出來的字串改為數值
    //取代模板位置成為資料replace(要取代的,取代成..)
    var current_item_html=
        item_html.replace("{{num}}",i+1)
                 .replace("{{item}}",item.name)
                 .replace("{{price}}",item.price)
                 .replace("{{id}}",item_id)
                 .replace("{{del_id}}",del_item_id)
                 .replace("{{delid}}",i)
    ;

    $("#items_list").append(current_item_html);//delbtn id buyitem_1
    $("#"+del_item_id).click(
      function(){
        remove_item($(this).attr("data-del-id"));
        showlist();
      }
    );
  }
  var current_total_html=total_html.replace("{{price}}",total_price);
  $("#items_list").append(current_total_html);
  
}
showlist();
$(".addbtn").click(
  function(){
    shoplist.list.push({
      name:$("#input_name").val(),
      price:$("#input_price").val()
    });
    $("#input_name").val("");
    $("#input_price").val("");
    showlist();
  }
);


function remove_item(id){
  shoplist.list.splice(id,1);//刪除陣列裡的一個東西
  
}