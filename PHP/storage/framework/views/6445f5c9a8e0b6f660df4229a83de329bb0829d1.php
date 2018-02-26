<?php $__env->startSection('content'); ?>
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
              <?php if (! ($user->team_id)): ?>
                <div class="panel-heading">Create Team</div>

                <div class="panel-body">
                    <form class="form-horizontal" method="POST" action="/teams">
                        <?php echo e(csrf_field()); ?>


                        <div class="form-group<?php echo e($errors->has('name') ? ' has-error' : ''); ?>">
                            <label for="name" class="col-md-4 control-label">Name</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control" name="name" value="<?php echo e(old('name')); ?>" required autofocus>

                                <?php if($errors->has('name')): ?>
                                    <span class="help-block">
                                        <strong><?php echo e($errors->first('name')); ?></strong>
                                    </span>
                                <?php endif; ?>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Create Team
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <?php endif; ?>
                <?php if(isset($user->team_id)): ?>
                <div class="panel-heading">Team</div>

                <div class="panel-body">
                  <h1 style="color:red;text-align:center;">
                      <?php echo e($user->team->name); ?>

                  </h1>
                </div>
            </div>
            <?php endif; ?>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>