export interface ApiError {
  errors: {
    [K: string]: string;
  }
}
export const parseApiError = (err: ApiError)=>{
  const {errors}=err;
  return Object.keys(errors).map(k=>{
    return `${k}: ${errors[k]}`
  }).join(';')
};
