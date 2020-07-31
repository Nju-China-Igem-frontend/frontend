// team 页面js文件

const staggeringOption = {
    delay: 300, // 延迟300ms出现
    distance: "50px", // 从下到上有50像素的移动
    durationL: 500, // 动画执行500ms
    easing: "ease-in-out",
    origin: "bottom", // 从下到上
};

ScrollReveal().reveal(".team-member", {...staggeringOption, interval: 350});
ScrollReveal().reveal(".supervisor", {...staggeringOption, interval: 350});