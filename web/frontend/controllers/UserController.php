<?php

namespace frontend\controllers;

use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use common\models\User;
use common\models\Handler;
use common\models\IncomeSource;
use common\models\Category;

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
     * 顺便查询经手人、分类等基础信息，一起存起来
     */
    public function actionLogin()
    {
        $wx = Yii::$app->request->post();
        $openid = $wx['openid'];

        $user = User::find()
                    ->where(['openid' => $openid])
                    ->one();

        if ($user) {
            $user->generateAccessToken();
            $user->save(false);
            Yii::$app->user->loginByAccessToken($user->access_token);
            $data = $user->toArray(['username', 'nickname', 'access_token']);

            $extra = [];
            // 经手人
            $handler = Handler::find()
                        ->select(['id', 'handler_name'])
                        ->all();
            $extra['handler'] = $handler;
            // 分类
            $category = Category::find()
                        ->sort(['category_sequence' => SORT_DESC])
                        ->select(['id', 'category_name'])
                        ->all();
            $extra['category'] = $category;
            // 来源
            $source = IncomeSource::find()
                        ->select(['id', 'income_source'])
                        ->all();
            $extra['source'] = $source;

            return [
                'code' => 0,
                'data' => $data,
                'extra' => $extra,
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