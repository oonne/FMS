<?php
use yii\helpers\Html;
use backend\widgets\Alert;

$this->title = $model->typeMsg;
?>
<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><?= Html::encode($this->title) ?></h1>
    </div>
</div>

<?php echo $model->recycle_content ?>
