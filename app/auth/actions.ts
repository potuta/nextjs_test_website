import { SignInFormSchema, SignupFormSchema } from "@/app/schemas/validate";
import { redirectWithToast } from "@/lib/redirect-with-toast";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import z from "zod";

export async function onSignIn(values: z.infer<typeof SignInFormSchema>) {
    const { data, error } = await authClient.signIn.email({
    email: values.email,
    password: values.password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return {
    success: true,
    role: data?.user.role,
  };
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
                redirectWithToast("/", "success", "Registered successfully!");
            },
            onError: (ctx) => {
                redirectWithToast("/", "error", `Error: ${ctx.error.message}`);
            },
        });
    }

export async function signOut(){
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                redirect("/");
            }
        }
    })
}