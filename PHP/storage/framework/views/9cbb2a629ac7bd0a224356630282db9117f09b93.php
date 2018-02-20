<?php $__env->startSection('content'); ?>
    <script type="text/javascript">
        globalAuthUser = <?php echo json_encode($auth); ?>

    </script>

    <main id="main-content"></main>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
    <!-- <script>
        let teamRelations = 
    </script> -->
    <script src=<?php echo e(mix('js/react-leaderboard.js')); ?>></script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>