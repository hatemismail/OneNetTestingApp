<!DOCTYPE html>
<html lang="en" data-ng-app="OneNetApp" dir="rtl">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="keywords" content="<?=Theme::get('keywords')?>">
        <meta name="description" content="<?=Theme::get('description')?>">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> 
		<meta name="HandheldFriendly" content="true" />
		<meta name="apple-touch-fullscreen" content="yes" />
		<title data-ng-bind="pageTitle()"><?=Theme::get('title')?></title>
		<!-- One-Net CSS -->
		<link rel="stylesheet" href="<?=Theme::asset()->url('css/app.min.css')?>">
		<!-- One-Net Theme -->
		<link rel="stylesheet" data-ng-href="<?=Theme::asset()->url('css/themes/theme-1.css')?>" />
        <!-- Others -->
        <?=Theme::asset()->styles()?>
        <?=Theme::asset()->scripts()?>

	</head>
	<body ng-controller="AppCtrl">
        <!-- Native Header -->
        <?=Theme::partial('header')?>
        <!-- Content -->
        <?=Theme::content()?>
        <!-- Native Footer -->
        <?=Theme::partial('footer')?>

        <!-- App Scripts -->
		<script src="<?=Theme::asset()->url('js/app.src.js')?>"></script>
        <!-- Others -->
        <?=Theme::asset()->container('footer')->scripts()?>
	</body>
</html>