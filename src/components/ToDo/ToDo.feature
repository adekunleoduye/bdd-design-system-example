Feature: Todo List

  Scenario: Todo List
    Given Todo List
     When the user adds a new task
      Then new task should appear in task list
     When the user removes a task
      Then the task should be removed from task list
     When the user completes a task
      Then the task should be mark as completed
     When there are no tasks
      Then the user should get a empty state message 