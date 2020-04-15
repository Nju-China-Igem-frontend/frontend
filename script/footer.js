$(function () {
    const location_svg = "<img src='./assets/location.svg' alt='location'>";
    let location = $(".location");
    location.append(location_svg);
    location.append("<p>Life Science Department, 163 Xianlin Road, Qixia District, Nanjing University, Jiangsu Province, China</p>");

    const email_svg = "<img src='./assets/email.svg' alt='email'>";
    let email = $(".email");
    email.append(email_svg);
    email.append("<p>123456@smail.nju.edu.cn</p>");
});