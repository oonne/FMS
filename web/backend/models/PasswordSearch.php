<?php

namespace backend\models;

use Yii;
use yii\data\ActiveDataProvider;
use common\models\Password;

class PasswordSearch extends Password
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['password_item', 'user_name', 'password_remark'], 'safe'],
        ];
    }

    public function search($params)
    {
        $query = Password::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['updated_at' => SORT_DESC]]
        ]);

        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }

        $query->andFilterWhere(['like', 'password_item', $this->password_item])
              ->andFilterWhere(['like', 'user_name', $this->user_name])
              ->andFilterWhere(['like', 'password_remark', $this->password_remark]);

        return $dataProvider;
    }

}
