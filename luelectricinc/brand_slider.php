<?php
    $IMAGE_PATH = "/brand_images/";
?>

<script>
    jQuery(document).ready(function ($) {

        var jssor_1_options = {
          $AutoPlay: true,
          $Idle: 0,
          $AutoPlaySteps: 1,
          $SlideDuration: 11000,
          $SlideEasing: $JssorEasing$.$Linear,
          $PauseOnHover: 4,
          $SlideWidth: 140,
          $SlideSpacing: 50,
          $Cols: 7
        };

        var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

        //responsive code begin
        //you can remove responsive code if you don't want the slider scales while window resizing
        function ScaleSlider() {
            var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
            if (refSize) {
                refSize = Math.min(refSize, 1920);
                jssor_1_slider.$ScaleWidth(refSize);
            }
            else {
                window.setTimeout(ScaleSlider, 30);
            }
        }
        ScaleSlider();
        $(window).bind("load", ScaleSlider);
        $(window).bind("resize", ScaleSlider);
        $(window).bind("orientationchange", ScaleSlider);
        //responsive code end
    });
</script>



<div id="jssor_1" style="position: relative; margin: 0 auto; top: 15px; left: 0px; width: 1024px; height: 55px; overflow: hidden; visibility: hidden;">
    <!-- Loading Screen -->
    <div data-u="loading" style="position: absolute; top: 0px; left: 0px;">
        <div style="filter: alpha(opacity=70); opacity: 0.7; position: absolute; display: block; top: 0px; left: 0px; width: 100%; height: 100%;"></div>
        <div style="position:absolute;display:block;background:url('brand_images/loading.gif') no-repeat center center;top:0px;left:0px;width:100%;height:100%;"></div>
    </div>
    <div data-u="slides" style="cursor: default; position: relative; top: 0px; left: 0px; width: 1024px; height: 55px; overflow: hidden;">

        <?php
        //loads all images in the $IMAGE_PATH directory
        $handle = opendir(dirname(realpath(__FILE__)).$IMAGE_PATH);
            while($file = readdir($handle)){
                if($file !== '.' && $file !== '..'){
                    echo '<div style="display: none;">';
                        echo '<img data-u="image" src="'.$IMAGE_PATH.$file.'" /> ';
                    echo '</div>';
                }
            }
        ?>



    </div>
</div>
