<div class="page three-d-assets" id="<?=basename(__FILE__, '.php'); ?>-page">
    <h1>3D Assets</h1>
    <button class="file-menu-btn"></button>

    <div class="main-content">
        <div class="model-viewer-container">
            <div class="script"></div>
            <div class="texture-viewer"></div>
            <div class="file-menu"><button type="button" class="file-menu-close-btn">X</button> <?=CreateFileMenu($models_structure);?></div>
        </div>
    </div>
</div>