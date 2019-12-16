<?php

namespace frontend\controllers;

use Yii;
use common\filters\auth\HeaderParamAuth;
use yii\data\ActiveDataProvider;
use common\models\Income;
use common\models\Handler;
use common\models\Recycle;

class IncomeController extends Controller
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

    public function actionAdd()
    {
        $model = new Income();
        $model->setScenario('creation');

        if ($model->load(Yii::$app->request->post(), '')) {
            if ($model->validate()) {
                $model->last_editor = Yii::$app->user->id;
                if ($model->save(false)) {
                    return [
                        'Ret' => 0,
                        'Data' => $model->toArray(['id', 'income_date', 'income_handler', 'income_item', 'income_money', 'income_remark'])
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

    public function actionIndex()
    {
        $query = Income::find()
            ->select(['id', 'income_item', 'income_date', 'income_money', 'income_handler', 'income_remark']);

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['income_date' => SORT_DESC, 'updated_at' => SORT_DESC]]
        ]);

        $data = $dataProvider->getModels();
        $meta = [
            'totalCount' => $dataProvider->pagination->totalCount,
            'pageCount' => $dataProvider->pagination->getPageCount(),
            'currentPage' => $dataProvider->pagination->getPage() + 1,
            'perPage' => $dataProvider->pagination->getPageSize(),
        ];

        // Handler
        $extra = [];

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


    public function actionUpdate()
    {
        $income = Yii::$app->request->post();
        $id = $income['id'];
        $model = Income::findOne($id);

        if (!$model) {
            return [
                'Ret' => 1,
                'Data' => [
                    'errors' => ['查无记录']
                ]
            ];
        }

        if ($model->load($income, '') && $model->validate()) {
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
        $income = Yii::$app->request->post();
        $id = $income['id'];
        $model = Income::findOne($id);

        if (!$model) {
            return [
                'Ret' => 1,
                'Data' => [
                    'errors' => ['查无记录']
                ]
            ];
        }

        $transaction = Yii::$app->db->beginTransaction();
        $recycleContent = '<p>项目：'. $model->income_item .'</p>';
        $recycleContent = $recycleContent .'<p>金额：'. $model->income_money .'</p>';
        $recycleContent = $recycleContent .'<p>时间：'. $model->income_date .'</p>';
        $recycleContent = $recycleContent .'<p>经手人：'. ($model->handler ? $model->handler->handler_name : '经手人错误' ) .'</p>';
        $recycleContent = $recycleContent .'<p>备注：'. $model->income_remark .'</p>';
        $recycle = new Recycle();
        $recycle->recycle_type = Recycle::TYPE_INCOME;
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