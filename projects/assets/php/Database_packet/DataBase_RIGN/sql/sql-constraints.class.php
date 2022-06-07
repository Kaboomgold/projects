<?php
    namespace DataBase\Querys\SQL {
        /**
         * A class with constants of sql constraints with description.
         */
        class SQL_Constraints {
            /** Ensures that a column cannot have a NULL value. */
            const NOT_NULL = 'NOT NULL';

            /** Ensures that all values in a column are different. */
            const UNIQUE = 'UNIQUE';

            /** A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table. */
            const PRIMARY_KEY = 'PRIMARY KEY';

            /** Prevents actions that would destroy links between tables. */
            const FOREING_KEY = 'FOREING KEY';

            /** Ensures that the values in a column satisfies a specific condition. */
            const Check = 'CHECK';

            /** Sets a default value for a column if no value is specified. */
            const DEFAULT = 'DEFAULT';

            /** Used to create and retrieve data from the database very quickly. */
            const CREATE_INDEX = 'CREATE INDEX';
        }
    }