<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>StreetHack - Profilepage</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/font-awesome.css">
    <link rel="stylesheet" href="css/profile.css">

</head>

<body>

    <main id="main-content">
        <section>

            <div class="grid-flex space width-100 text-align-center">

                <div class="col-flex-1">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3>
                                <i class="fa fa-user" aria-hidden="true"></i> Top players </h3>
                        </div>
                        <div class="panel-body">
                            <ol id="user-positions">
                              <?php $__currentLoopData = $users; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $user): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <li><?php echo e($user->username); ?><span class="cooldown"> <button class="btn-sm btn-danger" id="user-id">Invite to team</button></span>
                                </li>
                              <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </ol>
                        </div>
                    </div>
                </div>
        </section>
    </main>

</body>

</html>
