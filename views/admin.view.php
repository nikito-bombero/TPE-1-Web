<?php

require_once 'libs/smarty/Smarty.class.php';
require_once 'helpers/auth.helper.php';
class AdminView
{

    private $smarty;

    public function __construct($categories)
    {
        $this->smarty = new Smarty();
        $this->smarty->assign('base_url', BASE_URL);
        $this->smarty->assign('categories', $categories);
        $this->smarty->assign('isLogged',  AuthHelper::isLogged());
        $this->smarty->assign('USER', AuthHelper::userName());
        $this->smarty->assign('ROL', AuthHelper::role());
        $this->smarty->assign('ID_USER', AuthHelper::userId());

    }

    public function adminPage($itemList)
    {
        $this->smarty->assign('items', $itemList);
        $this->smarty->display('adminPage.tpl');
    }

    public function editView($infoItem, $img)
    {
        $this->smarty->assign('infoItem', $infoItem);
        $this->smarty->assign('img', $img);
        $this->smarty->display('editView.tpl');
    }

    public function editCategoryView($infoCategory)
    {
        $this->smarty->assign('infoCategory', $infoCategory);
        $this->smarty->display('editCategoryView.tpl');
    }

    public function usersList($users){

        $this->smarty->assign('users', $users);
        $this->smarty->display('editUser.tpl');
    }
}
