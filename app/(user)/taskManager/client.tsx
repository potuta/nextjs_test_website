"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

type Todo = {
  id: number
  text: string
  completed: boolean
}

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState("")

  const addTodo = () => {
    if (!input.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setInput("")
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
            <Card>
            <CardContent className="p-4 space-y-4">
                <h1 className="text-xl font-bold text-center">To-Do List</h1>

                <div className="flex gap-2">
                <Input
                    placeholder="Add a task..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={addTodo}>Add</Button>
                </div>

                <div className="space-y-2">
                {todos.map(todo => (
                    <div
                    key={todo.id}
                    className="flex items-center justify-between border p-2 rounded"
                    >
                    <div className="flex items-center gap-2">
                        <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(todo.id)}
                        />
                        <span
                        className={
                            todo.completed ? "line-through text-gray-500" : ""
                        }
                        >
                        {todo.text}
                        </span>
                    </div>

                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                    >
                        Delete
                    </Button>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>
        </div>
    </div> 
  )
}