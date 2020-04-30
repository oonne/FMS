<?php
use yii\helpers\Html;
use yii\bootstrap\ActiveForm;
use yii\jui\DatePicker;
use yii\helpers\Url;
use backend\widgets\Alert;

$isNewRecord = $model->isNewRecord;
$this->title = $isNewRecord ? '添加' : $model->diary_date;
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
    <div class="col-lg-12">
    <?php $form = ActiveForm::begin(); ?>
        <?= $form->field($model, 'diary_date')->widget(DatePicker::className(), [
            'options' => ['class' => 'form-control'],
            'clientOptions' => ['firstDay' => 0],
            'dateFormat' => 'yyyy-MM-dd'
        ]) ?>
        <?= $form->field($model, 'diary_content')->textarea(['rows' => '20', 'style' => 'resize: vertical;']) ?>
        <div class="form-group">
            <?= Html::submitButton('保存', ['class' => 'btn btn-success']) ?>
        </div>
    <?php ActiveForm::end(); ?>
    </div>
</div>
<?php
$id = $model->id;
$saveUrl = Url::to(['/diarysuper/save-diary?id='.$id]);
$js = <<<JS
document.addEventListener("keydown", function(e) {
    if ('{$isNewRecord}') reutrn
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        var diary_date = $('#diary-diary_date').val();
        var diary_content = $('#diary-diary_content').val();
        $.ajax({
            url: '{$saveUrl}',
            type: 'post',
            dataType: 'json',
            data: {diary_date: diary_date, diary_content: diary_content},
            success: function () {},
            error: function () {}
        });
    }
}, false);
JS;

$this->registerJs($js);
?>