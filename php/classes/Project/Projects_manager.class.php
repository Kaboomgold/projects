
<?php
class Projects_manager {
    private string $projectsPath;
    private array $projects;

    public function __construct(string $projectsPath) {
        $this -> projectsPath = $projectsPath;
        Project::$projectFolder = $projectsPath;

        $this -> createProjects();

    }

    private function createProjects() {
        $projectNames = $this -> GetProjectFolders();

        foreach($projectNames as $projectName) {
            $project = $this -> GetProject($projectName);
            $this -> projects[] = $project;
        }
    }

    public function Getprojects() {
        return $this -> projects;
    }

    private function GetProjectFolders() : array {
        $projects = scandir( $this->projectsPath );
        unset($projects[0], $projects[1]);

        return $projects;
    }

    private function GetProject(string $projectName) {
        return new Project($projectName);
    }

}