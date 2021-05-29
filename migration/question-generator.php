<?php

$host="https://opentdb.com/api.php?amount=50&type=multiple";

$difficulty = ["easy", "medium", "hard"];

$categories = [
    "General Knowledge" => 9,
    "Entertainment: Film" => 11,
    "Science & Nature"=> 17,
    "Science: Computers"=> 18,
    "Science: Mathematics"=> 19,
    "Mythology"=> 20,
    "Sports"=> 21,
    "Geography"=> 22,
    "History"=> 23,
    "Politics"=> 24,
    "Celebrities"=> 26,
    "Animals"=> 27,
    "Science: Gadgets"=> 30,
];

$mapper = [
    11 => 2,
    26 => 2,
    17 => 3,
    18 => 3,
    19 => 3,
    30 => 3,
    21 => 1,
    23 => 4,
    24 => 5,
    9 => 6,
    27 => 6,
    22 => 6,
    20 => 6
];

foreach ($categories as $name => $id) {
    foreach ($difficulty as $d) {
        $url = $host."&category=".$id."&difficulty=".$d;
        $response = file_get_contents($url);
    
        $response = json_decode($response, true);
        $response = $response['results'];

        foreach ($response as $row) {
            $qstmt = trim(html_entity_decode($row['question']));
            $options = array_merge($row['incorrect_answers'], [$row['correct_answer']]);
            shuffle($options);

            $optionA = trim(html_entity_decode($options[0]));
            $optionB = trim(html_entity_decode($options[1]));
            $optionC = trim(html_entity_decode($options[2]));
            $optionD = trim(html_entity_decode($options[3]));

            $correctOption = ((int) array_search($row['correct_answer'], $options)) + 1;

            if ($d == "easy") {
              $level = mt_rand(1, 5);

            } elseif ($d == "medium" ) {
                $level = mt_rand(6, 10);
            } else {
                $level = mt_rand(11,15);
            }

            $cateId = $mapper[$id];

            $SQL = sprintf('INSERT INTO questions SET contestLevel=%s, questionStatement="%s", optionA="%s", optionB="%s", optionC="%s", optionD="%s", correctOption=%s,questionCategory=%s;'.PHP_EOL, 
                $level,
                addcslashes($qstmt, '"'),
                addcslashes($optionA, '"'),
                addcslashes($optionB, '"'),
                addcslashes($optionC, '"'),
                addcslashes($optionD, '"'),
                $correctOption,
                $cateId);

            echo $SQL;
        }

        echo PHP_EOL.PHP_EOL.PHP_EOL;
    }
}



//https://opentdb.com/api.php?amount=50&category=21&difficulty=easy&type=multiple
