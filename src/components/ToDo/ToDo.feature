Feature: Todo List

  Scenario: Todo List
    Given Todo List
     When the user adds a new task
      Then the tasks list should increase by 1
     When the user removes a task
      Then the tasks list should decrease by 1
     When the user completes a task
      Then the completed tasks count should increase by 1
     When there are no tasks
      Then the user should get a empty state message 
    