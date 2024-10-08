const corsOptions = {
    origin: (origin, callback) => {
      if (["http://localhost:4200"].indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  };