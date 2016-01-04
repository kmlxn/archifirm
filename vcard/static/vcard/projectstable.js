(function() {
    var parameters = {
        targetContainerId: 'projectstable',
        controlButtonsIds: {
            transformToTable: 'projectstable_table',
            transformToSphere: 'projectstable_sphere',
            transformToHelix: 'projectstable_helix',
            transformToGrid:'projectstable_grid'
        }
    }

    var projects;

    var camera, scene, renderer;
    var controls;

    var objects = [];
    var targets = { table: [], sphere: [], helix: [], grid: [] };

    var projectsTableIsRunning;

    window.runProjectsTableOnce = function(projects_) {
        if (!window.projectsTableIsRunning) {
            window.projectsTableIsRunning = true;
            projects = projects_;
            runProjectsTable();
        }
    }

    var runProjectsTable = function() {
        init();
        animate();
    }

    var init = function() {

        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 3000;

        scene = new THREE.Scene();

        // table

        for (var i = 0; i < projects.length; i++) {

            var element = document.createElement('div');
            element.className = 'element';

            var symbol = document.createElement('div');
            symbol.className = 'picture';
            symbol.innerHTML =
                '<a href="' + projects[i].url + '">\
                    <img src="' + projects[i].pictureUrl + '">\
                </a>';
            element.appendChild(symbol);

            var details = document.createElement('div');
            details.className = 'caption';
            details.innerHTML = projects[i].caption;
            element.appendChild(details);

            var object = new THREE.CSS3DObject(element);
            object.position.x = Math.random() * 4000 - 2000;
            object.position.y = Math.random() * 4000 - 2000;
            object.position.z = Math.random() * 4000 - 2000;
            scene.add(object);

            objects.push(object);

            //

            var object = new THREE.Object3D();
            object.position.x = (i % 7 * 220) - 660;
            object.position.y = - (Math.floor(i / 7) * 220);

            targets.table.push(object);

        }

        // sphere

        var vector = new THREE.Vector3();

        for (var i = 0, l = objects.length; i < l; i ++) {

            var phi = Math.acos(-1 + (2 * i) / l);
            var theta = Math.sqrt(l * Math.PI) * phi;

            var object = new THREE.Object3D();

            object.position.x = 800 * Math.cos(theta) * Math.sin(phi);
            object.position.y = 800 * Math.sin(theta) * Math.sin(phi);
            object.position.z = 800 * Math.cos(phi);

            vector.copy(object.position).multiplyScalar(2);

            object.lookAt(vector);

            targets.sphere.push(object);

        }

        // helix

        var vector = new THREE.Vector3();

        for (var i = 0, l = objects.length; i < l; i ++) {

            var phi = i * 0.175 + Math.PI;

            var object = new THREE.Object3D();

            object.position.x = 1200 * Math.sin(phi);
            object.position.y = - (i * 8);
            object.position.z = 1200 * Math.cos(phi);

            vector.x = object.position.x * 2;
            vector.y = object.position.y;
            vector.z = object.position.z * 2;

            object.lookAt(vector);

            targets.helix.push(object);

        }

        // grid

        for (var i = 0; i < objects.length; i ++) {

            var object = new THREE.Object3D();

            object.position.x = ((i % 5) * 400) - 800;
            object.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
            object.position.z = (Math.floor(i / 25)) * 1000;

            targets.grid.push(object);

        }

        //

        renderer = new THREE.CSS3DRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'absolute';
        document.getElementById(parameters.targetContainerId).appendChild(renderer.domElement);

        //

        controls = new THREE.TrackballControls(camera, renderer.domElement);
        controls.rotateSpeed = 1;
        controls.minDistance = 500;
        controls.maxDistance = 6000;
        controls.addEventListener('change', render);

        var button = document.getElementById(parameters.controlButtonsIds.transformToTable);
        button.addEventListener('click', function (event) {

            transform(targets.table, 2000);

        }, false);

        var button = document.getElementById(parameters.controlButtonsIds.transformToSphere);
        button.addEventListener('click', function (event) {

            transform(targets.sphere, 2000);

        }, false);

        var button = document.getElementById(parameters.controlButtonsIds.transformToHelix);
        button.addEventListener('click', function (event) {

            transform(targets.helix, 2000);

        }, false);

        var button = document.getElementById(parameters.controlButtonsIds.transformToGrid);
        button.addEventListener('click', function (event) {

            transform(targets.grid, 2000);

        }, false);

        transform(targets.table, 2000);

        //

        window.addEventListener('resize', onWindowResize, false);

    }

    var transform = function(targets, duration) {

        TWEEN.removeAll();

        for (var i = 0; i < objects.length; i ++) {

            var object = objects[ i ];
            var target = targets[ i ];

            new TWEEN.Tween(object.position)
                .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();

            new TWEEN.Tween(object.rotation)
                .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();

        }

        new TWEEN.Tween(this)
            .to({}, duration * 2)
            .onUpdate(render)
            .start();

    }

    var onWindowResize = function() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

        render();

    }

    var animate = function() {

        requestAnimationFrame(animate);

        TWEEN.update();

        controls.update();

    }

    var render = function() {

        renderer.render(scene, camera);

    }
}())
