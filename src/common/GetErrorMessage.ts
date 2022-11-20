export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return {
      Message: error.message,
    };
  }
  return { error };
}
