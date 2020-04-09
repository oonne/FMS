<?php

namespace backend\models;

use Yii;
use yii\data\ActiveDataProvider;
use common\models\Diary;

class DiarySearch extends Diary
{
    public $dateRange;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['diary_date', 'diary_content'], 'safe'],
        ];
    }

    public function search($params)
    {
        $query = Diary::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['updated_at' => SORT_DESC]]
        ]);

        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }

        $query->andFilterWhere(['like', 'diary_content', $this->diary_content])
              ->andFilterWhere(['diary_date' => $this->diary_date]);

        return $dataProvider;
    }

}
