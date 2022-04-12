<div class="page scripts" id="scripts-page">
    <h1>Scripts</h1>

    <div class="script">
        <?php 
            foreach($colorized_scripts as $colorized_script) {
                echo $colorized_script -> GetList();
            }
        ?>
    </div>
</div>