<?php
if (isset($_REQUEST['NEXT_PRODUCT_NUM']))
    $nextProductNum = intval($_REQUEST['NEXT_PRODUCT_NUM']);
else
    $nextProductNum = 1;
?>

<div style="clear: both">
    <div style="border: 1px solid black; float: left; margin: 0 2px 4px 2px">
        продукт <?=$nextProductNum?>
        <br>
        описание продукта <?=$nextProductNum?>
    </div>
    <div style="border: 1px solid black; float: left; margin: 0 2px 4px 2px">
        продукт <?=$nextProductNum + 1?>
        <br>
        описание продукта <?=$nextProductNum + 1?>
    </div>
    <div style="border: 1px solid black; float: left; margin: 0 2px 4px 2px">
        продукт <?=$nextProductNum + 2?>
        <br>
        описание продукта <?=$nextProductNum + 2?>
    </div>
    <div style="border: 1px solid black; float: left; margin: 0 2px 4px 2px">
        продукт <?=$nextProductNum + 3?>
        <br>
        описание продукта <?=$nextProductNum + 3?>
    </div>
</div>