<?php

namespace common\models;

use Yii;
use yii\db\Query;

class IncomeSource extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%income_source}}';
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
            [['income_source'], 'required', 'on' => ['creation']],
            [['income_source'], 'string', 'max' => 32],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'Handler ID',
            'income_source' => '收入来源',
            'created_at' => '创建时间',
            'updated_at' => '修改时间',
            'last_editor' => '最后修改人ID',
        ];
    }

    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->getPrimaryKey();
    }

    /**
     * @inheritdoc
     */
    public static function getKeyValuePairs()
    {
        $query = (new Query())->select(['id', 'income_source'])
            ->from([self::tableName()]);

        list($sql, $params) = Yii::$app->db->getQueryBuilder()->build($query);
        $data = Yii::$app->db->createCommand($sql)->queryAll(\PDO::FETCH_KEY_PAIR);
        return $data;
    }

    public static function getSourceList()
    {
        $query = (new Query())->select(['id', 'income_source'])
            ->from([self::tableName()]);

        list($sql, $params) = Yii::$app->db->getQueryBuilder()->build($query);
        $data = Yii::$app->db->createCommand($sql)->queryAll();
        return $data;
    }
}