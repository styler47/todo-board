# Todo board

Aim is to create simple todo list/board in angular to practise frontend development. App is designed to be single user only. Data is stored locally using local storage. App uses Angular cdk package and Antd framework for angular. 

##Gif
![](https://github.com/styler47/todo-board/tree/main/src/assets/introduction.gif)

##Components
###TodoBoardComponent
- main component
- contains components BoardList and BoardDetail
- load boards from local storage and passes to it's components

###BoardListComponent
- List of boards
- Button to add new board

###BoardModalComponent
- component that is loaded into sidebar
- allows to create/edit/delete board

###BoardDetailComponent
- shows selected board states and tasks
- has two tabs - board and task list
- board tab contains StatesComponent
- task list tab contains TaskListComponent

###StatesComponent
- iterate over states that belongs to board
- for each state creates StateComponent
- contains button to create new state

###StateComponent
- for each task creates TasksComponent
- state can be reordered using drag and drop
- state header has edit icon that opens sidebar with StateModalComponent

###StateModalComponent
- allows to create/edit/delete states

###TasksComponent
- iterate over tasks that belong to state
- contains button to create new task

###TaskComponent
- clicking on task opens sidebar with TaskModalComponent 
- tasks can be reordered using drag and drop

###TaskModalComponent
- allows to create/edit/delete tasks

###TaskListComponent
- table with all tasks that belong to selected board

##Services
### BoardService, StateService, TaskService
- data services
- access data from local storage using LocalStorageService

###LocalStorageService
- access data from local storage

###BoardDetailService
- observable data service designed to use in BoardDetailModule
- stores all data needed for selected board
- all components declared in BoardDetailModule have access to it

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
