<?php

require_once '001_config_empty.php';
header('Content-Type: application/json');



try{
    $pdo = new PDO($dsn, $username, $password, $options);
    $sql = "SELECT * FROM `IM_Visitor_Lucerne`ORDER BY `IM_Visitor_Lucerne`.`timestamp` ASC;";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $OrtListe = $stmt->fetchAll();
    echo json_encode($OrtListe);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}