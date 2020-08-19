<?php

namespace frontend\controllers;

use Yii;
use common\filters\HeaderParamAuth;
use yii\data\ActiveDataProvider;
use yii\data\Sort;
use common\models\Expenses;
use common\models\Note;
use common\models\Password;
use common\models\Handler;
use common\models\IncomeSource;
use common\models\Category;

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
        $dailyExpensesQuery = Expenses::find()
                    ->where(["DATE_FORMAT(expenses_date, '%Y-%m-%d')" => date("Y-m-d")])
                    ->select(['summary' => 'SUM(expenses_money)']);
        $dailyExpenses = ($dailyExpensesQuery->createCommand()->queryOne())['summary'];

        // 记事本总数
        $noteCount = Note::find()->count();
        
        // 密码总数
        $passwordCount = Password::find()->count();
        
        // 经手人
        $handler = Handler::find()
                    ->orderBy(['id' => SORT_DESC])
                    ->select(['id', 'handler_name'])
                    ->all();
        // 分类
        $category = Category::find()
                    ->orderBy(['category_sequence' => SORT_DESC])
                    ->select(['id', 'category_name'])
                    ->all();
        // 来源
        $source = IncomeSource::find()
                    ->select(['id', 'income_source'])
                    ->all();

        return [
            'Ret' => 0,
            'Data' => [
                'dailyExpenses' => $dailyExpenses,
                'noteCount' => $noteCount,
                'passwordCount' => $passwordCount,
                'handler' => $handler,
                'category' => $category,
                'source' => $source,
            ],
        ];
    }
}