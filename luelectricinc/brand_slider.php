<?php
    $IMAGE_PATH = "/brand_images/";
?>

<div id="jssor_1" style="position: relative; margin: 0 auto; top: 10px; left: 0px; width: 1024px; height: 60px; overflow: hidden; visibility: hidden;">
    <div data-u="slides" style="cursor: default; position: relative; top: 0px; left: 0px; width: 100%; height: 55px; overflow: hidden;">
        <?php
        //loads all images in the $IMAGE_PATH directory
        $handle = opendir(dirname(realpath(__FILE__)).$IMAGE_PATH);
            while($file = readdir($handle)){
                if($file !== '.' && $file !== '..'){
                    echo '<div style="display: none; margin-left:25px;">';
                        echo '<img data-u="image" src="'.$IMAGE_PATH.$file.'" /> ';
                    echo '</div>';
                }
            }
        ?>
    </div>
</div>
