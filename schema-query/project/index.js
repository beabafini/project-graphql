const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    scalar Date
    
    type Product {
        name: String!
        price: Float!
        discount: Float
        priceWithDiscount: Float
    }

    type User {
        id: ID
        name: String!
        email: String!
        age: Int
        salary: Float
        vip: Boolean
    }
    
    # API entry points
    type Query {
        hello: String!
        currentTime: Date!
        loggedUser: User
        featuredProduct: Product
        numbersLotery: [Int!]!
    }
`;

const resolvers = {
    Product: {
        priceWithDiscount(product) {
            if (product.discount) {
                return product.price * (1 - product.discount)
            } else {
                return product.price
            }
        }
    },

    User: {
        salary(user) {
            return user.real_salary;
        }
    },

    Query: {
        hello() {
            return 'Whatever';
        },

        currentTime() {
            return new Date;
        },

        loggedUser() {
            return {
                id: 1,
                name: 'Bea',
                email: 'bea@email.com',
                age: 23,
                real_salary: 1234.56,
                vip: true
            };
        },

        featuredProduct() {
            return {
                name: 'Gamer Notebook',
                price: 4890.89,
                discount: 0.5
            };
        },

        numbersLotery() {
            // return [4, 8, 13, 27, 33, 54];
            const increasing = (a, b) => a - b;
            return Array(6).fill(0)
                .map(n => parseInt(Math.random() * 60 + 1))
                .sort(increasing);
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Executing in ${url}`);
});