<?php

namespace common\models;

class Recycle extends ActiveRecord
{
    const TYPE_EXPENSES  = 'Expenses';
    const TYPE_INCOME    = 'Income';
    const TYPE_NOTE      = 'Note';
    const TYPE_DIARY     = 'Diary';
    const TYPE_PASSWORD  = 'Password';

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
                'range' => [self::TYPE_EXPENSES, self::TYPE_INCOME, self::TYPE_NOTE, self::TYPE_DIARY, self::TYPE_PASSWORD]
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
                self::TYPE_NOTE      => '记事本',
                self::TYPE_DIARY     => '日记',
                self::TYPE_PASSWORD  => '密码',
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