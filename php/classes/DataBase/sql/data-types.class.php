<?php
    namespace DataBase\Querys\SQL {
        /**
		 * Contains all sql data types as constants.
		 * The descriptions and data types where taken from 
		 * @link https://www.w3schools.com/sql/sql_datatypes.asp
		 */
		class Data_Types {
			/**
			 * A FIXED length string (can contain letters, numbers, and special characters). 
			 * The size parameter specifies the column length in characters.
			 * Can be from 0 to 255. Default is 1
			 */
			const CHAR = 'CHAR';

			/**
			 * A VARIABLE length string (can contain letters, numbers, and special characters). 
			 * The size parameter specifies the maximum column length in characters.
			 * Can be from 0 to 65535
			 */
			const VARCHAR = 'VARCHAR';

			/**
			 * Equal to CHAR(), but stores binary byte strings. 
			 * The size parameter specifies the column length in bytes. 
			 * Default is 1
			 */
			const BINARY = 'BINARY';
		
			/**
			 * Equal to VARCHAR(), but stores binary byte strings. 
			 * The size parameter specifies the maximum column length in bytes.
			 */
			const VARBINARY = 'VARBINARY';

			/**
			 * For BLOBs (Binary Large Objects). 
			 * Max length: 255 bytes.
			 */
			const TINYBLOB = 'TINYBLOB';

			/**
			 * Holds a string with a maximum length of 255 characters.
			 */
			const TINYTEXT = 'TINYTEXT';

			/**
			 * Holds a string with a maximum length of 65,535 bytes.
			 */
			const TEXT = 'TEXT';

			/**
			 * For BLOBs (Binary Large Objects). 
			 * Holds up to 65,535 bytes of data.
			 */
			const BLOB = 'BLOB';

			/**
			 * Holds a string with a maximum length of 16,777,215 characters.
			 */
			const MEDIUMTEXT = 'MEDIUMTEXT';

			/**
			 * For BLOBs (Binary Large Objects). 
			 * Holds up to 16,777,215 bytes of data.
			 */
			const MEDIUMBLOB = 'MEDIUMBLOB';

			/**
			 * Holds a string with a maximum length of 4,294,967,295 characters.
			 */
			const LONGTEXT = 'LONGTEXT';

			/**
			 * For BLOBs (Binary Large Objects). 
			 * Holds up to 4,294,967,295 bytes of data.
			 */
			const LONGBLOB = 'LONGBLOB';

			/**
			 * A string object that can have only one value, chosen from a list of possible values. 
			 * You can list up to 65535 values in an ENUM list. 
			 * If a value is inserted that is not in the list, a blank value will be inserted. 
			 * The values are sorted in the order you enter them.
			 */
			const ENUM = 'ENUM';

			/**
			 * A string object that can have 0 or more values, chosen from a list of possible values. 
			 * You can list up to 64 values in a SET list.
			 */
			const SET = 'SET';

			/**
			 * A bit-value type. 
			 * The number of bits per value is specified in size. 
			 * The size parameter can hold a value from 1 to 64. 
			 * The default value for size is 1.
			 */
			const BIT = 'BIT';

			/**
			 * A very small integer. 
			 * Signed range is from -128 to 127. 
			 * Unsigned range is from 0 to 255. 
			 * The size parameter specifies the maximum display width (which is 255).
			 */
			const TINYINT = 'TINYINT';

			/**
			 * Zero is considered as false, nonzero values are considered as true.
			 */
			const BOOLEAN = 'BOOLEAN';

			/**
			 * A small integer. 
			 * Signed range is from -32768 to 32767. 
			 * Unsigned range is from 0 to 65535. 
			 * The size parameter specifies the maximum display width (which is 255).
			 */
			const SMALLINT = 'SMALLINT';

			/**
			 * A medium integer. 
			 * Signed range is from -8388608 to 8388607. 
			 * Unsigned range is from 0 to 16777215. 
			 * The size parameter specifies the maximum display width (which is 255).
			 */
			const MEDIUMINT = 'MEDIUMINT';

			/**
			 * A medium integer. 
			 * Signed range is from -2147483648 to 2147483647. 
			 * Unsigned range is from 0 to 4294967295. 
			 * The size parameter specifies the maximum display width (which is 255).
			 */
			const INTEGER = 'INTEGER';

			/**
			 * A large integer. 
			 * Signed range is from -9223372036854775808 to 9223372036854775807. 
			 * Unsigned range is from 0 to 18446744073709551615. 
			 * The size parameter specifies the maximum display width (which is 255).
			 */
			const BIGINT = 'BIGINT';

			/**
			 * A floating point number. 
			 * The total number of digits is specified in size. 
			 * The number of digits after the decimal point is specified in the d parameter. 
			 * This syntax is deprecated in MySQL 8.0.17, and it will be removed in future MySQL versions.
			 */
			const FLOAT = 'FLOAT';

			/**
			 * A normal-size floating point number. 
			 * The total number of digits is specified in size. 
			 * The number of digits after the decimal point is specified in the d parameter.
			 */
			const DOUBLE = 'DOUBLE';

			/**
			 * An exact fixed-point number. 
			 * The total number of digits is specified in size. 
			 * The number of digits after the decimal point is specified in the d parameter. 
			 * The maximum number for size is 65. 
			 * The maximum number for d is 30. 
			 * The default value for size is 10. 
			 * The default value for d is 0.
			 */
			const DECIMAL = 'DECIMAL';

			/**
			 * A date. Format: YYYY-MM-DD. 
			 * The supported range is from '1000-01-01' to '9999-12-31'.
			 */
			const DATE = 'DATE';

			/**
			 * A date and time combination. 
			 * Format: YYYY-MM-DD hh:mm:ss. 
			 * The supported range is from '1000-01-01 00:00:00' to '9999-12-31 23:59:59'. 
			 * Adding DEFAULT and ON UPDATE in the column definition to get automatic initialization and updating to the current date and time.
			 */
			const DATETIME = 'DATETIME';

			/**
			 * A timestamp. 
			 * TIMESTAMP values are stored as the number of seconds since the Unix epoch ('1970-01-01 00:00:00' UTC). 
			 * Format: YYYY-MM-DD hh:mm:ss. 
			 * The supported range is from '1970-01-01 00:00:01' UTC to '2038-01-09 03:14:07' UTC. 
			 * Automatic initialization and updating to the current date and time can be specified using DEFAULT CURRENT_TIMESTAMP and ON UPDATE CURRENT_TIMESTAMP in the column definition.
			 */
			const TIMESTAMP = 'TIMESTAMP';

			/**
			 * A time. Format: hh:mm:ss. 
			 * The supported range is from '-838:59:59' to '838:59:59'.
			 */
			const TIME = 'TIME';

			/**
			 * A year in four-digit format. 
			 * Values allowed in four-digit format: 1901 to 2155, and 0000.
			 * MySQL 8.0 does not support year in two-digit format.
			 */
			const YEAR = 'YEAR';

		}
    }