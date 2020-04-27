<?php
namespace backend\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\web\BadRequestHttpException;
use common\models\Expenses;
use common\models\Income;
use common\models\Category;
use common\models\IncomeSource;

class ChartController extends Controller
{
    
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ]
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

            $monthlyBalance[] = round($monthlyIncomeTotalResult['summary']-$monthlyExpensesTotalResult['summary'], 2);
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

        $incomeSource = [];
        $incomeSourceQuery = Income::find()->select([
                'source' => 'income_source',
                'value' => 'SUM(income_money)'])
            ->groupBy(['income_source']);
        $incomeSourceResult = $incomeSourceQuery->createCommand()->queryAll();

        $sourceList = IncomeSource::getSourceList();
        foreach ($sourceList as $source) {
            foreach ($incomeSourceResult as $item)  
            {
                if($item['source'] == $source['id']){
                    array_push($incomeSource, [
                        'name' => $source['income_source'],
                        'value' => $item['value']
                    ]);
                }
            }
        }

        return $this->render('index', [
            'incomeTotal' => $incomeTotal,
            'expensesTotal' => $expensesTotal,
            'month' => $month,
            'monthlyIncome' => $monthlyIncome,
            'monthlyExpenses' => $monthlyExpenses,
            'monthlyBalance' => $monthlyBalance,
            'expensesCategory' => $expensesCategory,
            'incomeSource' => $incomeSource
        ]);
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
