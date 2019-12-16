<?php

namespace common\models;

class Recycle extends ActiveRecord
{
    const TYPE_EXPENSES  = 'Expenses';
    const TYPE_INCOME    = 'Income';

    private static $_typeList;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%recycle}}';
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
            [
                ['recycle_type'],
                'in',
                'range' => [self::TYPE_EXPENSES, self::TYPE_INCOME]
            ],
            [['recycle_content'], 'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'Recycle ID',
            'recycle_type' => '类型',
            'recycle_content' => '关键内容',
            'created_at' => '删除时间',
            'last_editor' => '删除的帐号id',
            'dateRange' => '删除时间',
        ];
    }

    /**
     * @inheritdoc
     */
    public static function getTypeList()
    {
        if (self::$_typeList === null) {
            self::$_typeList = [
                self::TYPE_EXPENSES  => '消费',
                self::TYPE_INCOME    => '收入',
            ];
        }

        return self::$_typeList;
    }

    public function getTypeMsg()
    {
        $list = static::getTypeList();

        return $list[$this->recycle_type] ?? null;
    }
}