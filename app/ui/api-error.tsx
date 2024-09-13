export function ApiError( { error } : { readonly error: string }) {
  //console.log('apierrors', error);
  if (!error) return null;
  return <div className="text-pink-500 text-md italic py-2">{error}</div>;
}