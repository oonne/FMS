<?php

namespace backend\models;

use yii\data\ActiveDataProvider;
use common\models\Recycle;

class RecycleSearch extends Recycle
{
    public $dateRange;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['recycle_type', 'recycle_content', 'dateRange'], 'string'],
        ];
    }

    public function search($params)
    {
        $query = Recycle::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['created_at' => SORT_DESC]]
        ]);

        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }

        $recycleTime = explode('~', $this ->dateRange, 2);
        if (count($recycleTime) == 2){
            $query->andFilterWhere(['>=', 'created_at', $recycleTime[0] ])
                  ->andFilterWhere(['<=', "DATE_FORMAT(`created_at`, '%Y-%m-%d')", $recycleTime[1] ]);
        }

        // grid filtering conditions
        $query->andFilterWhere(['recycle_type' => $this->recycle_type])
              ->andFilterWhere(['like', 'recycle_content', $this->recycle_content]);

        return $dataProvider;
    }
}
