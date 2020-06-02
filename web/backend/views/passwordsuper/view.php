<?php
use yii\helpers\Html;
use yii\widgets\DetailView;

$this->title = '密码详情';
?>
<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><?= Html::encode($this->title) ?></h1>
    </div>
</div>

<?= DetailView::widget([
    'model' => $model,
    'attributes' => [
        'password_item',
        'user_name',
        'password',
        [
            'attribute' => 'password_remark',
            'format' => 'html',
            'value' => Html::tag('div', nl2br($model->password_remark))
        ],
        'updated_at'
    ]
]) ?>