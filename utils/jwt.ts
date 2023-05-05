import jwt from "jsonwebtoken";

export const signToken = (_id: string, email: string) => {
    if (!process.env.JWT_SECRET_SEED) throw new Error(" Doesn't exists JWT SEED ENV variable ");

    // Payload, seed, Opciones
    return jwt.sign({ _id, email }, process.env.JWT_SECRET_SEED, { expiresIn: process.env.JWT_EXPIRES });
};

export const isValidToken = (token: string): Promise<string> => {
    if (!process.env.JWT_SECRET_SEED) throw new Error(" Doesn't exists JWT SEED ENV variable ");

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || "", (err, payload) => {
                if (err) return reject("JWT is not valid");

                const { _id } = payload as { _id: string };

                resolve(_id);
            });
        } catch (error) {
            reject("JWT is not valid");
        }
    });
};
