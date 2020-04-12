/**
 * 添加背景图片的路由效果
 */
$(document).ready(function(){
    $("#head0").click(function(){
        for(let i=0;i<total;++i){
            $("#background"+i).hide();
        }
        $("#home").show();
    });
    for(let i=0;i<total;++i){
        $("#link"+i).click(function(){
            $("#home").hide();
            $("#background"+i).show();
            for(let j=0;j<total;++j){
                if(j!=i) $("#background"+j).hide();
            }
        });
    }
})