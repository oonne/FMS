<?php

namespace common\models;

class Diary extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%diary}}';
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            parent::timestampBehavior()
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['diary_date', 'diary_content'], 'required', 'on' => ['creation']],

            [['diary_date'], 'date', 'format' => 'yyyy-MM-dd'],
            [['diary_content'], 'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'Diary ID',
            'diary_date' => '日期',
            'diary_content' => '内容',
            'created_at' => '创建时间',
            'updated_at' => '更新时间',
            'last_editor' => '最后更新帐号',
        ];
    }
}