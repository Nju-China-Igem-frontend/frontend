require.config({
    paths:{
        "jquery":'../lib/jquery'
    }
});
require(['jquery'],function($) {
    $(document).ready(function(){
        alert("it is ok");
    })
});