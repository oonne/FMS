<?php

namespace common\models;

class Income extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%income}}';
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
            [['income_item', 'income_money', 'income_date', 'income_handler'], 'required', 'on' => ['creation']],

            [['income_item'], 'string', 'max' => 32],
            [['income_money'], 'number'],
            [['income_date'], 'date', 'format' => 'yyyy-mm-dd'],

            [
                ['income_handler'],
                'exist',
                'targetClass' => Handler::className(),
                'targetAttribute' => 'id'
            ],

            [['income_remark'], 'string', 'max' => 255],
            [['income_remark'], 'default','value' => ''],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'Income ID',
            'income_item' => '项目',
            'income_money' => '金额',
            'income_date' => '日期',
            'income_handler' => '经手人',
            'income_remark' => '备注',
            'created_at' => '创建时间',
            'updated_at' => '更新时间',
            'last_editor' => '最后更新帐号',
            'dateRange' => '日期',
        ];
    }

    public function getHandler()
    {
        return $this->hasOne(Handler::className(), ['id' => 'income_handler']);
    }
}