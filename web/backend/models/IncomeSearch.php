<?php

namespace backend\models;

use Yii;
use yii\data\ActiveDataProvider;
use common\helpers\Query as QueryHelper;
use common\models\Income;

class IncomeSearch extends Income
{
    public $dateRange;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['income_money', 'income_item', 'income_handler', 'income_remark', 'dateRange'], 'safe'],
        ];
    }

    public function search($params)
    {
        $query = Income::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['income_date' => SORT_DESC, 'updated_at' => SORT_DESC]]
        ]);

        $data = [];

        if (!($this->load($params) && $this->validate())) {
            $data['dataProvider'] = $dataProvider;
            $data['summary'] = $this->_summary();
            return $data;
        }

        QueryHelper::addDigitalFilter($query, 'income_money', $this->income_money);

        $dates = explode('~', $this ->dateRange, 2);
        if (count($dates) == 2) {
            $query->andFilterWhere(['>=', 'income_date', $dates[0] ])
                  ->andFilterWhere(['<=', 'income_date', $dates[1] ]);
        }

        $query->andFilterWhere(['like', 'income_item', $this->income_item])
              ->andFilterWhere(['income_handler' => $this->income_handler])
              ->andFilterWhere(['like', 'income_remark', $this->income_remark]);

        $data['dataProvider'] = $dataProvider;
        $data['summary'] = $this->_summary();
        return $data;
    }

    public function _summary()
    {
        $query = Income::find()
                    ->select(['summary' => 'SUM(income_money)'])
                    ->from([Income::tableName()]);

        if ($this->income_money) {
            QueryHelper::addDigitalFilter($query, 'income_money', $this->income_money);
        }

        $dates = explode('~', $this ->dateRange, 2);
        if (count($dates) == 2) {
            $query->andFilterWhere(['>=', 'income_date', $dates[0] ])
                  ->andFilterWhere(['<=', 'income_date', $dates[1] ]);
        }

        if ($this->income_item) {
            $query->andWhere(['like', 'income_item', $this->income_item]);
        }
        if ($this->income_handler) {
            $query->andWhere(['income_handler' => $this->income_handler]);
        }
        if ($this->income_remark) {
            $query->andWhere(['like', 'income_remark', $this->income_remark]);
        }                

        $data = $query->createCommand()->queryOne();

        return $data['summary'];
    }

}
