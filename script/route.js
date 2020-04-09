/**
 * 添加背景图片的路由效果
 */
$(document).ready(function(){
    $("#head0").click(function(){
        $("#home").show();
        for(let i=0;i<total;++i){
            $("background"+i).hide();
        }
    });
    for(let i=0;i<total;++i){
        $("#link"+i).click(function(){
            $("#background"+i).show();
            $("#home").hide();
            for(let j=0;j<total;++j){
                if(j!=i) $("#background"+j).hide();
            }
        });
    }
})