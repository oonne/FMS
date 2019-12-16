<?php

namespace frontend\controllers;

use Yii;
use common\filters\auth\HeaderParamAuth;
use yii\data\ActiveDataProvider;
use common\models\Expenses;
use common\models\Income;
use common\models\Category;
use common\models\Handler;

class ChartController extends Controller
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
        // sum data
        $incomeQuery = Income::find()
                    ->select(['summary' => 'SUM(income_money)']);
        $incomeTotal = ($incomeQuery->createCommand()->queryOne())['summary'];
        
        $expensesQuery = Expenses::find()
                    ->select(['summary' => 'SUM(expenses_money)']);
        $expensesTotal = ($expensesQuery->createCommand()->queryOne())['summary'];

        // monthly data
        $monthlyExpenses = [];
        $monthlyExpensesQuery = Expenses::find()->select([
                'month' => "DATE_FORMAT(expenses_date, '%Y-%m')",
                'money' => 'SUM(expenses_money)'])
            ->groupBy(["DATE_FORMAT(expenses_date, '%Y-%m')"]);
        $monthlyExpensesResult = $monthlyExpensesQuery->createCommand()->queryAll();

        $monthlyIncome = [];
        $monthlyIncomeQuery = Income::find()->select([
                'month' => "DATE_FORMAT(income_date, '%Y-%m')",
                'money' => 'SUM(income_money)'])
            ->groupBy(["DATE_FORMAT(income_date, '%Y-%m')"]);
        $monthlyIncomeResult = $monthlyIncomeQuery->createCommand()->queryAll();

        $month = $this->_getMonth($monthlyExpensesResult, $monthlyIncomeResult);
        $monthlyBalance = [];
        foreach ($month as $m) {
            $expenses = '0.00';
            foreach ($monthlyExpensesResult as $expensesResult) {
                if ($expensesResult['month'] == $m) {
                    $expenses = $expensesResult['money'];
                }
            }
            $monthlyExpenses[] = $expenses;

            $income = '0.00';
            foreach ($monthlyIncomeResult as $incomeResult) {
                if ($incomeResult['month'] == $m) {
                    $income = $incomeResult['money'];
                }
            }
            $monthlyIncome[] = $income;

            $monthlyIncomeTotalQuery = Income::find()->select([
                            'summary' => 'SUM(income_money)'])
                        ->where(['<=', "DATE_FORMAT(income_date, '%Y-%m')", $m]);
            $monthlyIncomeTotalResult = $monthlyIncomeTotalQuery->createCommand()->queryOne();
            
            $monthlyExpensesTotalQuery = Expenses::find()->select([
                            'summary' => 'SUM(expenses_money)'])
                        ->where(['<=', "DATE_FORMAT(expenses_date, '%Y-%m')", $m]);
            $monthlyExpensesTotalResult = $monthlyExpensesTotalQuery->createCommand()->queryOne();

            $monthlyBalance[] = $monthlyIncomeTotalResult['summary'] - $monthlyExpensesTotalResult['summary'];
        }

        // proportion data
        $expensesCategory = [];
        $expensesCategoryQuery = Expenses::find()->select([
                'category' => 'expenses_category',
                'value' => 'SUM(expenses_money)'])
            ->groupBy(['expenses_category']);
        $expensesCategoryResult = $expensesCategoryQuery->createCommand()->queryAll();

        $categoryList = Category::getCategoryList();
        foreach ($categoryList as $category) {
            foreach ($expensesCategoryResult as $item)  
            {
                if($item['category'] == $category['id']){
                    array_push($expensesCategory, [
                        'name' => $category['category_name'],
                        'value' => $item['value']
                    ]);
                }
            }
        }

        $incomeHandler = [];
        $incomeHandlerQuery = Income::find()->select([
                'handler' => 'income_handler',
                'value' => 'SUM(income_money)'])
            ->groupBy(['income_handler']);
        $incomeHandlerResult = $incomeHandlerQuery->createCommand()->queryAll();

        $handlerList = Handler::getHandlerList();
        foreach ($handlerList as $handler) {
            foreach ($incomeHandlerResult as $item)  
            {
                if($item['handler'] == $handler['id']){
                    array_push($incomeHandler, [
                        'name' => $handler['handler_name'],
                        'value' => $item['value']
                    ]);
                }
            }
        }

        return [
            'Ret' => 0,
            'Data' => [
                'incomeTotal' => $incomeTotal,
                'expensesTotal' => $expensesTotal,
                'month' => $month,
                'monthlyIncome' => $monthlyIncome,
                'monthlyExpenses' => $monthlyExpenses,
                'monthlyBalance' => $monthlyBalance,
                'expensesCategory' => $expensesCategory,
                'incomeHandler' => $incomeHandler
            ],
        ];
    }

    protected function _getMonth($expensesResult, $incomeResult)
    {
        $mergeMonth = array_merge($expensesResult, $incomeResult);
        $uniqueMonth = [];
        foreach ($mergeMonth as $k => $v) {
            if(in_array($v['month'], $uniqueMonth)){
                unset($mergeMonth[$k]);
            }else{
                $uniqueMonth[] = $v['month'];
            }
        }
        sort($uniqueMonth);

        return $uniqueMonth;
    }
}