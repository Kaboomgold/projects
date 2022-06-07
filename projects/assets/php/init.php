<?php
namespace Assets {

    use Autherization\Autherization;
    use Autherization\AuthFormHandling;
    use DataBase;
    use Utility\AutoLoader;
    use Utility\AutoLoaders\Autoloader_Recursive;
    use DataBase\Editor\DB_Editor;
    use Debug;
    use Main\FormHandling;

    class Main {

        const ASSETS_DIR = './src/assets';

        private int $file_id = 0;
        public $pages = [];
        public $auth = null;

        public function __construct()
        {
            session_start();

            $this->include_files();
            $this->pages = \FileHandler::GetFilesFromDir('./pages');
            $this->autherization();
            $this->form_handling();

            \Debug::show();
        }

        private function include_files() {
            include_once './php/classes/autoloader.class.php';
            $auto_loader = new Autoloader_Recursive('./php', [
                'database-includes' => 100
            ]);
        }

        public function user_is_logged_in() {
            return $_SESSION['user_logged_in'];
        }

        public function get_assets_file_structure() {
            return \FileHandler::GetFileStucture(self::ASSETS_DIR, 10);
        }

        public function prepare_page_name(string $page_name, bool $replace_spaces = true) : string {
            $add_spaces = $page_name;
        
            if($replace_spaces) {
                $add_spaces = preg_replace("/\-/", ' ', $page_name);
            }
            $remove_extension = preg_replace("/\.php/", "", $add_spaces);
            return $remove_extension;
        }

        public function create_file_menu(array $arr, $folder_name = '') {
            $html = '<ul class="menu">';
        
            foreach($arr as $folder_name => $item) {
                if(is_array($item)) {
                    $html .= '<li class="sub-menu"><div class="folder"><p>'.$folder_name.'</p></div>'.$this->create_file_menu($item, $folder_name).'</li>';
                } else {
                    $html .= '<li><div class="file" file-id="'.$this->file_id.'"><p>'.$item.'</p></div></li>';
                    $this->file_id++;
                }
            }
        
            $html .= '</ul>';
            return $html;
        }

        public function get_file_menu() {
            return $this->create_file_menu($this->get_assets_file_structure()); 
        }

        private function autherization() {
            $this->auth = new Autherization(new DB_Editor('projects', 'localhost', 'root', ''));
        }

        private function form_handling() {
            $form_handling = new AuthFormHandling();
            $form_handling->handle_login_form($this->auth);
            $form_handling->handle_logout_form($this->auth);
        }
    }
}