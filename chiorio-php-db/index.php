<?php include 'dbconnect.php'; ?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Export DB</title>
</head>
<body>
    <?php

        $log = R::find('h_clients', 'use_count <= ?', [100]);
        $i = 0;
        foreach($log as $l) {
            // echo json_encode($l).'<br>';
            $i = ++$i;
            echo '
            {<br>
                "uid":"'.$i.'",<br>
                "name":"'.$l->name.'",<br>
                "phone":"'.$l->phone.'",<br>
                "count":"'.$l->use_count.'"<br>
            },<br>
            ';
        }
    
        // $log = R::find('h_works', 'client_use_count <= ?', [100]);

        // echo json_encode($log).'<br>';

        // foreach($log as $l) {
        //     if(!R::findOne('h_clients', 'id = ?', [$l->id_client])) continue;
        //     $client = R::findOne('h_clients', 'id = ?', [$l->id_client]);
        //     $masterName = R::findOne('h_masters', 'id = ?', [$l->id_master])->name;
        //     $wordDate = str_replace($l->work_date, '-', '.');
            // echo "
            // {<br>
            //     'uid':'.$l->id',<br>
            //     'date':'$workDate',<br>
            //     'time':'$l->work_time',<br>
            //     'master':'$masterName',<br>
            //     'client':'$client->name',<br>
            //     'phone':'$client->phone',<br>
            //     'count':'$l->client_use_count',<br>
            //     'service':'',
            // }<br>
            // ";
        // }

        /*
        {
            uid: uid,
            date: date,
            time: time,
            master: slave,
            client: client,
            phone: phone,
            count: count,
            service: service,
            servicePrice: servicePrice,
            serviceCount: serviceCount
        }
        */
    
    ?>
</body>
</html>