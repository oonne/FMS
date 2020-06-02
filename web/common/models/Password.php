<?php

namespace common\models;

class Password extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%password}}';
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
            [['password_item', 'user_name', 'password'], 'required', 'on' => ['creation']],

            [['password_item','user_name'], 'string', 'max' => 32],
            [['password'], 'string', 'max' => 255],
            [['password_remark'], 'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'Password ID',
            'password_item' => '密码项',
            'user_name' => '用户名',
            'password' => '密码',
            'password_remark' => '备注',
            'created_at' => '创建时间',
            'updated_at' => '更新时间',
            'last_editor' => '最后更新帐号',
        ];
    }
}