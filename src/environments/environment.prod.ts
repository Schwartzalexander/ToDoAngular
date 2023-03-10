export const environment = {
  production: true,


  // -------------------------------------------------------------------------------------------------
  // Backend API settings
  // -------------------------------------------------------------------------------------------------

  backend_api_path: 'http://127.0.0.1:1024/rest/',
  backend_api_request_add_task: 'add-task',
  backend_api_request_update_task: 'update-task',
  backend_api_request_delete_task: 'delete-task',
  backend_api_request_get_all_tasks: 'tasks',

  // -------------------------------------------------------------------------------------------------
  // Caching
  // -------------------------------------------------------------------------------------------------

  defaultTaskCacheAgeInSec: 2 * 365 * 24 * 3600,

  // -------------------------------------------------------------------------------------------------
  // Debugging
  // -------------------------------------------------------------------------------------------------

  enableReducerLogging: false,

};
