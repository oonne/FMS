<?php
use yii\helpers\Html;
use yii\widgets\DetailView;
use common\models\User;

$this->title = $model->income_item;
?>
<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><?= Html::encode($this->title) ?></h1>
    </div>
</div>

<?= DetailView::widget([
    'model' => $model,
    'attributes' => [
        'income_money',
        'income_date',
        [
            'attribute' => 'income_source',
            'format' => 'html',
            'value' => $model->source ? $model->source->income_source : Html::tag('b', '收入来源错误', ['class' => 'text-danger']),
        ],
        [
            'attribute' => 'income_remark',
            'format' => 'html',
            'value' => $model->income_remark
        ],
        'updated_at',
        [
            'attribute' => 'last_editor',
            'format' => 'html',
            'value' => User::findIdentity($model->last_editor)->nickname
        ]
    ]
]) ?>