<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\helpers\Url;
use yii\widgets\Pjax;
use kartik\daterange\DateRangePicker;
use backend\widgets\Alert;
use common\models\Category;
use common\models\Handler;

$this->title = '消费记录';
?>
<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><?= Html::encode($this->title) ?></h1>
    </div>
</div>
<p>
    <?= Html::a('添加记录', ['expensessuper/add-expenses'], ['class' => 'btn btn-success']) ?>
</p>
<div class="row">
    <div class="col-lg-12">
        <div class="alert-wrapper">
            <?= Alert::widget() ?>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-lg-12">
        <?php Pjax::begin() ?>
        <?= GridView::widget([
            'dataProvider' => $dataProvider,
            'filterModel' => $searchModel,
            'tableOptions' => ['class' => 'table table-striped table-bordered table-center'],
            'summary' => Html::tag('p', '<b>{totalCount}</b>条数据，共计<b>' .$summary. '</b>元.', ['class' => 'text-right text-muted']),
            'columns' => [
                [
                    'class' => 'yii\grid\SerialColumn',
                    'headerOptions' => ['class' => 'col-md-1'],
                ],
                [
                    'attribute' => 'expenses_item',
                    'headerOptions' => ['class' => 'col-md-2'],
                    'filterInputOptions' => ['class' => 'form-control input-sm'],
                ],
                [
                    'attribute' => 'expenses_money',
                    'headerOptions' => ['class' => 'col-md-1'],
                    'filterInputOptions' => ['class' => 'form-control input-sm'],
                ],
                [
                    'attribute' => 'expenses_category',
                    'filter' => Category::getKeyValuePairs(),
                    'filterInputOptions' => ['class' => 'form-control input-sm'],
                    'headerOptions' => ['class' => 'col-md-1'],
                    'format' => 'html',
                    'value' => function ($model, $key, $index, $column) {
                        return $model->category ? $model->category->category_name : Html::tag('b', '分类错误', ['class' => 'text-danger']);
                    }
                ],
                [
                    'attribute' => 'expenses_handler',
                    'filter' => Handler::getKeyValuePairs(),
                    'filterInputOptions' => ['class' => 'form-control input-sm'],
                    'headerOptions' => ['class' => 'col-md-1'],
                    'format' => 'html',
                    'value' => function ($model, $key, $index, $column) {
                        return $model->handler ? $model->handler->handler_name : Html::tag('b', '经手人错误', ['class' => 'text-danger']);
                    }
                ],
                [
                    'attribute' => 'dateRange',
                    'filter' => '<div class="drp-container">' . DateRangePicker::widget([
                        'model' => $searchModel,
                        'attribute' => 'dateRange',
                        'presetDropdown' => true,
                        'hideInput' => true,
                        'containerOptions' => ['class' => 'drp-container input-group date-range-container'],
                        'convertFormat' => true,
                        'initRangeExpr' => true,
                        'pluginOptions' => [
                            'locale' => [
                                'format' => 'Y-m-d',
                                'separator' => '~',
                            ],
                        ],
                    ]) . '</div>',
                    'headerOptions' => ['class' => 'col-md-2'],
                    'value' => function ($model, $key, $index, $column) {
                        return $model->expenses_date;
                    }
                ],
                [
                    'attribute' => 'expenses_remark',
                    'headerOptions' => ['class' => 'col-md-2'],
                    'filterInputOptions' => ['class' => 'form-control input-sm'],
                ],
                [
                    'class' => 'yii\grid\ActionColumn',
                    'header' => '操作',
                    'headerOptions' => ['class' => 'col-md-2'],
                    'template' => '{view} {update} {delete}',
                    'buttons' => [
                        'view' => function ($url, $model, $key) {
                            return Html::a('查看', ['view-expenses', 'id' => $key], ['class' => 'btn btn-info btn-xs']);
                        },
                        'update' => function ($url, $model, $key) {
                            return Html::a('修改', ['update-expenses', 'id' => $key], ['class' => 'btn btn-warning btn-xs']);
                        },
                        'delete' => function ($url, $model, $key) {
                            return Html::a('删除', ['delete-expenses', 'id' => $key], ['class' => 'btn btn-danger btn-xs']);
                        },
                    ]
                ]
            ]
        ]) ?>
        <?php Pjax::end() ?>
    </div>
</div>