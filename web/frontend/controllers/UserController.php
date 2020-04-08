<?php

namespace frontend\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use common\models\Users;
use frontend\models\LoginForm;

class UserController extends Controller
{
    protected function verbs()
    {
        return [
            'login' => ['post'],
            'wx-login' => ['post']
        ];
    }

    /**
     * 旧系统登录接口，帐号密码换token
     */
    public function actionLogin()
    {
        $model = new LoginForm();
        $model->load(Yii::$app->request->post(), '');

        if ($model->login()) {
            $data = $model->user->toArray(['username', 'nickname', 'access_token']);
            return [
                'Ret' => 0,
                'Data' => $data
            ];
        } else {
            Yii::warning('用户登录失败！');
            return [
                'Ret' => 1,
                'Data' => [
                    'errors' => $model->getFirstErrors()
                ]
            ];
        }
    }

    /**
     * 新系统登录接口，openid换token
     */
    public function actionWxLogin()
    {
        $wx = Yii::$app->request->post();
        $openid = $wx['openid'];

        $model = Users::find($id)
                    ->where(['openid' => $openid])
                    ->one();

        if ($model) {
            $data = $model->user->toArray(['username', 'nickname', 'access_token']);
            return [
                'Ret' => 0,
                'Data' => $data
            ];
        } else {
            Yii::warning('查无此人！');
            return [
                'Ret' => 1,
            ];

        }
    }

}