<?php
if (isset($_REQUEST['NEXT_PRODUCT_NUM']))
    $nextProductNum = intval($_REQUEST['NEXT_PRODUCT_NUM']);
else
    $nextProductNum = 1;

$arProducts = [];
for ($currentProduct = $nextProductNum; $currentProduct < $nextProductNum+4; $currentProduct++){
    $arProducts[] = [
        'NAME' => "Product $currentProduct",
        'DESCRIPTION' => "Description for product $currentProduct"
    ];
}

echo json_encode($arProducts);