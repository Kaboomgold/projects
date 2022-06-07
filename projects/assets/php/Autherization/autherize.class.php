<?php
    namespace Autherization {

        use Autherization\Tables\DB_Table_Editor_Users;
        use DataBase\Editor\DB_Editor;
        use DataBase\Querys\Create_Table_Query;
        use DataBase\Querys\Create_Table_Column_Query;
        use DataBase\Querys\SQL\SQL_Constraints;
        use DataBase\Querys\SQL\SQL_Data_Types;

        class Autherization {

            private $database_editor = null;
            private $db_table_editor_users = null;
            private $users_table_name = 'users';

            public $table_created = false;

            public function __construct(DB_Editor $editor)
            {   
                $this->database_editor = $editor;
                $this->db_table_editor_users = $this->database_editor->get_table($this->users_table_name, DB_Table_Editor_Users::class);
                
                $this->un_autherize_user();
                $this->create_users_table();
            }

            /**
             * If the user exists checks if the password is valid.
             * If password is valid set $_SESSION variable user_logged_in.
             */
            public function autherize_user(string $username, string $password) {
                if($this->db_table_editor_users->user_exists($username)) {
                    $hash = $this->db_table_editor_users->get_user_hash($username);
                    
                    if(password_verify($password, $hash)) {
                        $_SESSION['user_logged_in'] = true;
                    }
                }
            }

            public function un_autherize_user() {
                $_SESSION['user_logged_in'] = false;
            }

            public function register_user(string $username, string $password, string $e_mail) : bool {
                $user_exists = $this->db_table_editor_users->user_exists($username);

                if(!$user_exists) {
                    $this->db_table_editor_users->insert_user($username, $password, $e_mail);
                    return true;
                } 

                return false;
            }

            private function create_users_table() {
                $users_table_query = new Create_Table_Query($this->users_table_name);

                $id_column = new Create_Table_Column_Query('id', SQL_Data_Types::INTEGER, 11);
                $id_column->add_auto_increment();
                $id_column->add_constraint(SQL_Constraints::PRIMARY_KEY);

                $users_table_query->add_column_obj($id_column);
                $users_table_query->add_column('username', SQL_Data_Types::VARCHAR, 255);
                $users_table_query->add_column('password', SQL_Data_Types::VARCHAR, 255);
                $users_table_query->add_column('e_mail', SQL_Data_Types::VARCHAR, 255);
                $users_table_query->add_column('created_at', SQL_Data_Types::DATETIME);

                $this->table_created = $this->database_editor->create_table($users_table_query);
            }
        }

        class AuthFormHandling {

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