let up = ["Home", "Project", "Human Practice", "Model", "Team", "Contacts"];//导航头部
let down = {
    "1": ["Background", "Design", "Experiments", "Improve"],
    "2": ["Human Practice", "Entrepreneurship"],
    "3": ["Overview", "Reception Screening"],
    "4": ["Team", "Attributions"],
    "5": ["Weibo", "E-mail"]
};//导航内容
let size = up.length;
let total = 0;
for (let i = 1; i < size; ++i) {
    total += down[i.toString()].length;
}//总导航个数

/**
 *  添加导航栏的标签以及背景图片的标签
 */

$(document).ready(
    function () {
        console.log(total);

        let logo = document.createElement("div");
        logo.innerHTML = "<img src='' alt='logo'>";
        logo.id = "logo";
        $("#nav").append(logo);

        var nav_head = document.createElement("div");
        nav_head.id = ("nav-head");
        $("#nav").append(nav_head);

        let index = 0;
        for (let i = 0; i < size; ++i) {
            let group = document.createElement("div");
            group.id = "nav-head" + i;
            let head = document.createElement("div");
            let content = document.createElement("div");
            head.id = "head" + i;
            content.id = "content" + i;
            head.className = "head";
            content.className = "content";
            var headList = "", contentList = "";
            const arrow = "<img src='./assets/Chevron Down.svg' alt='arrow'>";
            headList += "<a>" + up[i] + "</a>" + arrow;
            head.innerHTML = headList;
            if (i === 0) {
                var image = document.createElement("img");
                image.id = "home";
                image.src = "./assets/home.jpg";
                $("#route").append(image);
                $("#home").addClass("background");
            } else {
                const idx = i.toString();
                const len = down[idx].length;
                for (let j = 0; j < len; ++j) {
                    contentList += ("<a id='link" + index + "'>" + down[idx][j] + "</a>");
                    var image = document.createElement("img");
                    const baseUrl = "./assets/main";
                    image.id = "background" + index;
                    if (index === 5 || index === 6) image.src = baseUrl + index + ".jpeg";
                    else image.src = baseUrl + index + ".jpg";
                    $("#route").append(image);
                    $("#background" + index).addClass("background");
                    index++;//添加导航内容
                }
            }
            content.innerHTML = contentList;
            $("#nav-head").append(group);
            $("#nav-head" + i).append(head);
            $("#nav-head" + i).append(content);
            $("#nav-head" + i).addClass("nav-default");//导航栏默认样式
        }
        $(".content").hide();//下拉框默认隐藏
        $(".background").hide();//背景图片默认隐藏
        $("#home").show();
    }
);

/**
 *  添加下拉框的效果，Home页无下拉框
 */

$(document).ready(function () {
    for (let i = 0; i < size; ++i) {
        if (i !== 0) {
            $("#head" + i).mouseenter(function () {
                $("#content" + i).slideDown("fast");
            });
            $("#nav-head" + i).mouseenter(function () {
                $("#head" + i + " img").addClass("img-rotate-front");
                $("#head" + i + " img").removeClass("img-rotate-back");
            });
            for (let j = 0; j < size; ++j) {
                if (j !== 0 && j !== i) $("#nav-head" + j).mouseleave(function () {
                    $("#content" + j).slideUp("500");
                    $("#head" + j + " img").removeClass("img-rotate-front");
                    $("#head" + j + " img").addClass("img-rotate-back");
                });
            }
        }//下拉动态添加
    }
});