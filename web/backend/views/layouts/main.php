<?php
use yii\helpers\Html;
use yii\widgets\Menu;
use backend\assets\AppAsset;

AppAsset::register($this);

$route = Yii::$app->requestedAction->uniqueId;

$menu = [
    [
        'label' => '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-set"></use></svg>  系统',
        'url' => '#',
        'items' => [
            'site' => ['label' => '系统信息', 'url' => ['site/index'], 'active' => in_array($route, ['site/index'])],
            'usersuper' => ['label' => '用户管理', 'url' => ['usersuper/index'], 'active' => in_array($route, ['usersuper/index', 'usersuper/add-user', 'usersuper/update-user'])],
            'handlersuper' => ['label' => '经手人管理', 'url' => ['handlersuper/index'], 'active' => in_array($route, ['handlersuper/index', 'handlersuper/add-handler', 'handlersuper/update-handler'])],
            'recyclesuper' => ['label' => '回收站', 'url' => ['recyclesuper/index'], 'active' => in_array($route, ['recyclesuper/index', 'recyclesuper/view-recycle'])],
        ],
    ],
    [
        'label' => '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-bill"></use></svg>  账单',
        'url' => '#',
        'items' => [
            'categorysuper' => ['label' => '分类管理', 'url' => ['categorysuper/index'], 'active' => in_array($route, ['categorysuper/index', 'categorysuper/add-category', 'categorysuper/update-category'])],
            'expensessuper' => ['label' => '消费记录', 'url' => ['expensessuper/index'], 'active' => in_array($route, ['expensessuper/index', 'expensessuper/add-expenses', 'expensessuper/update-expenses', 'expensessuper/view-expenses'])],
            'incomesuper' => ['label' => '存钱记录', 'url' => ['incomesuper/index'], 'active' => in_array($route, ['incomesuper/index', 'incomesuper/add-income', 'incomesuper/update-income', 'incomesuper/view-income'])],
            'chart' => ['label' => '统计图表', 'url' => ['chart/index'], 'active' => in_array($route, ['chart/index'])],
        ]
    ],
    [
        'label' => '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-note"></use></svg>  记事本',
        'url' => '#',
        'items' => [
            'notesuper' => ['label' => '记事本', 'url' => ['notesuper/index'], 'active' => in_array($route, ['notesuper/index', 'notesuper/add-note', 'notesuper/update-note', 'notesuper/view-note'])],
            // 'diarysuper' => ['label' => '日记', 'url' => ['diarysuper/index'], 'active' => in_array($route, ['diarysuper/index', 'diarysuper/add-diary', 'diarysuper/update-diary', 'diarysuper/view-diary'])],
        ]
    ],
];

?>

<?php $this->beginContent('@app/views/layouts/base.php'); ?>
    <div id="wrapper">
         <nav class="sidebar">
            <?= Html::a('<img src="/img/aura.png" class="logo-rotation">', Yii::$app->homeUrl, ['class' => 'sidebar-logo']) ?>
            <?= Menu::widget([
                'encodeLabels' => false,
                'submenuTemplate' => "\n<ul class=\"nav nav-second-level collapse\">\n{items}\n</ul>\n",
                'options' => [
                    'class' => 'nav',
                    'id' => 'side-menu'
                ],
                'items' => $menu
            ]) ?>
        </nav>

        <div id='page-wrapper'>
            <?= $content ?>
        </div>

    </div>

<?php $this->endContent() ?>