<?php
namespace backend\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\web\BadRequestHttpException;
use common\models\Diary;
use backend\models\DiarySearch;
use common\models\Recycle;

class DiarysuperController extends Controller
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
        $searchModel = new DiarySearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    public function actionAddDiary()
    {
        $model = new Diary();
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

    public function actionUpdateDiary($id)
    {
        $model = Diary::findOne($id);

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

    public function actionViewDiary($id)
    {
        $model = Diary::findOne($id);

        if (!$model) {
            Yii::$app->session->setFlash('danger', '查无记录');
            return $this->redirect(['index']);
        }

        return $this->render('view', [
            'model' => $model
        ]);
    }

    public function actionDeleteDiary($id)
    {
        $model = Diary::findOne($id);

        if (!$model) {
            Yii::$app->session->setFlash('danger', '查无记录');
            return $this->redirect(['index']);
        }

        $transaction = Yii::$app->db->beginTransaction();
        $recycleContent = $model->diary_date ."  \n". $model->diary_content;
        $recycle = new Recycle();
        $recycle->recycle_type = Recycle::TYPE_DIAYR;
        $recycle->recycle_content = $recycleContent;
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