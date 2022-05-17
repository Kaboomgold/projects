
<?php

    include 'include/DataBase/MainDB.php';
    include_once 'include/DataBase/DBTable.php';

    $htmlMarkup = '';
    $dataBaseHeader = '';

    $dataBaseHeader = '<h1>'.$mainDB->GetName().'</h1><hr>';

    $mainDB->Open();

    $tableNames = $mainDB->GetAllTablesNames();
    
    foreach($tableNames as $tableName){
        $htmlMarkup .= '<div class="'.$tableName.' close" canbedragged="true">';
        $htmlMarkup .= '<h2 style="pointer-events: none;">'.$tableName.'</h2>';

        $currTable = new DBTable($tableName, $DBLogin->GetLogin());

        $htmlMarkup .= '<div>'.$currTable->GetHTMLMarkup().'</div>';

        if($currTable->GetHTMLMarkup()){
            $htmlMarkup .= '<div class="input-placement" table-name='.$tableName.' table-headers='.json_encode($currTable->GetHeaders()).'></div>';
        }
        $htmlMarkup .= '</div>';
	}

    $mainDB->Close();

?>

<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8">
        <title>Klussen DB Editor</title>
        <link rel="stylesheet" href="css/style.css">
        <script src="js/Main.js" type="module" defer></script>
        <style>

            #table-wrapper > div {
                background-color: rgb(244,244,244);
                border-radius: 30px 30px 0px 0px;
                margin: 0px;
                min-height: 40px;
			}

            #table-wrapper > div.closed > div {
                display: none;
			}

            #table-wrapper > div > h2 {
                text-align: center;
                word-break: break-all;
			}

            #table-wrapper > div > div:first-of-type {
                max-height: 400px;
                overflow: auto;
			}

            #table-editor {
                display: flex;
                position: relative;
                height: 100%;
			}

            #table-editor #table-picker {
                flex: 1;
                background-color: gray;
			}

            #table-editor #table-wrapper {
                flex: 6;
			}

            body {
                display: flex;
                flex-direction: column;
                overflow: hidden;
			}
            
            main {
                flex: 1;  
		    }
        </style>
    </head>
    <body>

        <header><?=$dataBaseHeader;?></header>
        <main>
            <div id="table-editor">
                <div id="table-picker">
                    <h2>Tables</h2>
                </div>
                <div id="table-wrapper">
                    <?=$htmlMarkup; ?>
                </div>
            </div>

            <div id="add-table-container">
                <input type="text" placeholder="Name of table" id="table-name">
                <div id="table-container-headers">
                    <h3>headers</h3>
                    <h3>types</h3>
                    <h3>length</h3>
                    <h3>index</h3>
                    <h3>AI</h3>
                </div>
            </div>
        </main>
        <input type="hidden" value=<?=json_encode($_POST);?> id="post-data">
    </body>
</html>