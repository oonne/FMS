<?php

namespace frontend\controllers;

use Yii;
use common\filters\HeaderParamAuth;
use yii\data\ActiveDataProvider;
use common\models\Note;
use common\models\Recycle;

class NoteController extends Controller
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
        $query = Note::find()
            ->select(['id', 'note_title', 'note_content']);

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['updated_at' => SORT_DESC]]
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
        $model = new Note();
        $model->setScenario('creation');

        if ($model->load(Yii::$app->request->post(), '')) {
            if ($model->validate()) {
                $model->last_editor = Yii::$app->user->id;
                if ($model->save(false)) {
                    return [
                        'code' => 0,
                        'data' => $model->toArray(['id', 'note_title', 'note_content'])
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
        $note = Yii::$app->request->post();
        $id = $note['id'];
        $model = Note::findOne($id);

        if (!$model) {
            return [
                'code' => 1,
                'data' => [
                    'errors' => ['查无记录']
                ]
            ];
        }

        if ($model->load($note, '') && $model->validate()) {
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
        $note = Yii::$app->request->post();
        $id = $note['id'];
        $model = Note::findOne($id);

        if (!$model) {
            return [
                'code' => 1,
                'data' => [
                    'errors' => ['查无记录']
                ]
            ];
        }

        $transaction = Yii::$app->db->beginTransaction();
        $recycleContent = '<p>'. $model->note_title .'</p>';
        $recycleContent = $recycleContent .'<p>'. $model->note_content .'</p>';
        $recycle = new Recycle();
        $recycle->recycle_type = Recycle::TYPE_NOTE;
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