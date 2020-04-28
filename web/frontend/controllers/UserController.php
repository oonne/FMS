<?php

namespace frontend\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use common\models\User;

class UserController extends Controller
{
    protected function verbs()
    {
        return [
            'login' => ['post']
        ];
    }

    /**
     * openid换token
     */
    public function actionLogin()
    {
        $wx = Yii::$app->request->post();
        $openid = $wx['openid'];

        $user = User::find()
                    ->where(['openid' => $openid])
                    ->one();

        if ($user) {
            // $user->generateAccessToken();
            $user->save(false);
            Yii::$app->user->loginByAccessToken($user->access_token);
            $data = $user->toArray(['username', 'nickname', 'access_token']);
            return [
                'code' => 0,
                'data' => $data
            ];
        } else {
            Yii::warning('查无此人！');
            return [
                'code' => 1,
                'data' => [
                    'username' => '',
                    'nickname' => '',
                    'access_token' => ''
                ]
            ];

        }
    }

}