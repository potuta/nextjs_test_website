"use client"

import { SignupFormSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { notification } from "@/lib/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function SignUpPage(){
    const form = useForm({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        }
    })

    async function onSignup(values: z.infer<typeof SignupFormSchema>) {
        try {
            const res = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values), // send the entire form
            });

            let data;
            try {
                data = await res.json(); // parse JSON
            } catch {
                data = { error: "Invalid server response" };
            }

            if (res.ok) {
                notification({ type: "success", message: "Registered successfully!" });
                form.reset(); // optional: clear the form after signup
            } else if (res.status === 409) {
                notification({
                    type: "error",
                    message: data.error || "Username or email is already taken",
                });
            } else if (res.status === 400) {
                notification({ type: "error", message: data.error || "Missing fields" });
            } else {
                notification({ type: "error", message: data.error || "Something went wrong" });
            }
        } catch (err) {
            console.error(err);
            notification({type: "error", message: "Failed to reach server"});
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>Create an account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSignup)}>
                    <FieldGroup className="gap-y-4">
                        <Controller 
                            name="name" 
                            control={form.control} 
                            render={({field, fieldState}) => (
                                <Field>
                                    <FieldLabel>Full Name</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="John Doe" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                        )}/>

                        <Controller 
                            name="username" 
                            control={form.control} 
                            render={({field, fieldState}) => (
                                <Field>
                                    <FieldLabel>Username</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="johndoe123" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                        )}/>

                        <Controller 
                            name="email" 
                            control={form.control} 
                            render={({field, fieldState}) => (
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="john@doe.com" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                        )}/>

                        <Controller 
                            name="password" 
                            control={form.control} 
                            render={({field, fieldState}) => (
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="********" type="password" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                        )}/>

                        <Button>Sign up</Button>

                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}