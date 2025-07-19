export const handlePromise = <T>(
  promise: Promise<T>,
): Promise<[undefined, T] | [Error]> =>
  promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((error) => [error]);

export const handleHttpPromise = <T>(
  promise: Promise<{ data: T }>,
): Promise<[undefined, T, { data: T }] | [Error]> =>
  promise
    .then(
      (response) =>
        [undefined, response.data, response] as [undefined, T, { data: T }],
    )
    .catch((error) => [error]);
