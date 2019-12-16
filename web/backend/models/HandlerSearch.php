<?php

namespace backend\models;

use yii\data\ActiveDataProvider;
use common\models\Handler;

class HandlerSearch extends Handler
{

    public function rules()
    {
        // only fields in rules() are searchable
        return [
            [['handler_name'], 'safe']
        ];
    }

    public function search($params)
    {
        $query = Handler::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['id' => SORT_DESC]]
        ]);

        // load the seach form data and validate
        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }

        // adjust the query by adding the filters
        $query->andFilterWhere(['like', 'handler_name', $this->category_name]);

        return $dataProvider;
    }
}