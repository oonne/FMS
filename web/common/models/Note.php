<?php

namespace common\models;

class Note extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%note}}';
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
            [['note_title', 'note_content'], 'required', 'on' => ['creation']],

            [['note_title'], 'string', 'max' => 255],
            [['note_content'], 'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'Note ID',
            'note_title' => '标题',
            'note_content' => '内容',
            'created_at' => '创建时间',
            'updated_at' => '更新时间',
            'last_editor' => '最后更新帐号',
            'dateRange' => '日期',
        ];
    }
}