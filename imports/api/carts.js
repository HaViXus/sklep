import { Mongo } from 'meteor/mongo';
 
export const Products = (user) => {
    if(user === "") return undefined;
    else return new Mongo.Collection(`carts:` + user);
} 