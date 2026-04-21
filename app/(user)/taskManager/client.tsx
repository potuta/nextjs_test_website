"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronRight, Plus, Trash } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { User } from "@/components/types/userSession"

// Types

type Todo = {
  id: number
  text: string
  completed: boolean
}

type Group = {
  id: number
  title: string
  todos: Todo[]
  open: boolean
}

type UserSession = {
  user: User
}

export function TodoPage({ user }: Readonly<UserSession>) {
  const [groups, setGroups] = useState<Group[]>([])
  const [groupInput, setGroupInput] = useState("")
  const [taskInput, setTaskInput] = useState<{ [key: number]: string }>({})

  const addGroup = () => {
    if (!groupInput.trim()) return

    const newGroup: Group = {
      id: Date.now(),
      title: groupInput,
      todos: [],
      open: false,
    }

    setGroups([...groups, newGroup])
    setGroupInput("")
  }

  const deleteGroup = (id: number) => {
    setGroups(groups.filter(g => g.id !== id))
  }

  const toggleGroup = (id: number) => {
    setGroups(groups.map(g => g.id === id ? { ...g, open: !g.open } : g))
  }

  // Toggle ALL todos in a group
  const toggleAllTodos = (groupId: number, checked: boolean) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          todos: group.todos.map(todo => ({ ...todo, completed: checked }))
        }
      }
      return group
    }))
  }

  const addTodo = (groupId: number) => {
    const text = taskInput[groupId]
    if (!text?.trim()) return

    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          todos: [...group.todos, {
            id: Date.now(),
            text,
            completed: false
          }]
        }
      }
      return group
    }))

    setTaskInput({ ...taskInput, [groupId]: "" })
  }

  const deleteTodo = (groupId: number, todoId: number) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          todos: group.todos.filter(todo => todo.id !== todoId)
        }
      }
      return group
    }))
  }

  const toggleTodo = (groupId: number, todoId: number) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          todos: group.todos.map(todo =>
            todo.id === todoId
              ? { ...todo, completed: !todo.completed }
              : todo
          )
        }
      }
      return group
    }))
  }

  const getProgress = (todos: Todo[]) => {
    if (todos.length === 0) return 0
    const completed = todos.filter(t => t.completed).length
    return Math.round((completed / todos.length) * 100)
  }

  const isAllChecked = (todos: Todo[]) => {
    return todos.length > 0 && todos.every(t => t.completed)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-4">

        <Card>
          <CardContent className="p-4 space-y-4">
            <h1 className="text-xl font-bold text-center">{ user.username ? user.username : null } Tasks</h1>

            {/* Add group */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a group..."
                value={groupInput}
                onChange={(e) => setGroupInput(e.target.value)}
              />
              <Button size="icon" onClick={addGroup}>
                <Plus size={16} />
              </Button>
            </div>

            {/* Groups */}
            <div className="space-y-3">
              {groups.map(group => (
                <div key={group.id} className="border rounded-lg p-2">

                  {/* Group header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">

                      {/* Check all */}
                      <Checkbox
                        checked={isAllChecked(group.todos)}
                        onCheckedChange={(checked) => toggleAllTodos(group.id, !!checked)}
                      />

                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => toggleGroup(group.id)}
                      >
                        {group.open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        <span className="font-semibold">{group.title}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm">{getProgress(group.todos)}%</span>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteGroup(group.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-gray-200 rounded mt-2">
                    {/* <div
                      className="h-2 bg-black rounded"
                      style={{ width: `${getProgress(group.todos)}%` }}
                    /> */}
                    <Progress value={getProgress(group.todos)} />
                  </div>

                  {/* Dropdown content */}
                  {group.open && (
                    <div className="mt-3 space-y-2">

                      {/* Add task */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add task..."
                          value={taskInput[group.id] || ""}
                          onChange={(e) => setTaskInput({
                            ...taskInput,
                            [group.id]: e.target.value
                          })}
                        />
                        <Button size="icon" onClick={() => addTodo(group.id)}>
                          <Plus size={16} />
                        </Button>
                      </div>

                      {/* Tasks */}
                      {group.todos.map(todo => (
                        <div key={todo.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={todo.completed}
                              onCheckedChange={() => toggleTodo(group.id, todo.id)}
                            />
                            <span className={todo.completed ? "line-through text-gray-500" : ""}>
                              {todo.text}
                            </span>
                          </div>

                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => deleteTodo(group.id, todo.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      ))}

                    </div>
                  )}
                </div>
              ))}
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}
