/**
 * Created by DuyNg on 12/15/15.
 */
$(window).on("scroll", function() {
    var scrollPos = $(window).scrollTop();
    if (scrollPos <= 0) {
        $(".topdesc").show();
    } else {
        $(".topdesc").hide();
    }
});
