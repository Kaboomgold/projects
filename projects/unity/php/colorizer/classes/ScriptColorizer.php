<?php
class ScriptColorizer {
    private string $filetype;

    public function ColorizeScript(string $scriptLoc) {
        $this -> filetype = preg_replace('/.+(?=\.)/', '', $scriptLoc);

        switch($this -> filetype) {
            case '.cs': {
                return new CSharpColorizer($scriptLoc);
            }
                break;
            case '.json': {
                return new JSONColorizer($scriptLoc);
            }
                break;
            default: {
                return new Colorizer($scriptLoc);
            }
        }
    } 
}