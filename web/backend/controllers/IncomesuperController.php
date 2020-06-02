<?php
namespace backend\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\web\BadRequestHttpException;
use common\models\Income;
use backend\models\IncomeSearch;
use common\models\Recycle;

class IncomesuperController extends Controller
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
        $searchModel = new IncomeSearch();
        $data = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $data['dataProvider'],
            'summary' => $data['summary'],
        ]);
    }

    public function actionAddIncome()
    {
        $model = new Income();
        $model->setScenario('creation');

        if ($model->load(Yii::$app->request->post())) {
            if ($model->validate()) {
                $model->last_editor = Yii::$app->user->id;
                if ($model->save(false)) {
                    Yii::$app->session->setFlash('success', '添加成功！');
                    return $this->redirect(['index']);
                } else {
                    Yii::$app->session->setFlash('danger', '添加失败。');
                }
            }
        }

        return $this->render('form', [
            'model' => $model
        ]);
    }

    public function actionUpdateIncome($id)
    {
        $model = Income::findOne($id);

        if (!$model) {
            Yii::$app->session->setFlash('danger', '查无记录');
            return $this->redirect(['index']);
        }

        if ($model->load(Yii::$app->request->post())) {
            if ($model->validate()) {
                $model->last_editor = Yii::$app->user->id;
                if ($model->save(false)) {
                    Yii::$app->session->setFlash('success', '更新成功！');
                    return $this->redirect(['index']);
                } else {
                    Yii::$app->session->setFlash('danger', '更新失败。');
                }
            }
        }

        return $this->render('form', [
            'model' => $model,
        ]);
    }

    public function actionViewIncome($id)
    {
        $model = Income::findOne($id);

        if (!$model) {
            Yii::$app->session->setFlash('danger', '查无记录');
            return $this->redirect(['index']);
        }

        return $this->render('view', [
            'model' => $model
        ]);
    }
    
    public function actionDeleteIncome($id)
    {
        $model = Income::findOne($id);

        if (!$model) {
            Yii::$app->session->setFlash('danger', '查无记录');
            return $this->redirect(['index']);
        }

        $transaction = Yii::$app->db->beginTransaction();
        $recycleContent = '<p>项目：'. $model->income_item .'</p>';
        $recycleContent = $recycleContent .'<p>金额：'. $model->income_money .'</p>';
        $recycleContent = $recycleContent .'<p>时间：'. $model->income_date .'</p>';
        $recycleContent = $recycleContent .'<p>收入来源：'. ($model->source ? $model->source->income_source : '收入来源错误' ) .'</p>';
        $recycleContent = $recycleContent .'<p>备注：'. $model->income_remark .'</p>';
        $recycle = new Recycle();
        $recycle->recycle_type = Recycle::TYPE_INCOME;
        $recycle->recycle_content = $recycleContent;
        $recycle->last_editor = Yii::$app->user->id;
        if($recycle->validate()&&$recycle->save(false)){
            try {
                if (!$model->delete()) {
                    throw new \Exception('删除失败！');
                }

                $transaction->commit();
                Yii::$app->session->setFlash('success', '删除成功！');
                return $this->redirect(['index']);
            } catch (\Exception $e) {
                $transaction->rollBack();
                Yii::$app->session->setFlash('danger', $e->getMessage());
            }
        }else{
            $transaction->rollBack();
            Yii::$app->session->setFlash('danger', '回收失败');
        }

        return $this->redirect(['index']);
    }
}
