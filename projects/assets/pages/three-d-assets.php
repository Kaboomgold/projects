<div class="page three-d-assets" id="<?=basename(__FILE__, '.php'); ?>-page">
    <button class="file-menu-btn" title="Select a asset."></button>

    <div class="main-content">
        <div class="model-viewer-container">
            <div class="script"></div>
            <div class="texture-viewer"></div>
            <div class="file-menu"><button type="button" class="file-menu-close-btn">X</button> <?=CreateFileMenu($models_structure);?></div>
        </div>


        <div class="info-section">
            <div>
                <p>description:</p>
                <textarea name="description" id="description"></textarea>
            </div>
            <button type="button" class="update">Update</button>
        </div>
    </div>
</div>