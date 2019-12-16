<?php
use yii\helpers\Html;
use yii\widgets\DetailView;
use common\models\User;

$this->title = $model->expenses_item;
?>
<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><?= Html::encode($this->title) ?></h1>
    </div>
</div>

<?= DetailView::widget([
    'model' => $model,
    'attributes' => [
        'expenses_money',
        'expenses_date',
        [
            'attribute' => 'expenses_category',
            'format' => 'html',
            'value' => $model->category ? $model->category->category_name : Html::tag('b', '分类错误', ['class' => 'text-danger']),
        ],
        [
            'attribute' => 'expenses_handler',
            'format' => 'html',
            'value' => $model->handler ? $model->handler->handler_name : Html::tag('b', '经手人错误', ['class' => 'text-danger']),
        ],
        [
            'attribute' => 'expenses_remark',
            'format' => 'html',
            'value' => $model->expenses_remark
        ],
        'updated_at',
        [
            'attribute' => 'last_editor',
            'format' => 'html',
            'value' => User::findIdentity($model->last_editor)->nickname
        ]
    ]
]) ?>