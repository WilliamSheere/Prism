// import models

const resolvers = {
  Query: {
    getUser: async () => {
      // return User.find({});
    },
   
  },
  Mutation: {
    createUser: async (_parent: any, _args: any) => {
      // const user = await User.create(args);
      // return user;
    },
    
  },
};

export default resolvers;
