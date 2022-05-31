<?php


namespace Autherization\Tables {

    use DataBase\Editor\DB_Table_Editor;

    class DB_Table_Editor_Users extends DB_Table_Editor {
        
        public function user_exists(string $username) : bool {
            $sql = "SELECT COUNT(1) FROM $this->name WHERE username = '$username';";
            $result = ($this->get_query_result($sql, \PDO::FETCH_COLUMN)[0]);
            return $result;
        }
        
        public function get_user_hash(string $username) : string {
            $sql = "SELECT password FROM $this->name WHERE username = '$username';";
            $result = $this->get_query_result($sql, \PDO::FETCH_COLUMN)[0];
            return $result;
        }

        public function insert_user(string $username, string $password, string $e_mail) {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            $this->add_row([
                null,
                $username,
                $hashed_password,
                $e_mail,
                'now()'
            ]);
        }

        public function remove_user(string $username) {
            $sql = "DELETE FROM $this->name WHERE username='$username';";
            $this->get_query_result($sql);
        }

    }
}