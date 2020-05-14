<?php

require_once('libs/Smarty.class.php');

class AdminView{

    private $smarty;

    public function __construct()
    {
     $this->smarty = new Smarty();   
    }

    public function adminPage($itemList, $categories)
    {
        $this->smarty->assign('items', $itemList);
        $this->smarty->assign('categories', $categories);

        $this->smarty->display('adminPage.tpl');
    }

    public function loginAdmin()
    {
        $this->smarty->display('loginAdmin.tpl');
    }

    public function editView($infoItem, $categories){

        $this->smarty->assign('infoItem', $infoItem);
        $this->smarty->assign('categories', $categories);

        $this->smarty->display('editView.tpl');


    }
}