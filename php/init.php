<?php
namespace Main {

    use Autherization\Autherization;
    use Project\Projects_Manager;
    use Utility\AutoLoaders\Autoload_Controller;
    use DataBase\Editor\DB_Editor;

    class Main {

        private Autherization $auth;

        public function __construct()
        {
            $this -> start_session();
            $this -> include_files();
            $this -> autherization();
            $this -> init_form_handlers();

            \Debug::log($this->user_is_logged_in());
            \Debug::log($_POST, 'post');
            \Debug::log($_SESSION, 'session');
            \Debug::show();
        }

        public function start_session(array $options = []) : bool {
            return session_start($options);
        }

        public function get_projects() {
            $pm = new Projects_Manager('./projects');
            return $pm -> Getprojects();
        }

        public function user_is_logged_in() {
            return (!empty($_SESSION['user_logged_in']))? $_SESSION['user_logged_in'] : false;
        }

        private function init_form_handlers() {
            $form_handling = new FormHandling();
            $form_handling->handle_login_form($this->auth);
            $form_handling->handle_logout_form($this->auth);
        }

        private function include_files() {
            include_once './php/classes/utility/autoloader.class.php';
            Autoload_Controller::recursive_include('./php', [
                'database' => 100,
                'html-table' => 99,
                'db-table' => 98,
                'db-table-editor' => 97
            ]);
        }

        private function autherization() {
            $this->auth = new Autherization();
        }
    }

    class FormHandling {

        static function get_login_form() {
            ?>
            
            <form action="<?=$_SERVER["PHP_SELF"]; ?>" method="POST" id="login_form">
                <input type="hidden" name="test" value="test">

                <label for="login_username">Username:</label>
                <input type="text" name="username" id="login_username">
            
                <label for="login_password">Password:</label>
                <input type="password" name="password" id="login_password">

                <input type="submit" name="login_form" value="Login">
            </form>

            <?php
        }

        static function get_logout_form() {
            ?>
            
            <form action="<?=$_SERVER["PHP_SELF"]; ?>" method="POST" id="logout_form">
                <input type="submit" name="logout_form" value="Logout">
            </form>

            <?php
        }

        private function empty_post() {
            $_POST = [];
        }

        public function handle_login_form(Autherization $auth) {
            $username = false;
            $password = false;

            if(isset($_POST['login_form'])) {
                if(!empty($_POST['username'])) {
                    $username = $_POST['username'];
                }

                if(!empty($_POST['password'])) {
                    $password = $_POST['password'];
                }
            }

            if($username && $password) {
                $auth->autherize_user($username, $password);
                $this->empty_post();
            }
        }

        public function handle_logout_form(Autherization $auth) {
            if(isset($_POST['logout_form'])) {
                $auth->un_autherize_user();
                $this->empty_post();
            }
        }

    }
}