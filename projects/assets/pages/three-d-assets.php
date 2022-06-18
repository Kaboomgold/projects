<div class="page three-d-assets" id="<?=basename(__FILE__, '.php'); ?>-page">
    <button class="file-menu-btn" title="Select a asset."></button>

    <div class="main-content">
        <div class="model-viewer-container">
            <div class="script"></div>
            <div class="texture-viewer"></div>
            <div class="file-menu"><button type="button" class="file-menu-close-btn">X</button> <?=$main->get_file_menu();?></div>
        </div>

        <div class="info-section-wrapper">

            <div class="info-section-popup">
                <select class="section-selector"></select>
                <button type="button" class="add-info-button">Add Info</button>
            </div>
            
            <button type="button" class="info-section-popup-button"></button>

            <div class="info-container"></div>
        </div>

    </div>
</div>