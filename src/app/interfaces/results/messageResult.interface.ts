import {Result} from "./result.interface";

/**

 A JSON Object containing only a success flag and a message string. This is the mother of most other JO classes.
 @author Alexander Schwartz Created 24.01.2023
 */
export interface MessageResult extends Result {
  message: string;
}
