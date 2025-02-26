declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// This export is necessary to make this a module
export {};
