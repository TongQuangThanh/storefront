export const errorLoginRequired = 'Please login first!';
export const errorForbidden = 'You have no right to access this feature!';
export const errorMissingField = 'Missing required field. Please help to provide all required field';
export const clientError = 'Some error(s) occur. Please try again later!';

export const generateErrorOnFetch = (model: string) => `Error on get ${model}. Please provide all required information and try again later`;
export const generateErrorOnCreate = (model: string, modelName = '') => `Error on create new ${model} with name ${modelName}. Please provide all required information and try again later`;