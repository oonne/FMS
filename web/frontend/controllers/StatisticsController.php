<?php

namespace frontend\controllers;

use Yii;
use common\filters\HeaderParamAuth;
use yii\data\ActiveDataProvider;
use common\models\Expenses;
use common\models\Note;
use common\models\Password;

class StatisticsController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HeaderParamAuth::className(),
        ];
        return $behaviors;
    }

    protected function verbs()
    {
        return [
            'index' => ['get'],
        ];
    }

    public function actionIndex()
    {
        // 最近一个月的消费
        $monthlyExpensesQuery = Expenses::find()
                    ->where(['>=', "DATE_FORMAT(expenses_date, '%Y-%m-%d')", date("Y-m-d", strtotime("-1 month"))])
                    ->select(['summary' => 'SUM(expenses_money)']);
        $monthlyExpenses = ($monthlyExpensesQuery->createCommand()->queryOne())['summary'];

        // 记事本总数
        $noteCount = Note::find()->count();
        
        // 密码总数
        $passwordCount = Password::find()->count();
        
        return [
            'Ret' => 0,
            'Data' => [
                'monthlyExpenses' => $monthlyExpenses,
                'noteCount' => $noteCount,
                'passwordCount' => $passwordCount,
            ],
        ];
    }
}