/**
 * Created by daozen on 2014/5/27.
 */
$(function(){
    tabControl();
});
//test
function tabControl(){
    $(".segmented-control .control-item").each(function(){
        $(this).click(function(){
            //alert($(this).attr("id"));
            $(".segmented-control .active").removeClass("active");
            $(this).addClass("active");
            var item_id=$(this).attr("href");
            $(".content .active").removeClass("active");
            $(item_id).addClass("active");
            window.scrollTo(0,0);
        });
    });
}

