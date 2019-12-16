<?php

use yii\db\Migration;
use common\models\User;
use common\models\Handler;
use common\models\Category;

class m130524_201442_init extends Migration
{
    public function up()
    {
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        // Crear user table
        $this->createTable('{{%user}}', [
            'id' => $this->primaryKey(),
            'username' => $this->string()->notNull()->unique(),
            'nickname' => $this->string()->notNull(),
            'password_hash' => $this->string()->notNull(),
            'auth_key' => $this->string(32)->notNull(),
            'access_token' => $this->string(32)->notNull(),
            'status' => $this->smallInteger()->notNull()->defaultValue(10),
            'created_at' => $this->datetime()->notNull(),
            'updated_at' => $this->timestamp()->notNull(),
        ], $tableOptions);

        // Initialize the user admin
        $admin = new User();
        $admin->username = 'admin';
        $admin->nickname = '管理员';
        $admin->setPassword($admin->username);
        $admin->generateAuthKey();
        $admin->enable();
        $admin->created_at = $admin->updated_at = date('Y-m-d H:i:s', time());

        $this->insert('{{%user}}',$admin->toArray());

        // Crear handler table
        $this->createTable('{{%handler}}', [
            'id' => $this->primaryKey(),
            'handler_name' => $this->string(32)->notNull(),
            'created_at' => $this->datetime()->notNull(),
            'updated_at' => $this->timestamp()->notNull(),
            'last_editor' => $this->integer()->notNull(),
        ], $tableOptions);

        // Initialize the handler Default
        $defaultCategory = new Handler();
        $defaultCategory->handler_name = '经手人';
        $defaultCategory->created_at = $defaultCategory->updated_at = date('Y-m-d H:i:s', time());
        $defaultCategory->last_editor = 1;

        $this->insert('{{%handler}}',$defaultCategory->toArray());

        // Crear category table
        $this->createTable('{{%category}}', [
            'id' => $this->primaryKey(),
            'category_name' => $this->string(32)->notNull(),
            'category_sequence' => $this->integer()->notNull(),
            'created_at' => $this->datetime()->notNull(),
            'updated_at' => $this->timestamp()->notNull(),
            'last_editor' => $this->integer()->notNull(),
        ], $tableOptions);

        // Initialize the category Default
        $defaultCategory = new Category();
        $defaultCategory->category_name = '默认分类';
        $defaultCategory->category_sequence = 1;
        $defaultCategory->created_at = $defaultCategory->updated_at = date('Y-m-d H:i:s', time());
        $defaultCategory->last_editor = 1;

        $this->insert('{{%category}}',$defaultCategory->toArray());

        // Crear expenses table
        $this->createTable('{{%expenses}}', [
            'id' => $this->primaryKey(),
            'expenses_item' => $this->string(32)->notNull(),
            'expenses_category' => $this->integer()->notNull(),
            'expenses_money' => $this->decimal(8,2)->notNull(),
            'expenses_date' => $this->date()->notNull(),
            'expenses_handler' => $this->integer()->notNull(),
            'expenses_remark' => $this->string(255)->notNull(),
            'created_at' => $this->datetime()->notNull(),
            'updated_at' => $this->timestamp()->notNull(),
            'last_editor' => $this->integer()->notNull(),
        ], $tableOptions);

        // Crear income table
        $this->createTable('{{%income}}', [
            'id' => $this->primaryKey(),
            'income_item' => $this->string(32)->notNull(),
            'income_money' => $this->decimal(8,2)->notNull(),
            'income_date' => $this->date()->notNull(),
            'income_handler' => $this->integer()->notNull(),
            'income_remark' => $this->string(255)->notNull(),
            'created_at' => $this->datetime()->notNull(),
            'updated_at' => $this->timestamp()->notNull(),
            'last_editor' => $this->integer()->notNull(),
        ], $tableOptions);

        // Crear recycle table
        $this->createTable('{{%recycle}}', [
            'id' => $this->primaryKey(),
            'recycle_type' => $this->string(32)->notNull(),
            'recycle_content' => $this->string(512)->notNull(),
            'created_at' => $this->datetime()->notNull(),
            'last_editor' => $this->integer()->notNull(),
        ], $tableOptions);
    }

    public function down()
    {
        $this->dropTable('{{%user}}');
        $this->dropTable('{{%handler}}');
        $this->dropTable('{{%category}}');
        $this->dropTable('{{%expenses}}');
        $this->dropTable('{{%income}}');
        $this->dropTable('{{%recycle}}');
    }
}
