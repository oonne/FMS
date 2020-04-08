<?php

namespace backend\models;

use Yii;
use yii\data\ActiveDataProvider;
use common\models\Note;

class NoteSearch extends Note
{
    public $dateRange;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['note_title', 'note_content', 'dateRange'], 'safe'],
        ];
    }

    public function search($params)
    {
        $query = Note::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['updated_at' => SORT_DESC]]
        ]);

        $data = [];

        if (!($this->load($params) && $this->validate())) {
            $data['dataProvider'] = $dataProvider;
            return $data;
        }

        $dates = explode('~', $this ->dateRange, 2);
        if (count($dates) == 2){
            $query->andFilterWhere(['>=', 'updated_at', $dates[0] ])
                  ->andFilterWhere(['<=', "DATE_FORMAT(`updated_at`, '%Y-%m-%d')", $dates[1] ]);
        }

        $query->andFilterWhere(['like', 'note_title', $this->note_title])
              ->andFilterWhere(['like', 'note_content', $this->note_content]);

        $data['dataProvider'] = $dataProvider;
        return $data;
    }

}
