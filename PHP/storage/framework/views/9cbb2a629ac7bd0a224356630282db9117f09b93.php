<?php $__env->startSection('content'); ?>
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
                                <li><a href="http://testing.test/users/<?php echo e($user->username); ?>"><?php echo e($user->username); ?></a><span class="cooldown"><?php echo e($user->xp); ?> <button class="btn-sm btn-danger" id="user-id">Invite to team</button></span>
                                </li>
                              <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </ol>
                        </div>
                    </div>
                </div>
        </section>
    </main>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>