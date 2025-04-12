class ToDoService {
    constructor(toDoRepository) {
      this.toDoRepository = toDoRepository;
    }
  
    async getTodos() {
      return await this.toDoRepository.getTodos();
    }
  
    async addTodo(todo) {
      return await this.toDoRepository.addTodo(todo);
    }
  
    async updateTodo(id, todo) {
      return await this.toDoRepository.updateTodo(id, todo);
    }
  
    async deleteTodo(id) {
      return await this.toDoRepository.deleteTodo(id);
    }
  }
  
  module.exports = ToDoService;