"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ListTodo, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
     <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* Hero Section */}
      <section className="text-center max-w-2xl space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Task<span className="text-blue-500">Manager</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-lg"
        >
          Organize your tasks, stay productive, and manage everything in one simple place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4"
        >
          <Link href="/auth/sign-up">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline">Learn More</Button>
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
        <Card className="rounded-2xl shadow">
          <CardContent className="p-6 space-y-3">
            <ListTodo className="w-6 h-6" />
            <h3 className="font-semibold text-lg">Task Management</h3>
            <p className="text-sm text-muted-foreground">
              Create, update, and organize your tasks easily.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow">
          <CardContent className="p-6 space-y-3">
            <Users className="w-6 h-6" />
            <h3 className="font-semibold text-lg">Multi-User</h3>
            <p className="text-sm text-muted-foreground">
              Each user has their own private and secure task list.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow">
          <CardContent className="p-6 space-y-3">
            <CheckCircle className="w-6 h-6" />
            <h3 className="font-semibold text-lg">Stay Productive</h3>
            <p className="text-sm text-muted-foreground">
              Track progress and complete tasks efficiently.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
