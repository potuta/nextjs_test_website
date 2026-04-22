"use client"

import { SignInFormSchema } from "@/app/schemas/validate";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { onSignIn } from "@/app/auth/actions";

interface SignInPageProps {
    onClose: () => void;
}

export default function SignInPage({ onClose }: SignInPageProps){
    const form = useForm({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    return (
        <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>
                        Enter your credentials
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSignIn)}>
                    <FieldGroup className="gap-y-4">

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

                        <Button>Login</Button>

                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    )
}