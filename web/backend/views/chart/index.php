<?php

use yii\helpers\Html;
use daixianceng\echarts\ECharts;

$this->title = '统计图表';
?>
<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><?= Html::encode($this->title) ?></h1>
    </div>
</div>

<div class="fms-summary">
    <div class="fms-summary-item fms-summary-income">
        <div class="fms-summary-attr">总收入</div>
        <div class="fms-summary-num"><?= $incomeTotal ?></div>
    </div>
    <div class="fms-summary-item fms-summary-expenses">
        <div class="fms-summary-attr">总支出</div>
        <div class="fms-summary-num"><?= $expensesTotal ?></div>
    </div>
    <div class="fms-summary-item fms-summary-balance">
        <div class="fms-summary-attr">结余</div>
        <div class="fms-summary-num"><?= ($incomeTotal-$expensesTotal) ?></div>
    </div>
</div>

<div class="row fms-summary-chart">
    <div class="text-center col-md-12">
        <h3>收支趋势</h3>
        <?= ECharts::widget([
            'responsive' => true,
            'options' => [
                'style' => 'height: 440px;'
            ],
            'pluginOptions' => [
                'option' => [
                    // 'color' => ['#d15346', '#add536'],
                    'grid' => [
                        'left' => '2%',
                        'right' => '6%',
                        'bottom' => '2%',
                        'top' => '20%',
                        'containLabel' => true
                    ],
                    'tooltip' => [
                        'trigger' => 'axis'
                    ],
                    'legend' => [
                        'data' => [
                            '月存钱',
                            '月消费'
                        ]
                    ],
                    'xAxis' => [
                        'name' => '月份',
                        'type' => 'category',
                        'boundaryGap' => false,
                        'data' => $month,
                    ],
                    'yAxis' => [
                        'name' => '金额',
                        'type' => 'value'
                    ],
                    'series' => [
                        [
                            'name' => '月消费',
                            'type' => 'line',
                            'data' => $monthlyExpenses,
                            'markLine' => [
                                'data' => [
                                    [
                                        'type' => 'average',
                                        'name' => '平均消费'
                                    ]
                                ],
                                'label' => [
                                    'normal' => [
                                        'position' => 'middle',
                                    ]
                                ]
                            ],
                            'markPoint' => [
                                'data' => [
                                    [
                                        'type' => 'max',
                                        'name' => '最高消费',
                                        'symbolSize' => 100,
                                    ],
                                    [
                                        'type' => 'min',
                                        'name' => '最低消费',
                                        'symbolSize' => 100,
                                    ],
                                ],
                            ],
                        ],
                        [
                            'name' => '月存钱',
                            'type' => 'line',
                            'data' => $monthlyIncome,
                            'markLine' => [
                                'data' => [
                                    [
                                        'type' => 'average',
                                        'name' => '平均存钱'
                                    ]
                                ],
                                'label' => [
                                    'normal' => [
                                        'position' => 'middle',
                                    ]
                                ]
                            ]
                        ],
                    ]
                ]
            ]
        ]) ?>
    </div>
</div>

<div class="row fms-summary-chart">
    <div class="text-center col-md-12">
        <h3>每月结余</h3>
        <?= ECharts::widget([
            'responsive' => true,
            'options' => [
                'style' => 'height: 420px;'
            ],
            'pluginOptions' => [
                'option' => [
                    // 'color' => ['#ccd539'],
                    'grid' => [
                        'left' => '2%',
                        'right' => '6%',
                        'bottom' => '2%',
                        'top' => '6%',
                        'containLabel' => true
                    ],
                    'tooltip' => [
                        'trigger' => 'axis'
                    ],
                    'xAxis' => [
                        'name' => '月份',
                        'type' => 'category',
                        'data' => $month,
                    ],
                    'yAxis' => [
                        'name' => '金额',
                        'type' => 'value'
                    ],
                    'series' => [
                        [
                            'name' => '每月结余',
                            'type' => 'bar',
                            'barWidth' =>  '60%',
                            'label' => [
                                'normal' => [
                                    'position' => 'top',
                                    'show' => true
                                ]
                            ],
                            'data' => $monthlyBalance,
                        ]
                    ]
                ]
            ]
        ]) ?>
    </div>
</div>

<div class="row fms-summary-chart">
    <div class="text-center col-md-6">
        <h3>消费统计</h3>
        <?= ECharts::widget([
            'responsive' => true,
            'options' => [
                'style' => 'height: 400px;'
            ],
            'pluginOptions' => [
                'option' => [
                    // 'color' => ['#d15346', '#72a4bb', '#a0c824', '#c18c30'],
                    'tooltip' => [
                        'trigger' => 'item',
                        'formatter' => '{a} <br/>{b}: {c} ({d}%)'
                    ],
                    'series' => [
                        'name' => '金额',
                        'type' => 'pie',
                        'radius' => ['66%', '80%'],
                        'data' => $expensesCategory
                    ]
                ]
            ]
        ]) ?>
    </div>
    <div class="text-center col-md-6">
        <h3>存钱统计</h3>
        <?= ECharts::widget([
            'responsive' => true,
            'options' => [
                'style' => 'height: 400px;'
            ],
            'pluginOptions' => [
                'option' => [
                    // 'color' => ['#a0c824', '#72a4bb', '#6c6669'],
                    'tooltip' => [
                        'trigger' => 'item',
                        'formatter' => '{a} <br/>{b}: {c} ({d}%)'
                    ],
                    'series' => [
                        'name' => '金额',
                        'type' => 'pie',
                        'radius' => ['66%', '80%'],
                        'data' => $incomeSource
                    ]
                ]
            ]
        ]) ?>
    </div>
</div>