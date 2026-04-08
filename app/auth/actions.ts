import { SignInFormSchema, SignupFormSchema } from "@/app/schemas/validate";
import { authClient } from "@/lib/auth-client";
import { notification } from "@/lib/notification";
import { redirect } from "next/navigation";
import z from "zod";

export async function onSignIn(values: z.infer<typeof SignInFormSchema>) {
    const { data, error } = await authClient.signIn.email({
        email: values.email, // user email address
        password: values.password, // user password -> min 8 characters by default
        // callbackURL: "/" 
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            notification({ type: "success", message: "Signed in successfully!" });
            redirect("/dashboard");
        },
        onError: (ctx) => {
            notification({type: "error", message: `Error: ${ctx.error.message}`});
        },
    });
}

export async function onSignup(values: z.infer<typeof SignupFormSchema>) {
        const { data, error } = await authClient.signUp.email({
            email: values.email, 
            password: values.password, 
            name: values.name, 
            username: values.username,
            callbackURL: "/" 
        }, {
            onRequest: (ctx) => {
                //show loading
            },
            onSuccess: (ctx) => {
                //redirect to the dashboard or sign in page
                notification({ type: "success", message: "Registered successfully!" });
            },
            onError: (ctx) => {
                // display the error message
                // alert(ctx.error.message);
                notification({type: "error", message: `Error: ${ctx.error.message}`});
            },
        });
    }