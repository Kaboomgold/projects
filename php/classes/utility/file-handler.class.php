<?php
class FileHandler {
    static function GetFilesFromDir(string $dir) {
        $files = scandir($dir, 1);
        unset($files[count($files)-1], $files[count($files)-1]);
        return $files;
    }

    /**
     * Returns an array representing the file structure.
     * @param string $dir Directory it should search in.
     * @param int $depth  How many subdirectories deep should be searched. 
     * @return array $arr Array represnting the file structure.
     * @static
     */
    static function GetFileStucture(string $dir, int $depth = 6) : array {
        $files = [];

        $paths = new RecursiveTreeIterator(
                new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS));
        
        preg_match('/[\w-]+$/', $dir, $rootDirName);

        foreach($paths as $path) {
            $edited_path = preg_replace('/.+(?='.$rootDirName[0].')/', '', $path);

            preg_match_all('/[^\\\]+/', $edited_path, $matches);
            $files[] = $matches[0];
        }

        // Append unique id to files and folders.
        $files_count = count($files);
        for($i = 0; $i < $files_count; $i++) {

            foreach($files[$i] as  $index => $val) {
                $files[$i][$index] = $val.'-'.$index;
            }

        }

        $item_Tree = [];
        for($i = 0; $i < $depth; $i++) {
            foreach($files as $items) {

                if(isset($items[$i])) {

                    //Checks if the file is a file or a folder
                    if(strpos($items[$i], '.')) {
                        $item_Tree[$items[$i-1]][] = preg_replace('/-\d$/','',$items[$i]);
                    } else {

                        $item_Tree[$items[$i]] = [];

                        if(isset($items[$i-1])) {
                            $item_Tree[$items[$i]]['parent'] = $items[$i-1];
                        }
                    }

                }
            }
        }

        $clone = array_reverse($item_Tree, true);

        //Restructure array and remove appended id from file or folders.
        foreach($clone as $name => &$item) {
            if(isset($item['parent'])) {

                $parent = $item['parent'];
                unset($item['parent']);
                $clone[$parent][preg_replace('/-\d$/','',$name)] = $item;
                unset($clone[$name]);
            } 
        }

        //Remove appended id from base files or folders.
        foreach($clone as $name => $item) {
            $clone[preg_replace('/-\d$/','',$name)] = $item;
            unset($clone[$name]);
        }

        return $clone;
    }
}