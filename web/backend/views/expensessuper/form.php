<?php
use yii\helpers\Html;
use yii\bootstrap\ActiveForm;
use common\models\Category;
use common\models\Handler;
use yii\jui\DatePicker;
use backend\widgets\Alert;

$this->title = $model->isNewRecord ? '添加' : '修改';
?>
<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><?= Html::encode($this->title) ?></h1>
    </div>
</div>
<div class="row">
    <div class="col-lg-12">
        <div class="alert-wrapper">
            <?= Alert::widget() ?>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-lg-6">
    <?php $form = ActiveForm::begin(); ?>
        <?= $form->field($model, 'expenses_item') ?>
        <?= $form->field($model, 'expenses_category')->dropDownList(Category::getKeyValuePairs()) ?>
        <?= $form->field($model, 'expenses_money') ?>
        <?= $form->field($model, 'expenses_date')->widget(DatePicker::className(), [
            'options' => ['class' => 'form-control'],
            'clientOptions' => ['firstDay' => 0],
            'dateFormat' => 'yyyy-MM-dd'
        ]) ?>
        <?= $form->field($model, 'expenses_handler')->dropDownList(Handler::getKeyValuePairs()) ?>
        <?= $form->field($model, 'expenses_remark') ?>
        <div class="form-group">
            <?= Html::submitButton('保存', ['class' => 'btn btn-success']) ?>
        </div>
    <?php ActiveForm::end(); ?>
    </div>
</div>