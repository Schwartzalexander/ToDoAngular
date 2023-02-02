export const environment = {
  production: false,

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

  enableReducerLogging: true,

};

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
