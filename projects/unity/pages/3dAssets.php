<div class="page 3d-assets" id="three-d-assets-page">
    <h1>3D Assets</h1>

    <div class="main-content">
        <select class="object-selection">
            <?php foreach($model_names as $model_name) { ?>
                <option value="<?=$model_name; ?>" ><?=$model_name; ?></option>
            <?php } ?>
        </select>
    </div>
</div>