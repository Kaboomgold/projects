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

            <div class="info-container">

                <div>
                    <div>
                        <!-- <p>function name(arg1, arg2) : void {</p> -->
                        <div class="wrapper">
                            <span>function</span>

                            <input type="text" name="function_name">
                            (
                            <select name="arg_type-1">
                                <option>int</option>
                                <option>bool</option>
                                <option>array</option>
                                <option>float</option>
                                <option>double</option>
                            </select>
                            <input type="text" name="arg_name-1">
                            ) :  
                            <select name="arg_type-1">
                                <option>int</option>
                                <option>bool</option>
                                <option>array</option>
                                <option>float</option>
                                <option>double</option>
                            </select>
                        </div>
                        <div>
                            <textarea name="function-description-0"></textarea>
                        </div>
                    </div>
                    <button type="button" class="update">Update</button>
                    <button class="delete" type="button">Delete</button>
                </div>
            </div>
        </div>

    </div>
</div>