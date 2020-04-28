<?php

namespace frontend\controllers;

use Yii;
use common\filters\HeaderParamAuth;
use yii\data\ActiveDataProvider;
use common\models\Income;
use common\models\IncomeSource;
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

    public function actionIndex()
    {
        $query = Income::find()
            ->select(['id', 'income_item', 'income_date', 'income_money', 'income_source', 'income_remark']);

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

        // IncomeSource
        $extra = [];

        $handler = IncomeSource::find()
            ->select(['id', 'income_source'])
            ->all();
        $extra['source'] = $handler;

        return [
            'code' => 0,
            'data' => $data,
            'meta' => $meta,
            'extra' => $extra,
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
                        'code' => 0,
                        'data' => $model->toArray(['id', 'income_date', 'income_source', 'income_item', 'income_money', 'income_remark'])
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
        $income = Yii::$app->request->post();
        $id = $income['id'];
        $model = Income::findOne($id);

        if (!$model) {
            return [
                'code' => 1,
                'data' => [
                    'errors' => ['查无记录']
                ]
            ];
        }

        if ($model->load($income, '') && $model->validate()) {
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
        $income = Yii::$app->request->post();
        $id = $income['id'];
        $model = Income::findOne($id);

        if (!$model) {
            return [
                'code' => 1,
                'data' => [
                    'errors' => ['查无记录']
                ]
            ];
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
                    'code' => 3,
                    'data' => [
                        'errors' => [$e->getMessage()]
                    ]
                ];
            }
        }else{
            $transaction->rollBack();
            return [
                'code' => 2,
                'data' => [
                    'errors' => ['回收失败']
                ]
            ];
        }
    }

}