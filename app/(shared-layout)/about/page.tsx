"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Code, ExternalLink, Crown } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="max-w-4xl mx-auto py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">About Task<span className="text-blue-500">Manager</span></CardTitle>
            <CardDescription className="text-base">
              A simple full-stack project built with Next.js to explore modern web development.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Overview */}
            <div>
              <h3 className="text-xl font-semibold mb-2">🧩 Overview</h3>
              <p className="text-muted-foreground leading-relaxed">
                TaskManager is a multi-user to-do list application where each authenticated user
                has their own private task list. Users can create, manage, and organize their tasks
                securely.
              </p>
            </div>

            <Separator />

            {/* Purpose */}
            <div>
              <h3 className="text-xl font-semibold mb-2">🎯 Purpose</h3>
              <p className="text-muted-foreground leading-relaxed">
                This project was built as a hands-on learning experience to better understand
                full-stack development using Next.js. It focuses on key concepts like authentication,
                database integration, and deployment workflows.
              </p>
            </div>

            <Separator />

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold mb-3">✨ Key Features</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Authentication</Badge>
                <Badge>RBAC & PBAC</Badge>
                <Badge>Private User Tasks</Badge>
                <Badge>CRUD Operations</Badge>
                <Badge>Responsive UI</Badge>
                <Badge>Next.js App Router</Badge>
                <Badge>Vercel Deployment</Badge>
              </div>
            </div>

            <Separator />

            {/* Tech Stack */}
            <div>
              <h3 className="text-xl font-semibold mb-3">⚙️ Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">shadcn/ui</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">Better-Auth</Badge>
                <Badge variant="secondary">PostgreSQL (Neon)</Badge>
                <Badge variant="secondary">Prisma ORM</Badge>
                <Badge variant="secondary">Vercel</Badge>
              </div>
            </div>

            <Separator />
            {/* Developer */}
            <div className="pt-2">
              <h3 className="text-xl font-semibold mb-2">👨‍💻 Developer</h3>
              <p className="text-muted-foreground flex items-center gap-2">
                <Crown className="w-4 h=4" />
                <a
                  href="https://github.com/potuta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-md font-semibold hover:underline"
                >
                  LesserDev
                </a>
                <ExternalLink className="w-4 h=4" />
              </p>
              <p className="text-muted-foreground flex items-center gap-2">
                <Code className="w-4 h=4" />
                <a
                  href="https://github.com/potuta/nextjs_test_website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-md font-semibold hover:underline"
                >
                  View Source
                </a>
                <ExternalLink className="w-4 h=4" />
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
