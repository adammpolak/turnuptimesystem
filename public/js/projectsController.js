(function(){
  angular.module('turnupApp')
  // .filter('complete', ['completed',
  //   function(completed){
  //     function completeFilter(project) {
  //       return activeProject.completed;
  //     }
  //     completeFilter.$stateful = true;
  //     return completeFilter;
  // }])

  .controller('projectsController', projectsController);
  projectsController.$inject = ['$http', '$location', '$state'];

  function projectsController($http, $location, $state) {
    var self = this;
    this.number = 7;

    this.allProjects = [];
    this.completedprojects = [];
    this.activeProject = {};

//updating a project status
    this.updateStatus = function () {
    // allProjects.$save(function(updateStatus) {
      console.log(self.activeProject.completed);
      self.activeProject.completed = !self.activeProject.completed
      console.log('update function', self.activeProject.completed);

      self.completedprojects.push(self.activeProject);
      console.log(self.completedprojects, "completed projects");
      var completedIndex = self.allProjects.indexOf(this.activeProject);
      self.allProjects.splice(completedIndex, 1);

      $http.patch(`/api/projects/${this.activeProject._id}`, this.activeProject)
      .then(function(response) {
        console.log(this.activeProject);
      })
      console.log(self.allProjects, 'updated without completed');

      // return $resource('/api/projects', {},
      //   { save: {
      //       method: 'POST',
      //       isArray: true
      //     }});
      // self.allProjects.completedIndex = self.allProjects.$save();
      // this.activeProject = project;
      // $http.patch(`/api/projects/${project._id}`, self.activeProject)
      // .then(function(response) {
      //   self.activeProject.completed = '';
      // })
      // self.completedprojects.save();
      // $http.put('/api/projects')
      // .then(function(response) {
      //   self.allProjects.$save();
      //   // self.allProjects.push(response.data);
      // })
      // .catch(function(err) {
      //   console.log(err)
      // });


      // $location.path('/projects');
      // $http.put(`/api/projects/${self.activeProject._id}`, self.activeProject)
      // .then(function(response){
      //   // $state.go('completedprojects', {url: '/completedprojects'})
      // })
    }

  // display completed projects
  // this.removeCompletedFromAll = function() {
  //   $http.post('/api/projects', send)
  //   .then(function(response) {
  //     allProjects.save(function(err, allProjects) {
  //       console.log(err);
  //       // $location.path('/projects')
  //     })
  //     // self.allProjects.push(response.data);
  //   })
  //   .catch(function(err) {
  //     console.log(err)
  //   });
  //   console.log(self.allprojects, 'updated without completed');
  //
  // }

//display a project
    this.displayThisProject = function(index) {
      self.activeProject = self.allProjects[index];
    }

//when trying to create a new project this is what you need
    this.newProjectTasks = [{name: '', description: ''}]
    this.addTask = function () {
      self.newProjectTasks.push({name: '', description: ''})
    }
    this.removeTask = function() {
      var lastItem = self.newProjectTasks.length-1;
      self.newProjectTasks.splice(lastItem);
    }
//get the project data for projects page
    $http.get('/api/projects')
    .then(function(response) {
      self.allProjects = response.data;

    })

// get completed projects for completed projets page
    // $http.get('/api/completedprojects')
    // .then(function(response) {
    //   self.completedprojects = response.data;
    // })

// ADD PROJECT FUNCTION
    var addProject = function(project) {
      project.taskList = self.newProjectTasks;
      console.log('clicked add project button')
      console.log(project);
      var send = {
        project: project
      };
      $http.post('/api/projects', send)
      .then(function(response) {
        self.allProjects.push(response.data);
        project.name = '';
        project.description = '';
        self.newProjectTasks = [{name: '', description: ''}];
        $location.path('/projects')
      })
      .catch(function(err) {
        console.log(err)
      });
    }

// EDIT/UPDATE PROJECT FUNCTION
    var editProject = function(project) {
      console.log(this.allProjects, 'has been updated');
      $http.post(`/projects/${project._id}`) //want to post to projects/:id, correct?
      .then(function(response) {
        self.projects.push(response.data);
        $location.path('/projects/project')
      })
      .catch(function(err) {
        console.log(err)
      });
    }



    this.addProject = addProject;
    this.editProject = editProject;
    // this.displayCompletedProjects = displayCompletedProjects;

  }

})()
