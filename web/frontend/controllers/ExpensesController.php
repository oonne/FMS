<?php

namespace frontend\controllers;

use Yii;
use common\filters\HeaderParamAuth;
use yii\data\ActiveDataProvider;
use common\models\Expenses;
use common\models\Recycle;

class ExpensesController extends Controller
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
            'add' => ['post'],
            'update' => ['post'],
            'delete' => ['post'],
        ];
    }

    public function actionIndex()
    {
        $query = Expenses::find()
            ->select(['id', 'expenses_date', 'expenses_item', 'expenses_money', 'expenses_category', 'expenses_handler', 'expenses_remark']);

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['expenses_date' => SORT_DESC, 'updated_at' => SORT_DESC]]
        ]);

        $data = $dataProvider->getModels();
        $meta = [
            'totalCount' => $dataProvider->pagination->totalCount,
            'pageCount' => $dataProvider->pagination->getPageCount(),
            'currentPage' => $dataProvider->pagination->getPage() + 1,
            'perPage' => $dataProvider->pagination->getPageSize(),
        ];

        return [
            'code' => 0,
            'data' => $data,
            'meta' => $meta,
        ];
    }

    public function actionAdd()
    {
        $model = new Expenses();
        $model->setScenario('creation');

        if ($model->load(Yii::$app->request->post(), '')) {
            if ($model->validate()) {
                $model->last_editor = Yii::$app->user->id;
                if ($model->save(false)) {
                    return [
                        'code' => 0,
                        'data' => $model->toArray(['id', 'expenses_category', 'expenses_date', 'expenses_handler', 'expenses_item', 'expenses_money', 'expenses_remark'])
                    ];
                } else {
                    return [
                        'code' => 3,
                        'data' => [
                            'errors' => ['添加失败']
                        ]
                    ];
                }
            } else {
                return [
                    'code' => 2,
                    'data' => [
                        'errors' => ['填写信息有误']
                    ]
                ];                
            }
        }

        return [
            'code' => 1,
            'data' => [
                'errors' => ['加载失败']
            ]
        ];
    }

    public function actionUpdate()
    {
        $expenses = Yii::$app->request->post();
        $id = $expenses['id'];
        $model = Expenses::findOne($id);

        if (!$model) {
            return [
                'code' => 1,
                'data' => [
                    'errors' => ['查无记录']
                ]
            ];
        }

        if ($model->load($expenses, '') && $model->validate()) {
            $model->last_editor = Yii::$app->user->id;
            if ($model->save(false)) {
                return [
                    'code' => 0,
                    'data' => '保存成功',
                ];
            } else {
                return [
                    'code' => 2,
                    'data' => [
                        'errors' => ['保存失败']
                    ]
                ];
            }
        }

        return [
            'code' => 3,
            'data' => [
                'errors' => ['更新失败']
            ]
        ];
    }

    public function actionDelete()
    {
        $expenses = Yii::$app->request->post();
        $id = $expenses['id'];
        $model = Expenses::findOne($id);

        if (!$model) {
            return [
                'code' => 1,
                'data' => [
                    'errors' => ['查无记录']
                ]
            ];
        }

        $transaction = Yii::$app->db->beginTransaction();
        $recycleContent = '<p>项目：'. $model->expenses_item .'</p>';
        $recycleContent = $recycleContent .'<p>分类：'. ($model->category ? $model->category->category_name : '分类错误' ).'</p>';
        $recycleContent = $recycleContent .'<p>金额：'. $model->expenses_money .'</p>';
        $recycleContent = $recycleContent .'<p>时间：'. $model->expenses_date .'</p>';
        $recycleContent = $recycleContent .'<p>经手人：'. ($model->handler ? $model->handler->handler_name : '经手人错误' ) .'</p>';
        $recycleContent = $recycleContent .'<p>备注：'. $model->expenses_remark .'</p>';
        $recycle = new Recycle();
        $recycle->recycle_type = Recycle::TYPE_EXPENSES;
        $recycle->recycle_content = $recycleContent;
        $recycle->last_editor = Yii::$app->user->id;
        if($recycle->validate()&&$recycle->save(false)){
            try {
                if (!$model->delete()) {
                    throw new \Exception('删除失败！');
                }
                $transaction->commit();
                return [
                    'code' => 0,
                    'data' => '删除成功'
                ];
            } catch (\Exception $e) {
                $transaction->rollBack();
                return [
                    'Ret' => 3,
                    'data' => [
                        'errors' => [$e->getMessage()]
                    ]
                ];
            }
        }else{
            $transaction->rollBack();
            return [
                'Ret' => 2,
                'data' => [
                    'errors' => ['回收失败']
                ]
            ];
        }
    }

}