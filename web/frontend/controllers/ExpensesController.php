<?php

namespace frontend\controllers;

use Yii;
use common\filters\auth\HeaderParamAuth;
use yii\data\ActiveDataProvider;
use common\models\Expenses;
use common\models\Category;
use common\models\Handler;
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

        // Category & Handler
        $extra = [];
        
        $category = Category::find()
            ->select(['id', 'category_name'])
            ->all();
        $extra['category'] = $category;

        $handler = Handler::find()
            ->select(['id', 'handler_name'])
            ->all();
        $extra['handler'] = $handler;

        return [
            'Ret' => 0,
            'Data' => $data,
            'Meta' => $meta,
            'Extra' => $extra,
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
                        'Ret' => 0,
                        'Data' => $model->toArray(['id', 'expenses_category', 'expenses_date', 'expenses_handler', 'expenses_item', 'expenses_money', 'expenses_remark'])
                    ];
                } else {
                    return [
                        'Ret' => 3,
                        'Data' => [
                            'errors' => ['添加失败']
                        ]
                    ];
                }
            } else {
                return [
                    'Ret' => 2,
                    'Data' => [
                        'errors' => ['填写信息有误']
                    ]
                ];                
            }
        }

        return [
            'Ret' => 1,
            'Data' => [
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
                'Ret' => 1,
                'Data' => [
                    'errors' => ['查无记录']
                ]
            ];
        }

        if ($model->load($expenses, '') && $model->validate()) {
            $model->last_editor = Yii::$app->user->id;
            if ($model->save(false)) {
                return [
                    'Ret' => 0,
                    'Data' => '保存成功',
                ];
            } else {
                return [
                    'Ret' => 2,
                    'Data' => [
                        'errors' => ['保存失败']
                    ]
                ];
            }
        }

        return [
            'Ret' => 3,
            'Data' => [
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
                'Ret' => 1,
                'Data' => [
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
        if($recycle->validate()&&$recycle->save(false)){
            try {
                if (!$model->delete()) {
                    throw new \Exception('删除失败！');
                }
                $transaction->commit();
                return [
                    'Ret' => 0,
                    'Data' => '删除成功'
                ];
            } catch (\Exception $e) {
                $transaction->rollBack();
                return [
                    'Ret' => 3,
                    'Data' => [
                        'errors' => [$e->getMessage()]
                    ]
                ];
            }
        }else{
            $transaction->rollBack();
            return [
                'Ret' => 2,
                'Data' => [
                    'errors' => ['回收失败']
                ]
            ];
        }
    }

}