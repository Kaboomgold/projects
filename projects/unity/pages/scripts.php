<div class="page scripts" id="<?=basename(__FILE__, '.php'); ?>-page">

    <div class="main-content">
        <h1>Scripts</h1>

        <div class="wrapper">
            <ul class="script-list">
                <?php foreach($scripts as $script) { ?>
                    <li><?=$script; ?></li>
                <?php } ?>
            </ul>

            <div class="script">
            </div>
        </div>
    </div>
</div>