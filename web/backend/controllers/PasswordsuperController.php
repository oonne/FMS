<?php
namespace backend\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\web\Response;
use yii\web\BadRequestHttpException;
use common\models\Password;
use backend\models\PasswordSearch;
use common\models\Recycle;

class PasswordsuperController extends Controller
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
        $searchModel = new PasswordSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    public function actionAddPassword()
    {
        $model = new Password();
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

    public function actionUpdatePassword($id)
    {
        $model = Password::findOne($id);

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

    public function actionSavePassword($id)
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $model = Password::findOne($id);
        if (!$model) {
            throw new BadRequestHttpException('请求错误！');
        }

        $form = Yii::$app->request->post();
        if ($model->load(Yii::$app->request->post(), '')) {
            if ($model->validate()) {
                $model->last_editor = Yii::$app->user->id;
                if ($model->save(false)) {
                    return [
                        'status' => 'success',
                    ];
                } else {
                    return [
                        'status' => 'fail',
                        'data' => [
                            'message' => '保存出错！'
                        ]
                    ];
                }
            }
        }
    }

    public function actionViewPassword($id)
    {
        $model = Password::findOne($id);

        if (!$model) {
            Yii::$app->session->setFlash('danger', '查无记录');
            return $this->redirect(['index']);
        }

        return $this->render('view', [
            'model' => $model
        ]);
    }

    public function actionDeletePassword($id)
    {
        $model = Password::findOne($id);

        if (!$model) {
            Yii::$app->session->setFlash('danger', '查无记录');
            return $this->redirect(['index']);
        }

        $transaction = Yii::$app->db->beginTransaction();
        $recycleContent = '<p>密码项：'. $model->password_item .'</p>';
        $recycleContent = $recycleContent .'<p>用户名：'. $model->user_name .'</p>';
        $recycleContent = $recycleContent .'<p>密码：'. $model->password .'</p>';
        $recycleContent = $recycleContent .'<p>备注：'. $model->password_remark .'</p>';
        $recycle = new Recycle();
        $recycle->recycle_type = Recycle::TYPE_PASSWORD;
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