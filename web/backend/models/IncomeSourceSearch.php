<?php

namespace backend\models;

use yii\data\ActiveDataProvider;
use common\models\IncomeSource;

class IncomeSourceSearch extends IncomeSource
{

    public function rules()
    {
        // only fields in rules() are searchable
        return [
            [['income_source'], 'safe']
        ];
    }

    public function search($params)
    {
        $query = IncomeSource::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['id' => SORT_DESC]]
        ]);

        // load the seach form data and validate
        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }

        // adjust the query by adding the filters
        $query->andFilterWhere(['like', 'income_source', $this->income_source]);

        return $dataProvider;
    }
}