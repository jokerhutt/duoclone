export const parseIdsToRequestParam = (paramName: string, ids: number[]) => {
  const params = new URLSearchParams();
  ids.forEach(id => params.append(paramName, id.toString()));
  return params.toString();
};