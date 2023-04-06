import * as z from "zod";

//this is the schema for the login form
export const loginSchema = z.object({
  email: z.string().min(1,"Please enter an email address.").email("Please enter a valid email address."),
  password: z.string().min(8,"Password must be at least 8 characters long").max(50,"Password must be at most 50 characters long"),
});

//this is the schema for the signup form
export const signUpSchema = loginSchema.extend({
  firstname : z.string().min(2,"Please enter at least 2 characters.").max(20,"Firstname must be at most 50 characters long"),
  lastname : z.string().min(2,"Please enter at least 2 characters.").max(20,"Lastname must be at most 50 characters long")
});

//this is the schema for the request signup form since the request need to merge firstname and lastname into fullname
export const requestSignUpSchema = loginSchema.extend({
    fullname : z.string().min(4).max(41)
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
export type IRequestSignUp = z.infer<typeof requestSignUpSchema>;