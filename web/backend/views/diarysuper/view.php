<?php
use yii\helpers\Html;
use yii\widgets\Block;

$this->title = $model->diary_date;
?>
<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><?= Html::encode($this->title) ?></h1>
    </div>
</div>
<?php $this->beginBlock('note-content', true) ?>
<?= nl2br($model->diary_content) ?>
<?php $this->endBlock() ?>