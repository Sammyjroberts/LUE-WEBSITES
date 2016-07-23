<?php


class CryptoService {
    static function createAccount($username, $password){
        $db = Db::getInstance();
        $salt = CryptoService::createSalt();
        $hash = CryptoService::encryptPassword($password, $salt);

        //$db = Db::getInstance();
        $query = "INSERT INTO users (`username`, `salt`, `hash`) VALUES(:username, :salt, :hash)";
        $params = array
        (
            ':username' => $username,
            ':salt' => $salt,
            ':hash' => $hash
        );

        echo '<pre>',print_r($params,1),'</pre>';
        $sqlStatement = $db->prepare($query);
        $res = $sqlStatement->execute($params);
    }

    static function createSalt(){
        return mcrypt_create_iv(22, MCRYPT_DEV_URANDOM);
    }

    static function encryptPassword($password, $salt){
        $options = [
            'cost' => 11,
            'salt' => $salt,
        ];
        return password_hash($password, PASSWORD_BCRYPT, $options)."\n";
    }

    static function authenticateUser($username, $password){
        $db = Db::getInstance();
        $query = "SELECT * FROM users where username = :username";
        $params = array
        (
            ':username' => $username
        );
        $sqlStatement = $db->prepare($query);
        $res = $sqlStatement->execute($params);
        $response = $sqlStatement->fetch(PDO::FETCH_ASSOC);

        $hash = $response['hash'];

        if( password_verify($password, trim($hash)) ){
            return true;
        }
        else{
            return false;
        }

    }
}
