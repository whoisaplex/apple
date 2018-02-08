<?php $__env->startSection('content'); ?>
    <main id="main-content">

        <section id="profile-header">
            <div id="user-avatar">
                <img src="img/user-avatar.jpg">
            </div>

            <div id="user-id-container">
                <div id="user-id">

                  <?php echo e($user->username); ?>


                </div>
                <?php if(isset($user->team)): ?>
                <div id="user-team">

                  <?php echo e($user->team->name); ?>


                </div>
                <?php endif; ?>
                <div id="user-level">
                    <div><?php echo e($user->level); ?></div>
                </div>
                <div id="user-cash"><?php echo e($user->currency); ?>

                    <i class="fa fa-bitcoin"></i>
                </div>
            </div>


            <div id="user-xp">
                <progress value=<?php echo e($user->xp); ?> max="100"></progress>
            </div>

        </section>

        <section>

            <div class="grid-flex space width-100 text-align-center">

                <div class="col-flex-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3>
                                <i class="fa fa-globe" aria-hidden="true"></i> Hacked position</h3>
                        </div>
                        <div class="panel-body">
                            <ol id="user-positions">
                              <?php $__currentLoopData = $user->position; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $position): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <li><?php echo e($position->name); ?> <span class="cooldown"><?php echo e($position->created_at); ?></span></li>
                              <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </ol>
                        </div>
                    </div>
                </div>

                <div class="col-flex-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3><i class="fa fa-users" aria-hidden="true"></i>
                              <?php if($user->team): ?>
                                <?php echo e($user->team->name); ?>

                              <?php else: ?>
                              Not in a Team
                              <?php endif; ?>
                             </h3>
                        </div>
                        <div class="panel-body">
                          <?php if(isset($user->team)): ?>
                            <ol id="group-members">
                              <?php $__currentLoopData = $user->team->members; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $member): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <li><?php echo e($member->username); ?>

                                  <?php if($member->username != $user->username): ?>
                                    <span class="delete">
                                        <button class="btn-sm btn-danger" id="user-id">Kick</button>
                                    </span>
                                  <?php endif; ?>
                                </li>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </ol>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>



        </section>
    </main>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>